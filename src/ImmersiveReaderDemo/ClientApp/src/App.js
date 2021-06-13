import { QueryClient, QueryClientProvider } from "react-query";

// local imports
import "./App.css";
import { SettingsContextProvider } from "./context";
import { Home } from "./pages";

const queryClient = new QueryClient();
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
