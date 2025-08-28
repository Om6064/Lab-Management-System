import { useState } from "react";
import { app } from "../config/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const auth = getAuth(app);
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, input.email, input.password);
            navigate("/");
            toast.success("Login successful!");
        } catch (error) {
            let errorMessage = "An unknown error occurred.";
            if (error.code === "auth/too-many-requests") {
                errorMessage = "Too many failed login attempts. Please try again later.";
            } else if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                errorMessage = "Invalid email or password.";
            } else {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" className="text-gray-700" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-md p-8 sm:p-12 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700">
                <div className="flex flex-col items-center space-y-6">
                    <div className="p-4 rounded-full bg-blue-500/10 backdrop-blur-sm shadow-blue-500/20">
                        <svg
                            className="w-20 h-20 text-blue-500 animate-pulse-slow"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-white tracking-wide text-center">
                        Welcome to TechLab Hub
                    </h2>
                    <p className="text-sm text-gray-400 text-center">
                        Please sign in to manage your computer lab resources.
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full px-4 py-3 bg-transparent text-white border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-500"
                            placeholder="Email address"
                            onChange={handleChange}
                            value={input.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full px-4 py-3 bg-transparent text-white border-b-2 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-500"
                            placeholder="Password"
                            onChange={handleChange}
                            value={input.password}
                        />
                    </div>

                    <div className="flex justify-end text-sm">
                        <Link to="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                            Forgot Password?
                        </Link>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;