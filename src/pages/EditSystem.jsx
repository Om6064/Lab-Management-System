import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SystemContent } from "../context/SystemContentProvider";

const EditSystem = () => {
    const { addSystem } = useContext(SystemContent);
    const [input, setInput] = useState({
        system_name: "",
        status: "",
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let tempObj = {};
        if (input.system_name.trim() === "") {
            tempObj.system_name = "System Name is required.";
        }
        if (input.status.trim() === "") {
            tempObj.status = "Status is required.";
        }
        setError(tempObj);

        if (Object.keys(tempObj).length === 0) {
            addSystem(input);
            navigate("/systems");
            setInput({
                name: "",
                status: "",
                location: "",
            });
            toast.success("System added successfully!");
        } else {
            toast.error("Please fill out all required fields.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <form className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-2xl" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Add New System</h2>


                <div className="mb-5">
                    <label htmlFor="system_name" className="block mb-2 text-sm font-medium text-gray-200">System Name</label>
                    <input
                        type="text"
                        id="system_name"
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors"
                        placeholder="e.g., IT Studio-1"
                        onChange={handleChange}
                        value={input.system_name}
                    />
                    {error.system_name && <p className="mt-1 text-xs text-red-400">{error.system_name}</p>}
                </div>


                <div className="mb-5">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-200">
                        Status
                    </label>
                    <select
                        id="status"
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors"
                        onChange={handleChange}
                        value={input.status}
                    >
                        <option value="">-- Select Status --</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Available">Available</option>
                        <option value="In-Repairing">In-Repairing</option>
                    </select>
                    {error.status && <p className="mt-1 text-xs text-red-400">{error.status}</p>}
                </div>



                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors">
                    Add Systems
                </button>
            </form>
        </div>
    );
};

export default EditSystem;