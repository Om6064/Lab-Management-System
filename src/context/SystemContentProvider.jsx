import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, writeBatch, increment, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { LabContent } from "./LabContentProvider";

export const SystemContent = createContext();

const SystemContentProvider = ({ children }) => {
  const [systemFetchData, setSystemFetchData] = useState([]);
  const systemCollectionRef = collection(db, "system");

  const addSystem = async (data) => {
  try {
  
    const labRef = doc(db, "labs", data.labid);
    const labSnap = await getDoc(labRef);

    const labData = labSnap.data();

    if (labData.capacity <= 0) {
      toast.error("No capacity left in this lab");
      return;
    }


    await addDoc(systemCollectionRef, {
      ...data,
      createdAt: new Date(),
    });

    await updateDoc(labRef, {
      capacity: increment(-1),
    });

    toast.success("System Added Successfully");
    fetchSystems();
  } catch (error) {
    console.error("Error adding system:", error);
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
                  const systemRef = doc(db, "system", id);
                  const systemSnap = await getDoc(systemRef);
                  const systemData = systemSnap.data();

                  
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

                
                  await deleteDoc(systemRef);

              
                  if (systemData?.labid) {
                    await updateDoc(doc(db, "labs", systemData.labid), {
                      capacity: increment(1),
                    });
                  }

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
      const systemRef = doc(db, "system", id);

    
      await updateDoc(systemRef, {
        ...data,
        updatedAt: new Date()
      });


      if (data.status === "Available") {
        const studentQuery = query(
          collection(db, "students"),
          where("pcid", "==", id)
        );
        const studentSnap = await getDocs(studentQuery);

        const batch = writeBatch(db);
        studentSnap.forEach((studentDoc) => {
          batch.update(studentDoc.ref, {
            pcName: "Not Assigned",
            labName: "Not Assigned",
            pcid: null,
            updatedAt: new Date()
          });
        });
        await batch.commit();
      }

      toast.success("System Updated Successfully");
      fetchSystems();
    } catch (error) {
      console.error("Error updating system:", error);
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
