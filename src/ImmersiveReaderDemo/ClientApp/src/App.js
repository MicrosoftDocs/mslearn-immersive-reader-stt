import { useEffect } from "react";
import { register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
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
  useEffect(() => {
    const registerWavEncoder = async () => {
      try {
        await register(await connect());
      } catch {}
    };
    registerWavEncoder();
  }, []);
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
