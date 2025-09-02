import { collection, addDoc } from "firebase/firestore";
import { createContext } from "react"
import { db } from "../config/firebase";
import { toast } from "react-toastify";

export const SystemContent = createContext()

const SystemContentProvider = ({children}) => {

    const systemCollectionRef = collection(db, "system");

    const addSystem = async(data) => {
        try {
            await addDoc(systemCollectionRef,data)
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    const value = {
        addSystem
    }
    return (
        <SystemContent.Provider value={value}>
            {children}
        </SystemContent.Provider>
    )
}

export default SystemContentProvider