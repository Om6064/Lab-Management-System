import { addDoc, collection } from "firebase/firestore"
import { createContext, useState } from "react"
import { db } from "../config/firebase"
import { toast } from "react-toastify"
import { getDocs } from "firebase/firestore"

export const LabContent = createContext()
const LabContentProvider = ({ children }) => {
    const labCollactionRef = collection(db, "labs")
    const [labs, setLabs] = useState([])
    const [labfetchedData,setLabFetchedData] = useState([])
    const addLabs = async (labs) => {
        try {
            await addDoc(labCollactionRef, {
                ...labs,
                createdAt: new Date()
            })
            toast.success("Lab Added Successfully")
        } catch (error) {
            toast.error("something Went Wrong")
        }
    }

    const fetchData = async () => {
        const labsSnapshootes = await getDocs(labCollactionRef)
        console.log(labsSnapshootes);
        
        const arr =  labsSnapshootes.docs.map((lab) => {
            console.log(lab);
            
            return {
                ...lab.data(),
                id: lab.id
            }
        })
        setLabFetchedData(arr)
        console.log(arr)
    }

    const value = {
        labs, addLabs,labfetchedData,fetchData
    }
    return (
        <LabContent.Provider value={value}>
            {children}
        </LabContent.Provider>
    )
}

export default LabContentProvider