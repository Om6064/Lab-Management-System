import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContentProvider"
import { useNavigate } from "react-router-dom"

const ReverceProtectedRoutes = ({Comp}) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user !== null) {
            navigate("/")
            return
        }
    }, [])

    return (
        <Comp />
    )
}

export default ReverceProtectedRoutes