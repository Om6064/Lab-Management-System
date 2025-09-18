import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, writeBatch } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

export const SystemContent = createContext();

const SystemContentProvider = ({ children }) => {
  const [systemFetchData, setSystemFetchData] = useState([]);
  const systemCollectionRef = collection(db, "system");

  const addSystem = async (data) => {
    try {
      await addDoc(systemCollectionRef, {
        ...data,
        createdAt: new Date(),
      });
      toast.success("System Added Successfully");
      fetchSystems();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const fetchSystems = async () => {
    try {
      const SystemSnapSorts = await getDocs(systemCollectionRef);
      const arr = SystemSnapSorts.docs.map((system) => ({
        ...system.data(),
        id: system.id,
      }));
      setSystemFetchData(arr);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const deleteSystem = async (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Do you want to delete?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={async () => {
                try {
                  const studentQuery = query(
                    collection(db, "students"),
                    where("systemId", "==", id)
                  );
                  const studentSnap = await getDocs(studentQuery);

                  const batch = writeBatch(db);
                  studentSnap.forEach((studentDoc) => {
                    batch.update(studentDoc.ref, { systemId: null });
                  });
                  await batch.commit();

                  await deleteDoc(doc(db, "system", id));

                  toast.success("System Deleted Successfully");
                  fetchSystems();
                  closeToast();
                } catch (error) {
                  console.error("Error deleting system:", error);
                  toast.error("Something Went Wrong");
                }
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Sure
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-300 text-black rounded"
            >
              Not
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };


  const editSystem = async (id, data) => {
    try {
      await updateDoc(doc(db, "system", id), {
        ...data,
        updatedAt: new Date()
      });
      toast.success("System Updated Successfully");
      fetchSystems();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchSystems()
    console.log(systemFetchData);
  }, [])

  const value = {
    addSystem,
    fetchSystems,
    systemFetchData,
    deleteSystem,
    editSystem,
  };

  return (
    <SystemContent.Provider value={value}>
      {children}
    </SystemContent.Provider>
  );
};

export default SystemContentProvider;
