import { useContext } from "react"
import { Link } from "react-router-dom";
import { SystemContent } from "../context/SystemContentProvider";
import { LabContent } from "../context/LabContentProvider";
import BackToDashboard from "../components/BackToDashboard";

const System = () => {
    const { systemFetchData, deleteSystem,changeStateToRepair } = useContext(SystemContent);
    console.log(systemFetchData);
    const { labfetchedData } = useContext(LabContent)

    const getLabName = (labid) => {
        return labfetchedData.find((lab) => {
            return labid == lab.id
        })?.name
    }

    return (
        <div className="bg-[#111827] h-screen">
            <div className="container mx-auto p-4">
                <div className="flex mt-8 md:mt-12 justify-between items-center mb-6">
                    <h2 className="font-semibold text-2xl md:text-3xl text-white">Systems</h2>
                    <Link
                        to={"/addsystems"}
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        + Add System
                    </Link>
                </div>
                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Systems Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Lab Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Create Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemFetchData.length > 0 ? (
                                systemFetchData.map((system) => (
                                    <tr
                                        key={system.id}
                                        className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {system.system_name}
                                        </td>
                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {getLabName(system.labid) || "Not-Assign"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
      ${system.status === "Occupied" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                        : system.status === "Available" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                            : system.status === "In-Repairing" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                    }`}
                                            >
                                                {system.status}
                                            </span>
                                        </td>


                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {system.createdAt.toDate().toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 flex gap-3">
                                            <Link to={`/edit-system/${system.id}`} className="text-blue-500">Edit</Link>
                                            <button className="font-medium text-red-600 hover:underline" onClick={() => deleteSystem(system.id)}>Delete</button>
                                            {
                                                system.status !== "In-Repairing" && <button className="font-medium text-yellow-600 hover:underline" onClick={() => {
                                                    changeStateToRepair(system.id)
                                                }}>Go To Repair</button>
                                            }
                                            {
                                                system.status === "Occupied" && <Link to={`/viewstudentbypc/${system.id}`} className="font-medium hover:underline ">View</Link>
                                            }
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-gray-800">
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                                        No Systems added yet.
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

export default System;