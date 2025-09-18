import { useContext, useEffect } from "react";
import { StudentContext } from "../context/StudentContentProvider";
import { Link } from "react-router-dom";
import { LabContent } from "../context/LabContentProvider";
import { SystemContent } from "../context/SystemContentProvider";
import BackToDashboard from "../components/BackToDashboard";

const Student = () => {
    const { fetchStudents, fetchedStudentData, deleteStudent } = useContext(StudentContext);
    const { labfetchedData } = useContext(LabContent)
    const { systemFetchData } = useContext(SystemContent)

    useEffect(() => {
        fetchStudents();
    }, []);

    const getLabName = (labid) => {
        return labfetchedData.find((lab) => {
            return labid == lab.id
        })?.name
    }
    const getPcName = (pcid) => {
        return systemFetchData.find((system) => {
            return pcid == system.id
        })?.system_name
    }

    return (
        <div className="bg-[#111827] h-screen">
            <div className="container mx-auto p-4">
                <div className="flex mt-8 md:mt-12 justify-between items-center mb-6">
                    <h2 className="font-semibold text-2xl md:text-3xl text-white">Students</h2>
                    <Link
                        to={"/addstudent"}
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        + Add Student
                    </Link>
                </div>
                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Grid</th>
                                <th className="px-6 py-3">Lab Name</th>
                                <th className="px-6 py-3">Pc Name</th>
                                <th className="px-6 py-3">Course</th>
                                <th className="px-6 py-3">Created At</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchedStudentData.length > 0 ? (
                                fetchedStudentData.map((stu) => (
                                    <tr
                                        key={stu.id}
                                        className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {stu.name}
                                        </td>
                                        <td className="px-6 py-4">{stu.grid}</td>
                                        <td className="px-6 py-4">{getLabName(stu.labid)}</td>
                                        <td className="px-6 py-4">
                                             {getPcName(stu.pcid) || "Not-Assigned"}
                                        </td>

                                        <td className="px-6 py-4">{stu.course}</td>
                                        <td className="px-6 py-4">{stu.createdAt?.toDate().toLocaleDateString()}</td>
                                        <td className="px-6 py-4 flex gap-3">
                                            <Link to={`/edit-student/${stu.id}`} className="text-blue-500">
                                                Edit
                                            </Link>
                                            <button
                                                className="font-medium text-red-600 hover:underline"
                                                onClick={() => deleteStudent(stu)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-gray-800">
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                                        No Student added yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5">
                    <BackToDashboard />
                </div>
            </div>
        </div>
    );
};

export default Student;
