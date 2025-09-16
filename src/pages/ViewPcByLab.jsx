import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

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
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">PCs in this Lab</h2>

      {systems.length > 0 ? (
        <table className="w-full border border-gray-600">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">System Name</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {systems.map((sys) => (
              <tr key={sys.id} className="border-b border-gray-600">
                <td className="p-2">{sys.system_name}</td>
                <td className="p-2">{sys.status}</td>
                <td className="p-2">
                  {sys.createdAt?.toDate
                    ? sys.createdAt.toDate().toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No PCs found for this lab.</p>
      )}
    </div>
  );
};

export default ViewPcByLab;
