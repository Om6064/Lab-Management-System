import { LayoutDashboard, Monitor, Users, Settings, Building2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onLogout }) => {
  const location = useLocation();

  return (
    <aside
      className={`w-64 bg-gray-900 text-gray-200 min-h-screen p-6 flex flex-col shadow-xl fixed top-0 left-0 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
        transition-transform duration-300 z-40`}
    >
      <Link to={"/"} className="text-2xl font-bold text-blue-400 mb-10 text-center tracking-wide">
        Admin Panel
      </Link>

      <ul className="space-y-3 flex flex-col flex-grow">
        <li>
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
              location.pathname === "/" 
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-gray-800 hover:text-white text-gray-400"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/lab"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
              location.pathname === "/lab" || location.pathname === "/addlabs" || location.pathname.includes("/edit-lab") || location.pathname.includes("/viewpcbylab")
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-gray-800 hover:text-white text-gray-400"
            }`}
          >
            <Building2 size={20} />
            Labs
          </Link>
        </li>
        <li>
          <Link
            to="/systems"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
              location.pathname === "/systems" || location.pathname === "/addsystems" || location.pathname.includes("/edit-system") || location.pathname.includes("/viewstudentbypc")
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-gray-800 hover:text-white text-gray-400"
            }`}
          >
            <Monitor size={20} />
            Systems
          </Link>
        </li>
        <li>
          <Link
            to="/student"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
              location.pathname === "/student" || location.pathname === "/addstudent" || location.pathname.includes("/edit-student") 
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-gray-800 hover:text-white text-gray-400"
            }`}
          >
            <Users size={20} />
            Students
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
              location.pathname === "/settings" 
                ? "bg-blue-600 text-white shadow-md" 
                : "hover:bg-gray-800 hover:text-white text-gray-400"
            }`}
          >
            <Settings size={20} />
            Settings
          </Link>
        </li>
      </ul>

      <div className="mt-auto pt-6 border-t border-gray-700">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200"
          onClick={onLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12H3m12 0l-4-4m4 4l-4 4m6-4h6"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
