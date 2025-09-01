import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContentProvider";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const auth = getAuth(app);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const localHandleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Something went wrong during logout.");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <nav className="max-w-screen-2xl mx-auto px-3 sm:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9 text-blue-500"
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
            <span className="text-xl sm:text-2xl font-extrabold tracking-wide">
              TechLab Hub
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-grow justify-center space-x-8 lg:space-x-12">
            <Link
              to="/"
              className="text-gray-300 hover:text-blue-500 font-semibold transition-colors text-base lg:text-lg"
            >
              Dashboard
            </Link>
            <Link
              to="/systems"
              className="text-gray-300 hover:text-blue-500 font-semibold transition-colors text-base lg:text-lg"
            >
              Systems
            </Link>
            <Link
              to="/lab"
              className="text-gray-300 hover:text-blue-500 font-semibold transition-colors text-base lg:text-lg"
            >
              Lab
            </Link>
            <Link
              to="/student"
              className="text-gray-300 hover:text-blue-500 font-semibold transition-colors text-base lg:text-lg"
            >
              Student
            </Link>
          </div>

          {/* User Profile */}
          <UserDropdown user={user} localHandleLogout={localHandleLogout} />


          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="md:hidden inline-flex items-center p-2 text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col mt-3 space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/systems"
                className="block py-2 px-3 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                onClick={toggleMobileMenu}
              >
                Systems
              </Link>
            </li>
            <li>
              <Link
                to="/lab"
                className="block py-2 px-3 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                onClick={toggleMobileMenu}
              >
                Lab
              </Link>
            </li>
            <li>
              <Link
                to="/student"
                className="block py-2 px-3 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                onClick={toggleMobileMenu}
              >
                Student
              </Link>
            </li>

            {/* Mobile User Actions */}
            {user && (
              <>
                <li className="border-t border-gray-700 pt-2">
                  <span className="block px-3 py-1 text-gray-400 text-xs">
                    Signed in as
                  </span>
                  <span className="block px-3 text-white text-sm font-bold truncate">
                    {user.email}
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localHandleLogout();
                      toggleMobileMenu();
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
