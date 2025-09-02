import { useContext, useEffect } from "react"
import { LabContent } from "../context/LabContentProvider"
import { Link } from "react-router-dom";

const System = () => {
    const { labfetchedData,fetchData,deleteLab} = useContext(LabContent);
    console.log(labfetchedData);

    useEffect(() => {
        fetchData()
    },[])
    

    return (
        <div className="container mx-auto p-4">
            <div className="flex mt-8 md:mt-12 justify-between items-center mb-6">
                <h2 className="font-semibold text-2xl md:text-3xl text-gray-800 dark:text-white">Labs</h2>
                <Link 
                    to={"/addlabs"} 
                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                >
                    + Add System
                </Link>
            </div>
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Lab Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Capacity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {labfetchedData.length > 0 ? (
                            labfetchedData.map((lab, index) => (
                              <tr 
                                    key={index} 
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {lab.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {lab.capacity}
                                    </td>
                                    <td className="px-6 py-4">
                                        {lab.location}
                                    </td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <Link to={`/edit-lab/${lab.id}`} className="text-blue-500">Edit</Link>
                                        <button className="font-medium text-red-600 hover:underline" onClick={() => deleteLab(lab.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white dark:bg-gray-800">
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                    No Systems added yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default System;