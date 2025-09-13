import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StudentContext } from "../context/StudentContentProvider";


const EditStudents = () => {
    const { editStudent, fetchedStudentData } = useContext(StudentContext);
    const { id } = useParams();
    const [input, setInput] = useState({
        name: "",
        grid: "",
        course: "",
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (fetchedStudentData.length > 0) {
            const student = fetchedStudentData.find((stu) => stu.id === id);
            if (student) {
                setInput({
                    name: student.name,
                    grid: student.grid,
                    course: student.course,
                });
            }
        }
    }, []);


    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let tempObj = {};
        if (input.name.trim() === "") {
            tempObj.name = "Student Name is required.";
        }
        if (input.course.trim() === "") {
            tempObj.course = "course is required.";
        }
        if (input.grid.trim() === "") {
            tempObj.grid = "grid is required.";
        }
        setError(tempObj);

        if (Object.keys(tempObj).length === 0) {
            editStudent(id, input);
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

    return (
        <div className="flex items-center justify-center min-h-[92.5vh] bg-gray-900 text-gray-200">
            <form className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-2xl" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Edit Student</h2>


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



                <button
                    type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors">
                    Edit Student
                </button>
            </form>
        </div>
    );
};

export default EditStudents;