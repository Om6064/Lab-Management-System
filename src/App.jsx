import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import ReverceProtectedRoutes from "./components/ReverceProtectedRoutes"

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute Comp={Dashboard}/>}/>
                    <Route path="/login" element={<ReverceProtectedRoutes Comp={Login}/>}/>
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </div>
    )
}

export default App