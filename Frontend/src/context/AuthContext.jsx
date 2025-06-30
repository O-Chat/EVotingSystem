import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { getToken, setToken, clearToken } from "../utils/token";//Token helpers read / save / delete the JWT from localStorage.

const AuthContext = createContext();//This makes a “box” we can drop auth data into and let any child component read from.

//Every page of your app will sit inside this component (we wrapped it around <App /> in main.jsx).
//Inside the provider we keep state and functions:
export const AuthProvider = ({ children }) => {

    //state variables
  const [user, setUser]     = useState(null);   // { id, role }
  const [loading, setLoading] = useState(false);

  //  Reading the token from localStorage 
//   useEffect(() => {
//     const token = getToken();//get the token from localStorage using the helper function
//     if (token) {
//       try {
//         const { id, role } = JSON.parse(atob(token.split(".")[1]));
//         setUser({ id, role });//populate user
//       } catch (e) {
//         clearToken();//bad token, clear it
//       }
//     }
//   }, []);
useEffect(() => {
  clearToken();      // wipe localStorage token
  setUser(null);     // be sure no user is set
}, []);

  //  Logging in
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axiosClient.post("/auth/login", { email, password });
      setToken(res.data.token);
      const { id, role } = JSON.parse(atob(res.data.token.split(".")[1]));
      setUser({ id, role });
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err?.response?.data?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };//Returns { ok: true } so UI can redirect; otherwise returns { ok: false, error }.

  //  Registering
  const register = async (formData) => {
    try {
      setLoading(true);
      await axiosClient.post("/auth/register", formData);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err?.response?.data?.message || "Register failed" };
    } finally {
      setLoading(false);
    }
  };

  //Logging out
  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
