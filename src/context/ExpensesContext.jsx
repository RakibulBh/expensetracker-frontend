import { createContext, useReducer, useEffect } from "react";
import React from "react";

export const ExpensesContext = createContext();

export const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        expenses: [action.payload, ...state.expenses],
      };
    case "DELETE_EXPENSE":
      return {
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload._id
        ),
      };
    case "SET_EXPENSES":
      return {
        expenses: action.payload,
      };
    default:
      return state;
  }
};

export const ExpensesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expensesReducer, { expenses: [] });

  return (
    <ExpensesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContext;
