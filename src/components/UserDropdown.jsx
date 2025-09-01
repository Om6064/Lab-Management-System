import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const UserDropdown = ({ user, localHandleLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative block" ref={dropdownRef}>
      {/* Avatar + Email */}
      <div
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
          {user?.email ? user.email[0].toUpperCase() : "U"}
        </div>
        <span className="hidden md:block text-gray-200 font-medium truncate max-w-[120px]">
          {user?.email || "Guest"}
        </span>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 z-50">
          {user ? (
            <>
              <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                Signed in as:{" "}
                <span className="font-bold block text-white truncate">
                  {user.email}
                </span>
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Settings
              </Link>
              <div className="border-t border-gray-700 my-1"></div>
              <button
                onClick={localHandleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-300">
              <Link
                to="/login"
                className="block w-full text-left hover:text-blue-400"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
