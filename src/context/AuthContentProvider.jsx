import { getAuth, onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { data } from "react-router-dom"
import { app } from "../config/firebase"


export const AuthContext = createContext()
export const AuthContentProvider = ({ children }) => {
    const [user,setUser] = useState()

    const auth = getAuth(app)
    useEffect(() => {
        onAuthStateChanged(auth, (data) => {
            setUser(data)
        })
    }, [])
    
    const value = {
        user    
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContentProvider