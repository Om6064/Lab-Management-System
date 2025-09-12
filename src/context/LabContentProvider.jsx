import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

export const LabContent = createContext();

const LabContentProvider = ({ children }) => {
  const labCollectionRef = collection(db, "labs");
  const [labfetchedData, setLabFetchedData] = useState([]);


  const addLabs = async (labs) => {
    try {
      await addDoc(labCollectionRef, {
        ...labs,
        createdAt: new Date(),
      });
      // toast.success("Lab Added Successfully");
      fetchData();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const fetchData = async () => {
    try {
      const labsSnapshots = await getDocs(labCollectionRef);
      const arr = labsSnapshots.docs.map((lab) => ({
        ...lab.data(),
        id: lab.id,
      }));
      setLabFetchedData(arr);
    } catch (error) {
      toast.error("Failed to fetch labs");
    }
  };

  const deleteLab = async (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Do you want to delete?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "labs", id));
                  toast.success("Lab Deleted Successfully");
                  fetchData();
                  closeToast();
                } catch (error) {
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

  const editLab = async (id, updatedData) => {
    try {
      const labRef = doc(db, "labs", id);
      await updateDoc(labRef, {
        ...updatedData,
        updatedAt: new Date(),
      });
      toast.success("Lab Updated Successfully");
      fetchData();
    } catch (error) {
      toast.error("Something Went Wrong While Updating");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const value = {
    addLabs,
    labfetchedData,
    fetchData,
    deleteLab,
    editLab,
  };

  return <LabContent.Provider value={value}>{children}</LabContent.Provider>;
};

export default LabContentProvider;
