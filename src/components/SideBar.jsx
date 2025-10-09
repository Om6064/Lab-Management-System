import { LayoutDashboard, Monitor, Users, Settings, Building2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Labs", icon: Building2, path: "/lab" },
  { name: "Systems", icon: Monitor, path: "/systems" },
  { name: "Students", icon: Users, path: "/student" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = ({ isOpen, onLogout }) => {
  return (
    <aside
      className={`w-64 bg-gray-900 text-gray-200 min-h-screen p-6 flex flex-col shadow-xl fixed top-0 left-0 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
        transition-transform duration-300 z-40`}
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-10 text-center tracking-wide">
        Admin Panel
      </h2>

      <ul className="space-y-3 flex flex-col flex-grow">
        {navItems.map(({ name, icon: Icon, path }) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-gray-800 hover:text-white text-gray-400"
                }`
              }
            >
              <Icon size={20} />
              {name}
            </NavLink>
          </li>
        ))}
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
