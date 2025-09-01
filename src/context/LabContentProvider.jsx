import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

export const LabContent = createContext();

const LabContentProvider = ({ children }) => {
  const labCollactionRef = collection(db, "labs");
  const [labs, setLabs] = useState([]);
  const [labfetchedData, setLabFetchedData] = useState([]);

  const addLabs = async (labs) => {
    try {
      await addDoc(labCollactionRef, {
        ...labs,
        createdAt: new Date(),
      });
      toast.success("Lab Added Successfully");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const fetchData = async () => {
    const labsSnapshootes = await getDocs(labCollactionRef);

    const arr = labsSnapshootes.docs.map((lab) => {
      return {
        ...lab.data(),
        id: lab.id,
      };
    });
    setLabFetchedData(arr);
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

  const value = {
    labs,
    addLabs,
    labfetchedData,
    fetchData,
    deleteLab,
  };

  return <LabContent.Provider value={value}>{children}</LabContent.Provider>;
};

export default LabContentProvider;
