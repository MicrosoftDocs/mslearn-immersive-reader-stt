import { QueryClient, QueryClientProvider } from "react-query";

// local imports
import "./App.css";
import { TokenContextProvider } from "./context";
import { Home } from "./pages";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <TokenContextProvider>
          <Home />
        </TokenContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
