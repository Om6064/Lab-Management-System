// src/pages/SystemsPage.jsx
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
import Header from '../components/Header';
import { toast } from 'react-toastify';

const System = () => {
    const [systems, setSystems] = useState([]);
    const [labs, setLabs] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSystem, setCurrentSystem] = useState(null);
    const [formInput, setFormInput] = useState({
        pcId: "",
        lab: "",
        cpu: "",
        ram: "",
        storage: "",
        status: "Available",
        occupiedBy: "",
        duration: "", // New state field for duration
    });

    const systemsCollectionRef = collection(db, 'pcs');
    const labsCollectionRef = collection(db, 'labs');
    const studentsCollectionRef = collection(db, 'students');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [systemsData, labsData, studentsData] = await Promise.all([
                    getDocs(systemsCollectionRef),
                    getDocs(labsCollectionRef),
                    getDocs(studentsCollectionRef)
                ]);
                
                const fetchedSystems = systemsData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                const fetchedLabs = labsData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                const fetchedStudents = studentsData.docs.map(doc => ({ ...doc.data(), id: doc.id }));

                setSystems(fetchedSystems);
                setLabs(fetchedLabs);
                setStudents(fetchedStudents);
            } catch (error) {
                console.error("Error fetching data: ", error);
                toast.error("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const openModal = (system = null) => {
        setCurrentSystem(system);
        if (system) {
            setFormInput({
                pcId: system.pcId,
                lab: system.lab,
                cpu: system.cpu,
                ram: system.ram,
                storage: system.storage,
                status: system.status,
                occupiedBy: system.occupiedBy || "",
                duration: system.duration || "", // Set existing duration
            });
        } else {
            setFormInput({
                pcId: "",
                lab: "",
                cpu: "",
                ram: "",
                storage: "",
                status: "Available",
                occupiedBy: "",
                duration: "",
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSystem(null);
        setFormInput({
            pcId: "",
            lab: "",
            cpu: "",
            ram: "",
            storage: "",
            status: "Available",
            occupiedBy: "",
            duration: "",
        });
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
        const systemData = { ...formInput };
        
        // Clear occupied data if status is not Occupied
        if (systemData.status !== 'Occupied') {
            systemData.occupiedBy = "";
            systemData.duration = "";
        }

        try {
            if (currentSystem) {
                const systemDoc = doc(db, 'pcs', currentSystem.id);
                await updateDoc(systemDoc, systemData);
                setSystems(systems.map(sys => (sys.id === currentSystem.id ? { ...sys, ...systemData } : sys)));
                toast.success("PC updated successfully!");
            } else {
                const docRef = await addDoc(systemsCollectionRef, systemData);
                setSystems([...systems, { ...systemData, id: docRef.id }]);
                toast.success("New PC added successfully!");
            }
            closeModal();
        } catch (error) {
            console.error("Error saving PC data: ", error);
            toast.error("Failed to save PC data.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this PC?")) {
            try {
                const systemDoc = doc(db, 'pcs', id);
                await deleteDoc(systemDoc);
                setSystems(systems.filter(sys => sys.id !== id));
                toast.success("PC deleted successfully!");
            } catch (error) {
                console.error("Error deleting document: ", error);
                toast.error("Failed to delete PC.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-white text-lg animate-pulse">Loading systems...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-blue-400">Systems Management</h1>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                        Add New PC
                    </button>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-xl overflow-x-auto">
                    {systems.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No PCs found. Add a new one to get started.</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">PC ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lab</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Occupied By</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {systems.map(system => (
                                    <tr key={system.id} className="hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{system.pcId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{system.lab}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${system.status === 'Available' ? 'bg-green-100 text-green-800' : system.status === 'Occupied' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                {system.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{system.occupiedBy || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{system.duration || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openModal(system)} className="text-blue-500 hover:text-blue-400 mr-4">Edit</button>
                                            <button onClick={() => handleDelete(system.id)} className="text-red-500 hover:text-red-400">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* System Form Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                            <h2 className="text-2xl font-bold text-white mb-4">{currentSystem ? "Edit PC" : "Add New PC"}</h2>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="pcId" className="block text-sm font-medium text-gray-400">PC ID</label>
                                    <input type="text" id="pcId" name="pcId" value={formInput.pcId} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="lab" className="block text-sm font-medium text-gray-400">Lab</label>
                                    <select id="lab" name="lab" value={formInput.lab} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                        <option value="" disabled>Select a Lab</option>
                                        {labs.map(lab => (
                                            <option key={lab.id} value={lab.name}>{lab.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-400">Status</label>
                                    <select id="status" name="status" value={formInput.status} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                        <option>Available</option>
                                        <option>Occupied</option>
                                        <option>Under Maintenance</option>
                                    </select>
                                </div>
                                {formInput.status === 'Occupied' && (
                                    <>
                                        <div>
                                            <label htmlFor="occupiedBy" className="block text-sm font-medium text-gray-400">Occupied By</label>
                                            <select id="occupiedBy" name="occupiedBy" value={formInput.occupiedBy} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                                <option value="" disabled>Select a Student</option>
                                                {students.map(student => (
                                                    <option key={student.id} value={student.name}>{student.name} ({student.studentId})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="duration" className="block text-sm font-medium text-gray-400">Duration</label>
                                            <select id="duration" name="duration" value={formInput.duration} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                                <option value="" disabled>Select a Duration</option>
                                                <option value="1:00pm to 2:00pm">1:00pm to 2:00pm</option>
                                                <option value="2:00pm to 3:00pm">2:00pm to 3:00pm</option>
                                                <option value="3:00pm to 4:00pm">3:00pm to 4:00pm</option>
                                                <option value="4:00pm to 5:00pm">4:00pm to 5:00pm</option>
                                            </select>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-end space-x-4 mt-6">
                                    <button type="button" onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                                        {currentSystem ? "Update PC" : "Add PC"}
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

export default System;