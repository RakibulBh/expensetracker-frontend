import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    if (email.length === 0 && password.length == 0) {
      setError({ error: "password or email cannot be empty" });
      return;
    }

    if (email.length === 0) {
      setError({ error: "email cannot be empty." });
      return;
    }

    if (password.length == 0) {
      setError({
        error: "password cannot be empty.",
      });
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
