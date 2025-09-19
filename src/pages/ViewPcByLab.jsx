import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { ArrowLeft } from "lucide-react";

const ViewPcByLab = () => {
  const { id } = useParams();
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const q = query(collection(db, "system"), where("labid", "==", id));
        const snapshot = await getDocs(q);
        const arr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setSystems(arr);
      } catch (err) {
        console.error("Error fetching PCs by lab:", err);
      }
    };

    fetchSystems();
  }, [id]);

  return (
    <div className="bg-[#111827] h-screen p-6">

      <div className="container mx-auto">
        <h2 className=" text-2xl font-bold text-white mb-6">PCs in this Lab</h2>

        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">System Name</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {systems.length > 0 ? (
                systems.map((sys) => (
                  <tr
                    key={sys.id}
                    className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {sys.system_name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${sys.status === "Occupied"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : sys.status === "Available"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : sys.status === "In-Repairing"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                      >
                        {sys.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {sys.createdAt?.toDate
                        ? sys.createdAt.toDate().toLocaleDateString()
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
                    No PCs found for this lab.
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
            Back to Labs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewPcByLab;
