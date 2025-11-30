import { useState, useEffect } from "react";
import { authService } from "../services/authService";
import type { User, LoginCredentials, SignupCredentials } from "../types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const storedUser = authService.getUser();
    if (storedUser && !user) {
      setUser(storedUser);
    }
  }, [user]);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setLoading(true);
    try {
      const response = await authService.signup(credentials);
      setUser(response.user);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  };
}
