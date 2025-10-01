import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContentProvider";

const ForgotPassword = () => {
  const auth = getAuth(app);
  const { forgetPassword } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    await forgetPassword(email); 
    setLoading(false);
    setEmail(""); 
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white text-center">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          Enter your email address to receive a reset link.
        </p>
        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-transparent text-white border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
