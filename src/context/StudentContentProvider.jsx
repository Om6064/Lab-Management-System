import { addDoc, collection, getDocs } from "firebase/firestore"
import { createContext, useState } from "react"
import { toast } from "react-toastify"

export const StudentContent = createContext()
const StudentContentProvider = ({ children }) => {
    const [fatchedStudentData, setFetchedStudentData] = useState([])
    const addStudent = async (data) => {
        await addDoc(collection("students"), {
            ...data.data(),
            id: data.id
        })
    }

    const fetchStudents = async () => {
        try {
            const studentSnapShot = await getDocs(collection("students"))
            let arr = studentSnapShot.docs.map((student) => ({
                ...student.data(),
                id: student.id
            }))
            setFetchedStudentData(arr)
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }

    const value = {
        addStudent, fetchStudents,fatchedStudentData
    }
    return (
        <StudentContent.Provider value={value}>
            {children}
        </StudentContent.Provider>
    )
}

export default StudentContentProvider