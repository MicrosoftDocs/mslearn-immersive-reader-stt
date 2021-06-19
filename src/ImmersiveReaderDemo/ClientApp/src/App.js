import { QueryClient, QueryClientProvider } from "react-query";

// local imports
import "./App.css";
import { SettingsContextProvider } from "./context";
import { QUERY_CLIENT_DEFAULTS } from "./config";
import { Home } from "./pages";

const queryClient = new QueryClient(QUERY_CLIENT_DEFAULTS);
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SettingsContextProvider>
          <Home />
        </SettingsContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
