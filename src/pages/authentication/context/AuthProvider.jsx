import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "../../../lib/axios";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }
  }, []);

  const persistAuth = (data) => {
    const { token, ...profile } = data || {};
    if (token) localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const signup = async (payload) => {
    setLoading(true);
    setError("");
    try {
      const body = {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        password: payload.password,
      };
      const res = await api.post("/auth/signup", body);
      const data = res.data?.data || res.data?.user || res.data;
      persistAuth(data);
      return data;
    } catch (e) {
      const msg = "Signup failed";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", payload);
      const data = res.data?.data || res.data?.user || res.data;
      persistAuth(data);
      return data;
    } catch (e) {
      const msg = "Login failed";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async ({ email }) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/forgotPassword", { email });
      return true;
    } catch (e) {
      return true;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, { password, passwordConfirm }) => {
    setLoading(true);
    setError("");
    try {
      await api.patch(`/auth/resetPassword/${token}`, {
        password,
      });
      return true;
    } catch (e) {
      const msg = e.message || "Reset failed";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      setError,
      login,
      signup,
      forgotPassword,
      resetPassword,
      logout,
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
