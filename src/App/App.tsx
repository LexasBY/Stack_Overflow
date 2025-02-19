import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../api/queryClients";
import { BrowserRouter } from "react-router";
import Router from "./Router";

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
