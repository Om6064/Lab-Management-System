import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SystemContent } from "../context/SystemContentProvider";
import { LabContent } from "../context/LabContentProvider";
import BackToDashboard from "../components/BackToDashboard";

const System = () => {
  const { systemFetchData, deleteSystem, changeStateToRepair,changeStateToAvailable } = useContext(SystemContent);
  const { labfetchedData } = useContext(LabContent);

  const [searchTerm, setSearchTerm] = useState("");

  const getLabName = (labid) => {
    return labfetchedData.find((lab) => labid === lab.id)?.name;
  };


  const filteredSystems = systemFetchData.filter((system) => {
    const labName = getLabName(system.labid) || "Not-Assign";
    return [system.system_name, labName, system.status]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-[#111827] min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row mt-8 md:mt-12 justify-between items-center mb-6 gap-4">
          <h2 className="font-semibold text-2xl md:text-3xl text-white">Systems</h2>
          <div className="flex gap-3 w-full md:w-auto">

            <input
              type="text"
              placeholder="Search systems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link
              to={"/addsystems"}
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              + Add System
            </Link>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">System Name</th>
                <th scope="col" className="px-6 py-3">Lab Name</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Create Date</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSystems.length > 0 ? (
                filteredSystems.map((system) => (
                  <tr
                    key={system.id}
                    className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {system.system_name}
                    </td>
                    <td className="px-6 py-4 ">
                      {getLabName(system.labid) || "Not-Assign"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${system.status === "Occupied"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : system.status === "Available"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : system.status === "In-Repairing"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                      >
                        {system.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 ">
                      {system.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <Link to={`/edit-system/${system.id}`} className="text-blue-500">Edit</Link>
                      <button
                        className="font-medium text-red-600 hover:underline"
                        onClick={() => deleteSystem(system.id)}
                      >
                        Delete
                      </button>
                      {system.status !== "In-Repairing" ? (
                        <button
                          className="font-medium text-yellow-600 hover:underline"
                          onClick={() => changeStateToRepair(system.id)}
                        >
                          Go To Repair
                        </button>
                      ) : (
                        <button
                          className="font-medium text-yellow-600 hover:underline"
                          onClick={() => changeStateToAvailable(system.id)}
                        >
                          Make Available
                        </button>
                      )}

                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-gray-800">
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                    No systems found.
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
