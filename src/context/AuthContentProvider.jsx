import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../config/firebase";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContentProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });
    return () => unsubscribe();
  }, []);


  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
    } catch (error) {
      let errorMessage = "An unknown error occurred.";
      if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Too many failed login attempts. Please try again later.";
      } else if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password.";
      } else {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw error; 
    } finally {
      setLoading(false);
    }
  };


  const forgetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Please check your inbox.");
    } catch (error) {
      let errorMessage = "Something went wrong.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  
  const resetPassword = async (oldPassword, newPassword) => {
    if (!auth.currentUser) {
      toast.error("No user is logged in!");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        oldPassword
      );

      
      await reauthenticateWithCredential(auth.currentUser, credential);

      
      await updatePassword(auth.currentUser, newPassword);

      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Something went wrong during logout.");
    }
  };

  const value = { user, login, forgetPassword, resetPassword, logout, loading };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthContentProvider;
