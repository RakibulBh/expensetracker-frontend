import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (firstName, lastName, email, password, checkbox) => {
    let errors = {};

    if (!firstName.trim()) {
      errors.firstName = "First name cannot be empty.";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name cannot be empty.";
    }

    if (!email.trim()) {
      errors.email = "Email cannot be empty.";
    }

    if (!password) {
      errors.password = "Password cannot be empty.";
    }

    if (!checkbox) {
      errors.checkbox = "You must agree to the terms and conditions.";
    }

    if (Object.keys(errors).length > 0) {
      setError({ errors });
      return;
    }

    setIsLoading(true);
    setError(null);

    const response = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
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

  return { register, error, isLoading };
};
