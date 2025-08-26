// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { db } from '../config/firebase'; // Assuming you've exported Firestore instance as 'db'
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
    // Placeholder states for data
    const [stats, setStats] = useState({
        totalLabs: 0,
        totalPCs: 0,
        occupiedPCs: 0,
        totalStudents: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from Firestore
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            
                const labsSnapshot = await getDocs(collection(db, 'labs'));
                const totalLabs = labsSnapshot.size;

            
                const pcsSnapshot = await getDocs(collection(db, 'pcs'));
                const totalPCs = pcsSnapshot.size;
                const occupiedPCs = pcsSnapshot.docs.filter(doc => doc.data().status === 'Occupied').length; 
               
                const studentsSnapshot = await getDocs(collection(db, 'students'));
                const totalStudents = studentsSnapshot.size;

                const activityLog = [
                    { id: 1, action: "PC-103 reserved by User", time: "5 mins ago" },
                    { id: 2, action: "Graphics Lab updated", time: "30 mins ago" },
                    { id: 3, action: "New student account created", time: "2 hours ago" },
                ];

                setStats({ totalLabs, totalPCs, occupiedPCs, totalStudents });
                setRecentActivity(activityLog);
            } catch (error) {
                console.error("Error fetching dashboard data: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p className="text-lg animate-pulse">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-blue-400">Dashboard Overview</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card 1: Total Labs */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
                        <div className="bg-blue-600 p-3 rounded-full">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Total Labs</p>
                            <h2 className="text-3xl font-bold text-white">{stats.totalLabs}</h2>
                        </div>
                    </div>
                    {/* Card 2: Total PCs */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
                        <div className="bg-green-600 p-3 rounded-full">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h7l-1-1v-3.25m-7.5-3.5h7.5m-7.5 0v3.5h7.5V13.5m-7.5 0a1 1 0 011-1h5.5a1 1 0 011 1m-7.5 0V9.5m7.5 0V9.5" /></svg>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Total PCs</p>
                            <h2 className="text-3xl font-bold text-white">{stats.totalPCs}</h2>
                        </div>
                    </div>
                    {/* Card 3: Occupied PCs */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
                        <div className="bg-yellow-600 p-3 rounded-full">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Occupied PCs</p>
                            <h2 className="text-3xl font-bold text-white">{stats.occupiedPCs}</h2>
                        </div>
                    </div>
                    {/* Card 4: Total Students */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
                        <div className="bg-red-600 p-3 rounded-full">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>
                        <div>
                            <p className="text-gray-400 font-medium">Total Students</p>
                            <h2 className="text-3xl font-bold text-white">{stats.totalStudents}</h2>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">Recent Activity</h2>
                    {recentActivity.length > 0 ? (
                        <ul className="space-y-4">
                            {recentActivity.map(activity => (
                                <li key={activity.id} className="p-4 bg-gray-700 rounded-lg flex justify-between items-center transition-transform hover:scale-105">
                                    <span className="text-gray-300">{activity.action}</span>
                                    <span className="text-xs text-gray-500">{activity.time}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No recent activity.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;