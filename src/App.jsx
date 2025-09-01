import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import ReverceProtectedRoutes from "./components/ReverceProtectedRoutes"
import Header from "./components/Header"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import System from "./pages/System"
import Lab from "./pages/Lab"
import Student from "./pages/Student"
import AddLabs from "./pages/AddLabs"
import Error from "./pages/Error"
import ForgotPassword from "./components/ForgotPassword"

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<ProtectedRoute Comp={Dashboard} />} />
                    <Route path="/login" element={<ReverceProtectedRoutes Comp={Login} />} />
                    <Route path="/profile" element={<ProtectedRoute Comp={ProfilePage} />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/systems" element={<ProtectedRoute Comp={System} />} />
                    <Route path="/lab" element={<ProtectedRoute Comp={Lab} />} />
                    <Route path="/student" element={<ProtectedRoute Comp={Student} />} />
                    <Route path="/addlabs" element={<ProtectedRoute Comp={AddLabs} />} />
                    <Route path="/forgot-password" element={<ReverceProtectedRoutes Comp={ForgotPassword} />} />
                    <Route path="*" element={<Error />} />

                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </div>
    )
}

export default App