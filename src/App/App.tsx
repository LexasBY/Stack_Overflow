import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/queryClients";
import { BrowserRouter } from "react-router";
import Router from "./providers/Router";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
