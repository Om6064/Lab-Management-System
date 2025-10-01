import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StudentContext } from "../context/StudentContentProvider";
import { LabContent } from "../context/LabContentProvider";
import { SystemContent } from "../context/SystemContentProvider";


const AddStudent = () => {
    const { addStudent } = useContext(StudentContext);
    const { labfetchedData } = useContext(LabContent)
    const { systemFetchData } = useContext(SystemContent)
    const [input, setInput] = useState({
        name: "",
        email:"",
        labid: "",
        pcid: "",
        grid: "",
        course: "",
    });
    const [filteredPc , setFilteredPc] = useState([])
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let tempObj = {};
        if (input.name.trim() === "") {
            tempObj.name = "Student Name is required.";
        }
        if (input.email.trim() === "") {
            tempObj.email = "Email is required.";
        }
        if (input.labid.trim() === "") {
            tempObj.labid = "Lab Selection is required.";
        }
        if (input.pcid.trim() === "") {
            tempObj.pcid = "System Selection is required.";
        }
        if (input.course.trim() === "") {
            tempObj.course = "course is required.";
        }
        if (input.grid.trim() === "") {
            tempObj.grid = "grid is required.";
        }
        setError(tempObj);

        if (Object.keys(tempObj).length === 0) {
            addStudent(input);
            navigate("/student");
            setInput({
                name: "",
                grid: "",
                course: "",
            });
        } else {
            toast.error("Please fill out all required fields.");
        }
    };

    useEffect(() => {
        if (input.labid) {
            let availablePc =  systemFetchData.filter((pc) => {
                return pc.labid == input.labid && pc.status == "Available"
            })
            setFilteredPc(availablePc)
        }
    },[input.labid])


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
            <form className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-2xl" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Add New Student</h2>


                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200">Student Name</label>
                    <input
                        type="text"
                        id="name"
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors"
                        placeholder="e.g., John Doe"
                        onChange={handleChange}
                        value={input.name}
                    />
                    {error.name && <p className="mt-1 text-xs text-red-400">{error.name}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors"
                        placeholder="test@gmail.com"
                        onChange={handleChange}
                        value={input.email}
                    />
                    {error.email && <p className="mt-1 text-xs text-red-400">{error.email}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="grid" className="block mb-2 text-sm font-medium text-gray-200">grid</label>
                    <input
                        type="number"
                        id="grid"
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors"
                        placeholder="e.g., 1111"
                        onChange={handleChange}
                        value={input.grid}
                    />
                    {error.grid && <p className="mt-1 text-xs text-red-400">{error.grid}</p>}
                </div>


                <div className="mb-5">
                    <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-200">
                        course
                    </label>
                    <select
                        id="course"
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors"
                        onChange={handleChange}
                        value={input.course}
                    >
                        <option value="">-- Select course --</option>
                        <option value="Full Stack Development">Full Stack Development</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="AI/ML/DS">AI/ML/DS</option>
                    </select>
                    {error.course && <p className="mt-1 text-xs text-red-400">{error.course}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="labid" className="block mb-2 text-sm font-medium text-gray-200">
                        Select Lab
                    </label>
                    <select
                        id="labid"
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors"
                        onChange={handleChange}
                        value={input.labid}
                    >
                        <option value="">-- Select Lab --</option>
                        {
                            labfetchedData && labfetchedData.map((lab) => {
                                return <option key={lab.id} value={lab.id}>{lab.name}</option>
                            })
                        }
                    </select>
                    {error.course && <p className="mt-1 text-xs text-red-400">{error.course}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="pcid" className="block mb-2 text-sm font-medium text-gray-200">
                        Select System
                    </label>
                    <select
                        id="pcid"
                        className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors"
                        onChange={handleChange}
                        value={input.pcid}
                    >
                        <option value="">-- Select System --</option>
                        {
                            filteredPc && filteredPc.map((system) => {
                                return <option key={system.id} value={system.id}>{system.system_name}</option>
                            })
                        }
                    </select>
                    {error.pcid && <p className="mt-1 text-xs text-red-400">{error.pcid}</p>}
                </div>



                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors">
                    Add Student
                </button>
            </form>
        </div>
    );
};

export default AddStudent;