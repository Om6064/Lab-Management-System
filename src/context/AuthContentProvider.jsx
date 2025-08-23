import { createContext, useState } from "react"


export const AuthContext =  createContext()
export const AuthContentProvider = ({children}) => {
    const [count,setCount] = useState(0);
    const [input,setInput] = useState([]);
    
    const value = {
    count,input,setCount
}
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContentProvider