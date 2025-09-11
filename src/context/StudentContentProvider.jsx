import { addDoc, collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const StudentContext = createContext();

const StudentContextProvider = ({ children }) => {
  const [fetchedStudentData, setFetchedStudentData] = useState([]);

  // Add student
  const addStudent = async (data) => {
    try {
      await addDoc(collection(db, "students"), data);
      toast.success("Student added successfully!");
      await fetchStudents(); // refresh list after add
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Something went wrong");
    }
  };

  // Fetch all students
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


  const deleteStudent = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Do you want to delete?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={async () => {
                try {
                  await deleteDoc(doc(db, "students", id));
                  toast.success("Student deleted successfully!");
                  await fetchStudents(); // refresh list after delete
                  closeToast();
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

  const value = {
    addStudent,
    fetchStudents,
    fetchedStudentData,
    deleteStudent,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
