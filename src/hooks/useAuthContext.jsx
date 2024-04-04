import { AuthContext } from "../context/AuthContext"; // Adjust the path as necessary
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      "useAuthContextProvider must be used inside an useAuthContextProvider"
    );
  }

  return context;
};
