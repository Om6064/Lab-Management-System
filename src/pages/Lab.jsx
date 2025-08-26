// src/pages/LabsPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

const Lab = () => {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLab, setCurrentLab] = useState(null);
    const [formInput, setFormInput] = useState({
        name: "",
        location: "",
        capacity: "",
    });

    const labsCollectionRef = collection(db, 'labs');

    // Fetch labs from Firestore
    useEffect(() => {
        const getLabs = async () => {
            setLoading(true);
            try {
                const data = await getDocs(labsCollectionRef);
                const fetchedLabs = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setLabs(fetchedLabs);
            } catch (error) {
                console.error("Error fetching labs: ", error);
                toast.error("Failed to fetch labs.");
            } finally {
                setLoading(false);
            }
        };
        getLabs();
    }, []);

    const openModal = (lab = null) => {
        setCurrentLab(lab);
        if (lab) {
            setFormInput({
                name: lab.name,
                location: lab.location,
                capacity: lab.capacity,
            });
        } else {
            setFormInput({
                name: "",
                location: "",
                capacity: "",
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentLab(null);
        setFormInput({ name: "", location: "", capacity: "" });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormInput(prevInput => ({
            ...prevInput,
            [id]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const labData = {
            name: formInput.name,
            location: formInput.location,
            capacity: parseInt(formInput.capacity, 10),
        };

        try {
            if (currentLab) {
                const labDoc = doc(db, 'labs', currentLab.id);
                await updateDoc(labDoc, labData);
                setLabs(labs.map(lab => (lab.id === currentLab.id ? { ...lab, ...labData } : lab)));
                toast.success("Lab updated successfully!");
            } else {
                const docRef = await addDoc(labsCollectionRef, labData);
                setLabs([...labs, { ...labData, id: docRef.id }]);
                toast.success("New lab added successfully!");
            }
            closeModal();
        } catch (error) {
            console.error("Error writing document: ", error);
            toast.error("Failed to save lab data.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this lab?")) {
            try {
                const labDoc = doc(db, 'labs', id);
                await deleteDoc(labDoc);
                setLabs(labs.filter(lab => lab.id !== id));
                toast.success("Lab deleted successfully!");
            } catch (error) {
                console.error("Error deleting document: ", error);
                toast.error("Failed to delete lab.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-white text-lg animate-pulse">Loading labs...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-blue-400">Labs Management</h1>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                        Add New Lab
                    </button>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-xl overflow-x-auto">
                    {labs.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No labs found. Add a new one to get started.</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lab Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Capacity</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {labs.map(lab => (
                                    <tr key={lab.id} className="hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{lab.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{lab.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{lab.capacity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openModal(lab)} className="text-blue-500 hover:text-blue-400 mr-4">Edit</button>
                                            <button onClick={() => handleDelete(lab.id)} className="text-red-500 hover:text-red-400">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Lab Form Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                            <h2 className="text-2xl font-bold text-white mb-4">{currentLab ? "Edit Lab" : "Add New Lab"}</h2>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">Lab Name</label>
                                    <input type="text" id="name" name="name" value={formInput.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-400">Location</label>
                                    <input type="text" id="location" name="location" value={formInput.location} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-400">Capacity</label>
                                    <input type="number" id="capacity" name="capacity" value={formInput.capacity} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button type="button" onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                                        {currentLab ? "Update Lab" : "Add Lab"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Lab;