import { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { SystemContent } from "../context/SystemContentProvider";

const System = () => {
    const { systemFetchData,fetchSystems,deleteSystem } = useContext(SystemContent);
    console.log(systemFetchData);

    useEffect(() => {
        fetchSystems()
    }, [])


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
                                    Status
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
                                        <td className="px-6 py-4">
                                            {system.status}
                                        </td>
                                        <td className="px-6 py-4 flex gap-3">
                                            <Link to={`/edit-system/${system.id}`} className="text-blue-500">Edit</Link>
                                            <button className="font-medium text-red-600 hover:underline" onClick={() => deleteSystem(system.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-gray-800">
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                                        No Systems added yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default System;