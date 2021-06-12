import React from "react";
import { useQuery } from "react-query";

// local imports
import { fetchToken } from "../api";

export const TokenContext = React.createContext({
  user: undefined,
  status: "idle",
  isLoading: false,
  isError: false,
});

export function TokenContextProvider({ children }) {
  const {
    data: token,
    error,
    isLoading,
    isError,
  } = useQuery("token", fetchToken);
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error</>;
  }
  return (
    <TokenContext.Provider value={{ token, error, isLoading, isError }}>
      {children}
    </TokenContext.Provider>
  );
}

export const useToken = () => React.useContext(TokenContext);
