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
import Editlabs from "./pages/Editlabs"
import AddSystem from "./pages/AddSystem"
import EditSystem from "./pages/EditSystem"
import AddStudent from "./pages/AddStudent"
import EditStudents from "./pages/EditStudents"
import ViewPcByLab from "./pages/ViewPcByLab"
import ViewStudentByPc from "./pages/ViewStudentByPcs"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContentProvider"

const App = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <BrowserRouter>
                {user && <Header />}
                <Routes>
                    <Route path="/" element={<ProtectedRoute Comp={Dashboard} />} />
                    <Route path="/login" element={<ReverceProtectedRoutes Comp={Login} />} />
                    <Route path="/profile" element={<ProtectedRoute Comp={ProfilePage} />} />
                    <Route path="/settings" element={<ProtectedRoute Comp={SettingsPage} />} />
                    <Route path="/systems" element={<ProtectedRoute Comp={System} />} />
                    <Route path="/lab" element={<ProtectedRoute Comp={Lab} />} />
                    <Route path="/student" element={<ProtectedRoute Comp={Student} />} />
                    <Route path="/addlabs" element={<ProtectedRoute Comp={AddLabs} />} />
                    <Route path="/addsystems" element={<ProtectedRoute Comp={AddSystem} />} />
                    <Route path="/addstudent" element={<ProtectedRoute Comp={AddStudent} />} />
                    <Route path="/forgot-password" element={<ReverceProtectedRoutes Comp={ForgotPassword} />} />
                    <Route path="/edit-lab/:id" element={<ProtectedRoute Comp={Editlabs} />} />
                    <Route path="/edit-system/:id" element={<ProtectedRoute Comp={EditSystem} />} />
                    <Route path="/edit-student/:id" element={<ProtectedRoute Comp={EditStudents} />} />
                    <Route path="/viewpcbylab/:id" element={<ProtectedRoute Comp={ViewPcByLab} />} />
                    <Route path="/viewstudentbypc/:id" element={<ProtectedRoute Comp={ViewStudentByPc} />} />
                    <Route path="*" element={<Error />} />

                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </div>
    )
}

export default App