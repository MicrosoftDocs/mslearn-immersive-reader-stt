// local imports
import "./App.css";
import { useToken } from "./context";

export const Layout = ({ children }) => {
  const { isLoading, isError } = useToken();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error</>;
  }
  return <>{children}</>;
};
