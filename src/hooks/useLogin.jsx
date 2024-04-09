import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useLogin = () => {
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const errors = {};

    if (!email) {
      errors.email = "Email cannot be empty.";
    }

    if (!password) {
      errors.password = "Password cannot be empty.";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setIsLoading(true);
    setError(null);

    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
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
