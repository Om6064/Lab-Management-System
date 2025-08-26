// src/pages/ProfilePage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContentProvider';
// Assuming your Header component is here

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    // Placeholder data for demonstration
    const userData = {
        name: user?.displayName || "Lab User",
        email: user?.email || "user@techlab.edu",
        role: "Technician", // This would typically come from your user data or a backend
        lastLogin: "2024-08-26 10:30 AM",
    };

    const recentActivity = [
        { id: 1, action: "Reserved 'System-05' for 2 hours.", time: "10 minutes ago" },
        { id: 2, action: "Updated software on 'System-12'.", time: "2 hours ago" },
        { id: 3, action: "Reported an issue with 'System-03'.", time: "Yesterday" },
    ];

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Your Profile</h1>
                
                <div className="flex flex-col md:flex-row justify-center items-start md:space-x-8 space-y-8 md:space-y-0">
                    {/* Profile Card */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center font-bold text-3xl text-white border-4 border-gray-700">
                                {userData.name[0]}
                            </div>
                            <h2 className="mt-4 text-2xl font-semibold">{userData.name}</h2>
                            <p className="text-gray-400">{userData.role}</p>
                            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-500 text-white">
                                Online
                            </span>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-400">Email Address</h3>
                                <p className="text-white break-words">{userData.email}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400">Last Login</h3>
                                <p className="text-white">{userData.lastLogin}</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Card */}
                    <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl">
                        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Recent Activity</h2>
                        <ul className="space-y-4">
                            {recentActivity.map((activity) => (
                                <li key={activity.id} className="p-4 bg-gray-700 rounded-lg flex justify-between items-center transition-transform hover:scale-105">
                                    <span className="text-gray-300">{activity.action}</span>
                                    <span className="text-xs text-gray-500">{activity.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;