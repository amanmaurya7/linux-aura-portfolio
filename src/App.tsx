
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import System from "./components/System";
import { OSProvider } from "./context/OSContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OSProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<System />} />
          </Routes>
        </BrowserRouter>
      </OSProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
