import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  loading: false,
  error: "",
  login: async () => {},
  signup: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  logout: () => {},
  setError: () => {},
});
