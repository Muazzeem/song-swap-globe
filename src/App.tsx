
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
import StatsPage from "./pages/StatsPage";
import LibraryPage from "./pages/LibraryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } />
            <Route path="/profile" element={
              <AuthGuard>
                <ProfilePage />
              </AuthGuard>
            } />
            <Route path="/library" element={
              <AuthGuard>
                <LibraryPage />
              </AuthGuard>
            } />
            <Route path="/stats" element={
              <AuthGuard>
                <StatsPage />
              </AuthGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
