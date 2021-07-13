// local imports
import { useSettings } from "../context";

export const Layout = ({ children }) => {
  const { isLoading, isError } = useSettings();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <>Error</>;
  }
  return (
    <main>
      <div className="conatiner-fluid">{children}</div>
    </main>
  );
};
