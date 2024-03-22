import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const axios = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    const response = await axios.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    setIsLoading(false);
    return response;
  };

  const signUp = async (username, name, email, password) => {
    const response = await axios.post("/auth/signup", {
      username,
      name,
      email,
      password,
    });
    setIsLoading(false);
    setUser(response.data.user);
    return response;
  };
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    setIsLoading(false);
  };

  useEffect(() => {
    const unSubscribe = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setIsLoading(true);
          const response = await axios.post(
            "/auth/token-verify",
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          );
          setUser(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Token verification failed:", error);
          setUser(null);
          localStorage.removeItem("token");
          setIsLoading(false);
        }
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };

    unSubscribe();
  }, [axios]);

  const userInfo = {
    login,
    signUp,
    logout,
    user,
    setUser,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider