import React from "react";
import { useQuery } from "react-query";

// local imports
import { fetchSetting } from "../api";

export const SettingsContext = React.createContext({
  settings: undefined,
  status: "idle",
  isLoading: false,
  isError: false,
});

export function SettingsContextProvider({ children }) {
  const {
    data: settings,
    error,
    isLoading,
    isError,
  } = useQuery("settings", fetchSetting);
  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <>Sorry something went wrong. Please reload the page.</>;
  }
  return (
    <SettingsContext.Provider value={{ settings, error, isLoading, isError }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => React.useContext(SettingsContext);
