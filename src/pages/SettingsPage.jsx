import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContentProvider";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const { resetPassword } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("security");
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    await resetPassword(passwordForm.oldPassword, passwordForm.newPassword);

    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 w-full max-w-3xl rounded-xl shadow-lg p-6 md:p-10">
        <div className="flex border-b border-gray-700 mb-6">
          {["profile", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm md:text-base font-medium capitalize ${
                activeTab === tab
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "security" && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              Security Settings
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                name="oldPassword"
                value={passwordForm.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              />

              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              />

              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm New Password"
                required
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
