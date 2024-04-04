import { useAuthContext } from "./useAuthContext";
import { useExpensesContext } from "../hooks/useExpensesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { expenses, dispatch: dispatchExpenses } = useExpensesContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatchExpenses({
      type: "SET_EXPENSES",
      payload: [],
    });

    dispatch({
      type: "LOGOUT",
    });
  };

  return { logout };
};
