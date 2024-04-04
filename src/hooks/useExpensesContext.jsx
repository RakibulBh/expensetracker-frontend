import ExpensesContext from "../context/ExpensesContext";
import { useContext, React } from "react";

export const useExpensesContext = () => {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw Error(
      "useExpensesContextProvider must be used inside an useExpensesContextProvider"
    );
  }

  return context;
};

export default useExpensesContext;
