
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "@/contexts/SearchContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import { SearchResults } from "./pages/SearchResults";
import { Search } from "./pages/Search";
import { ArtisanProfile } from "./pages/ArtisanProfile";
import { Browse } from "./pages/Browse";
import { Profile } from "./pages/Profile";
import { Details } from "./pages/Details";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SearchProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:criteria" element={<Search />} />
              <Route path="/results" element={<SearchResults />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/browse/:category" element={<Browse />} />
              <Route path="/artisan/:id" element={<ArtisanProfile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:profileId" element={<Profile />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/details" element={<Details />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
