// src/pages/StudentsPage.jsx
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

const Student = () => {
    const [students, setStudents] = useState([]);
    const [systems, setSystems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [formInput, setFormInput] = useState({
        name: "",
        email: "",
        studentId: "",
    });

    const studentsCollectionRef = collection(db, 'students');
    const systemsCollectionRef = collection(db, 'pcs');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [studentsData, systemsData] = await Promise.all([
                    getDocs(studentsCollectionRef),
                    getDocs(systemsCollectionRef)
                ]);

                const fetchedStudents = studentsData.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                const fetchedSystems = systemsData.docs.map(doc => ({ ...doc.data(), id: doc.id }));

                setStudents(fetchedStudents);
                setSystems(fetchedSystems);
            } catch (error) {
                console.error("Error fetching data: ", error);
                toast.error("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const openModal = (student = null) => {
        setCurrentStudent(student);
        if (student) {
            setFormInput({
                name: student.name,
                email: student.email,
                studentId: student.studentId,
            });
        } else {
            setFormInput({
                name: "",
                email: "",
                studentId: "",
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentStudent(null);
        setFormInput({ name: "", email: "", studentId: "" });
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
        const studentData = { ...formInput };
        try {
            if (currentStudent) {
                const studentDoc = doc(db, 'students', currentStudent.id);
                await updateDoc(studentDoc, studentData);
                setStudents(students.map(s => (s.id === currentStudent.id ? { ...s, ...studentData } : s)));
                toast.success("Student updated successfully!");
            } else {
                const docRef = await addDoc(studentsCollectionRef, studentData);
                setStudents([...students, { ...studentData, id: docRef.id }]);
                toast.success("New student added successfully!");
            }
            closeModal();
        } catch (error) {
            console.error("Error saving student data: ", error);
            toast.error("Failed to save student data.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                const studentDoc = doc(db, 'students', id);
                await deleteDoc(studentDoc);
                setStudents(students.filter(s => s.id !== id));
                toast.success("Student deleted successfully!");
            } catch (error) {
                console.error("Error deleting document: ", error);
                toast.error("Failed to delete student.");
            }
        }
    };
    
    // Find the PC a student is occupying
    const findOccupiedPc = (studentName) => {
        const occupiedPc = systems.find(sys => sys.occupiedBy === studentName);
        return occupiedPc ? occupiedPc.pcId : 'N/A';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <p className="text-white text-lg animate-pulse">Loading students...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-blue-400">Students Management</h1>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                        Add New Student
                    </button>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-xl overflow-x-auto">
                    {students.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No students found. Add a new one to get started.</p>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Occupied PC</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {students.map(student => (
                                    <tr key={student.id} className="hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-white">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{student.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{student.studentId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                            {findOccupiedPc(student.name)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openModal(student)} className="text-blue-500 hover:text-blue-400 mr-4">Edit</button>
                                            <button onClick={() => handleDelete(student.id)} className="text-red-500 hover:text-red-400">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Student Form Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                            <h2 className="text-2xl font-bold text-white mb-4">{currentStudent ? "Edit Student" : "Add New Student"}</h2>
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                                    <input type="text" id="name" name="name" value={formInput.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                                    <input type="email" id="email" name="email" value={formInput.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="studentId" className="block text-sm font-medium text-gray-400">Student ID</label>
                                    <input type="text" id="studentId" name="studentId" value={formInput.studentId} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button type="button" onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                                        {currentStudent ? "Update Student" : "Add Student"}
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

export default Student;