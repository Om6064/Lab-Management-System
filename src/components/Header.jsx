import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContentProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import Sidebar from "./SideBar";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`md:ml-64 bg-gray-900 text-white shadow-md`}
    >
      <Sidebar isOpen={isOpen} onLogout={logout} />
      <nav
        className={`${pathname !== "/" ? "container" : ""
          } mx-auto px-3 sm:px-4 py-3 md:py-4`}
      >
        <div className="flex items-center justify-between">
          <Link
            to={"/"}
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
          </Link>

          {/* {user && (
            <div className="hidden md:flex flex-grow justify-center space-x-6 lg:space-x-10">
              <Link
                to="/"
                className={`font-semibold ${pathname === "/" ? "text-blue-500" : "text-gray-300 hover:text-blue-500"
                  }`}
              >
                Dashboard
              </Link>
              <Link
                to="/systems"
                className={`font-semibold ${["/systems", "/addsystems"].includes(pathname) ||
                  pathname.includes("/viewstudentbypc") ||
                  pathname.includes("/edit-system")
                  ? "text-blue-500"
                  : "text-gray-300 hover:text-blue-500"
                  }`}
              >
                Systems
              </Link>
              <Link
                to="/lab"
                className={`font-semibold ${["/lab", "/addlabs"].includes(pathname) ||
                  pathname.includes("/viewpcbylab") ||
                  pathname.includes("/edit-lab")
                  ? "text-blue-500"
                  : "text-gray-300 hover:text-blue-500"
                  }`}
              >
                Lab
              </Link>
              <Link
                to="/student"
                className={`font-semibold ${["/student", "/addstudent"].includes(pathname) ||
                  pathname.includes("/edit-student")
                  ? "text-blue-500"
                  : "text-gray-300 hover:text-blue-500"
                  }`}
              >
                Student
              </Link>
            </div>
          )} */}

          <div className="hidden md:block">
            <UserDropdown user={user} localHandleLogout={handleLogout} />
          </div>

          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
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

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100 mt-3" : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <ul className="flex flex-col space-y-2 font-medium bg-gray-800 rounded-lg p-3">
            <li>
              <Link
                to="/"
                onClick={toggleMobileMenu}
                className={`block py-2 px-3 rounded ${pathname === "/" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                  }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/systems"
                onClick={toggleMobileMenu}
                className={`block py-2 px-3 rounded ${pathname === "/systems" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                  }`}
              >
                Systems
              </Link>
            </li>
            <li>
              <Link
                to="/lab"
                onClick={toggleMobileMenu}
                className={`block py-2 px-3 rounded ${pathname === "/lab" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                  }`}
              >
                Lab
              </Link>
            </li>
            <li>
              <Link
                to="/student"
                onClick={toggleMobileMenu}
                className={`block py-2 px-3 rounded ${pathname === "/student" ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                  }`}
              >
                Student
              </Link>
            </li>

            {user && (
              <>
                <li className="border-t border-gray-700 pt-2">
                  <span className="block px-3 py-1 text-gray-400 text-xs">Signed in as</span>
                  <span className="block px-3 text-white text-sm font-bold truncate">
                    {user.email}
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded"
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
