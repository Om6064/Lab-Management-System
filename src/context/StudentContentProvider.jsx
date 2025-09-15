import { addDoc, collection, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
  const [fetchedStudentData, setFetchedStudentData] = useState([]);


  const addStudent = async (data) => {
    try {
      await addDoc(collection(db, "students"), {
        ...data,
        createdAt: new Date()
      });
      await updateDoc(doc(db, "system", data.pcid), {
        status: "Occupied"
      });
      toast.success("Student added successfully!");
      await fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Something went wrong");
    }
  };


  const fetchStudents = async () => {
    try {
      const studentSnapShot = await getDocs(collection(db, "students"));
      let arr = studentSnapShot.docs.map((student) => ({
        ...student.data(),
        id: student.id,
      }));
      setFetchedStudentData(arr);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Something went wrong");
    }
  };


  const deleteStudent = (data) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Do you want to delete?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "students", data.id));
                  toast.success("Student deleted successfully!");
                  await fetchStudents();
                  closeToast();
                  await updateDoc(doc(db, "system", data.pcid), {
                    status: "Available"
                  });
                } catch (error) {
                  console.error("Error deleting student:", error);
                  toast.error("Something went wrong");
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

  const editStudent = async (id, updatedStudent) => {
    try {
      const studentRef = doc(db, "students", id);
      await updateDoc(studentRef, {
        ...updatedStudent,
        updatedAt: new Date()
      })
      toast.success("Student Updated Successfully")
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }
  const value = {
    addStudent,
    fetchStudents,
    fetchedStudentData,
    deleteStudent,
    editStudent
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
