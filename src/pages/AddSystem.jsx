import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LabContent } from "../context/LabContentProvider";
import { SystemContent } from "../context/SystemContentProvider";

const AddSystem = () => {
    const { addSystem } = useContext(SystemContent);
    const [input, setInput] = useState({
        name: "",
        capacity: "",
        location: "",
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let tempObj = {};
        if (input.name.trim() === "") {
            tempObj.name = "Name is required.";
        }
        if (input.capacity.trim() === "") {
            tempObj.capacity = "Capacity is required.";
        }
        if (input.location.trim() === "") {
            tempObj.location = "Location is required.";
        }
        setError(tempObj);

        if (Object.keys(tempObj).length === 0) {
            addLabs(input);
            navigate("/lab");
            setInput({
                name: "",
                capacity: "",
                location: "",
            });
            toast.success("Lab added successfully!");
        } else {
            toast.error("Please fill out all required fields.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <form className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-2xl" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Add New Lab</h2>
                
            
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200">Lab Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors" 
                        placeholder="e.g., IT Studio-1" 
                        onChange={handleChange} 
                        value={input.name} 
                    />
                    {error.name && <p className="mt-1 text-xs text-red-400">{error.name}</p>}
                </div>
                
                
                <div className="mb-5">
                    <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-200">Capacity</label>
                    <input 
                        type="number" 
                        id="capacity" 
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors" 
                        placeholder="e.g., 40"
                        onChange={handleChange} 
                        value={input.capacity} 
                    />
                    {error.capacity && <p className="mt-1 text-xs text-red-400">{error.capacity}</p>}
                </div>
                
                
                <div className="mb-6">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-200">Location</label>
                    <input 
                        type="text" 
                        id="location" 
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors" 
                        placeholder="e.g., 1st Floor" 
                        onChange={handleChange} 
                        value={input.location} 
                    />
                    {error.location && <p className="mt-1 text-xs text-red-400">{error.location}</p>}
                </div>
                
                <button 
                    type="submit" 
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors">
                    Add Lab
                </button>
            </form>
        </div>
    );
};

export default AddSystem;