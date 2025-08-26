import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContentProvider";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const auth = getAuth(app);
  const { user, handleLogout } = useContext(AuthContext); // Assuming handleLogout is in your AuthContext
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If you don't have handleLogout in context, use this function
  const localHandleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong during logout.");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="max-w-screen-2xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and System Name */}
          <a href="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
            {/* Custom SVG for a computer lab theme (e.g., a code tag) */}
            <svg
              className="w-9 h-9 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span className="self-center text-2xl font-extrabold tracking-wide text-white">
              TechLab Hub
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-grow justify-center space-x-12">
            <Link to="/" className="text-gray-300 hover:text-blue-500 font-semibold transition-colors text-lg">
              Dashboard
            </Link>
            <Link to="/systems" className="text-gray-300 hover:text-blue-500 font-semibold transition-colors text-lg">
              Systems
            </Link>
            <Link to="/lab" className="text-gray-300 hover:text-blue-500 font-semibold transition-colors text-lg">
              Lab
            </Link>
            <Link to="/student" className="text-gray-300 hover:text-blue-500 font-semibold transition-colors text-lg">
              Student
            </Link>
          </div>

          {/* User Profile and Logout */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                    {user.email ? user.email[0].toUpperCase() : "U"}
                  </div>
                  <span className="hidden md:block text-gray-200 font-medium">
                    {user.email || "User"}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 ease-out z-50">
                  <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                    Signed in as: <span className="font-bold block text-white">{user.email}</span>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    Settings
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button onClick={localHandleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                    Logout
                  </button>
                </div>
              </div>
            )}
            <button onClick={toggleMobileMenu} type="button" className="md:hidden inline-flex items-center p-2 text-sm text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" aria-expanded={isMobileMenuOpen ? "true" : "false"}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col mt-4 space-y-2 font-medium">
            <li><a href="/dashboard" className="block py-2 px-4 text-white rounded-lg hover:bg-gray-700 transition-colors" onClick={toggleMobileMenu}>Dashboard</a></li>
            <li><a href="/systems" className="block py-2 px-4 text-white rounded-lg hover:bg-gray-700 transition-colors" onClick={toggleMobileMenu}>Systems</a></li>
            <li><a href="/reservations" className="block py-2 px-4 text-white rounded-lg hover:bg-gray-700 transition-colors" onClick={toggleMobileMenu}>Reservations</a></li>
            <li><a href="/software" className="block py-2 px-4 text-white rounded-lg hover:bg-gray-700 transition-colors" onClick={toggleMobileMenu}>Software</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;