import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContentProvider'

const ProtectedRoute = ({ Comp }) => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate("/login")
            return
        }
    }, [user, navigate])

    return (
        <Comp />
    )
}

export default ProtectedRoute