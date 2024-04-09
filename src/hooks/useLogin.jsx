import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const backendUrl = process.env.VITE_BACKEND_URL;

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setIsLoading(false);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
