// local imports
import "./App.css";
import { useSettings } from "./context";

export const Layout = ({ children }) => {
    const { isLoading, isError } = useSettings();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (isError) {
        return <>Error</>;
    }
    return <>{children}</>;
};
