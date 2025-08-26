// src/pages/SettingsPage.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('security');
    const [accountForm, setAccountForm] = useState({ name: '', email: '' });
    const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });

    const handleAccountChange = (e) => {
        setAccountForm({ ...accountForm, [e.target.id]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.id]: e.target.value });
    };

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        // Here you would add your logic to update the user's account info
        toast.success("Account information updated!");
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // Here you would add your logic to change the user's password
        toast.success("Password changed successfully!");
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <form onSubmit={handleAccountSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                            <input type="text" id="name" value={accountForm.name} onChange={handleAccountChange} placeholder="Enter your full name" className="w-full px-4 py-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <input type="email" id="email" value={accountForm.email} onChange={handleAccountChange} placeholder="Enter your email" className="w-full px-4 py-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors" />
                        </div>
                        <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Save Changes</button>
                    </form>
                );
            case 'security':
                return (
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                            <input type="password" id="oldPassword" value={passwordForm.oldPassword} onChange={handlePasswordChange} placeholder="••••••••" className="w-full px-4 py-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                            <input type="password" id="newPassword" value={passwordForm.newPassword} onChange={handlePasswordChange} placeholder="••••••••" className="w-full px-4 py-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors" />
                        </div>
                        <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Change Password</button>
                    </form>
                );
            case 'notifications':
                return (
                    <div className="space-y-6">
                        <p className="text-gray-300">Manage your notification settings here.</p>
                        {/* Example of a toggle switch for notifications */}
                        <div className="flex items-center justify-between p-4 bg-gray-700 rounded-md">
                            <span className="text-white">Receive email notifications</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">Settings</h1>
                
                <div className="flex flex-col md:flex-row md:space-x-8">
                    {/* Settings Tabs */}
                    <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/4">
                        <ul className="flex flex-col space-y-2 bg-gray-800 p-4 rounded-lg">
                            <li>
                                <button onClick={() => setActiveTab('account')} className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'account' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}>
                                    Account
                                </button>
                            <li>
                                <button onClick={() => setActiveTab('security')} className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}>
                                    Security
                                </button>
                            </li>
                            </li>
                            <li>
                                <button onClick={() => setActiveTab('notifications')} className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}>
                                    Notifications
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Settings Content */}
                    <div className="flex-grow bg-gray-800 p-8 rounded-lg shadow-xl">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;