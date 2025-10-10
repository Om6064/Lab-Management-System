import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { ArrowLeft } from "lucide-react";

const ViewStudentByPc = () => {
    const { id } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const q = query(collection(db, "students"), where("pcid", "==", id));
                const snapshot = await getDocs(q);
                const arr = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setStudents(arr);
            } catch (err) {
                console.error("Error fetching students by PC:", err);
            }
        };

        fetchStudents();
    }, [id]);

    return (
        <div className="bg-[#111827] h-screen p-6 md:ml-64">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">Students on this PC</h2>

                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Student Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Assigned At</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {student.name || "N/A"}
                                        </td>
                                        <td className="px-6 py-4">{student.email || "N/A"}</td>
                                        <td className="px-6 py-4">
                                            {student.createdAt?.toDate
                                                ? student.createdAt.toDate().toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 flex gap-3">
                                            <button className="text-blue-500 hover:underline">Edit</button>
                                            <button className="text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-gray-800">
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                                        No students assigned to this PC.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            <div className="mt-6">
                <Link
                    to="/systems"
                    className="inline-flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Systems
                </Link>
            </div>
            </div>
        </div>
    );
};

export default ViewStudentByPc;
