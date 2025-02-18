import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../api/queryClients";
import { BrowserRouter } from "react-router";
import { Layout } from "./Layout";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
