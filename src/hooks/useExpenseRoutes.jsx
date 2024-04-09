import { useState } from "react";
import { useExpensesContext } from "./useExpensesContext";
import { useAuthContext } from "./useAuthContext";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useExpenseRoutes = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useExpensesContext();

  const { user } = useAuthContext();

  const addExpense = async (title, amount, category) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${backendUrl}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title, amount, category }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setIsLoading(false);
    }

    if (response.ok) {
      dispatch({
        type: "ADD_EXPENSE",
        payload: data,
      });
      setIsLoading(false);
    }
  };

  const editExpense = async ({ id, title, amount, category, createdAt }) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${backendUrl}/expenses/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title, amount, category, createdAt }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setIsLoading(false);
    }

    if (response.ok) {
      dispatch({
        type: "SET_EXPENSES",
        payload: data,
      });
      setIsLoading(false);
    }
  };

  const deleteExpense = async ({ id }) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${backendUrl}/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setIsLoading(false);
    }

    if (response.ok) {
      dispatch({
        type: "DELETE_EXPENSE",
        payload: data,
      });
      setIsLoading(false);
    }
  };

  return { deleteExpense, editExpense, addExpense, error, isLoading };
};
