import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// local imports
import "./App.css";
import { SettingsContextProvider } from "./context";
import { REACT_QUERY_CLIENT_DEFAULTS } from "./config";
import { Home } from "./pages";
import { Layout } from "./components";

const queryClient = new QueryClient(REACT_QUERY_CLIENT_DEFAULTS);
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SettingsContextProvider>
          <Layout>
            <Home />
          </Layout>
        </SettingsContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
