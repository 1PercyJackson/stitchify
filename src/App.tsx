import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import DesignStudio from "./pages/DesignStudio";
import ArtistsCorner from "./pages/ArtistsCorner";
import ProductDetail from "./pages/ProductDetail";
import TailorNova from "./pages/TailorNova";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/:category/:subcategory" element={<SubCategoryPage />} />
          <Route path="/design" element={<DesignStudio />} />
          <Route path="/artists-corner" element={<ArtistsCorner />} />
          <Route path="/artists-corner/custom-design" element={<TailorNova />} />
          <Route path="/artists-corner/:category" element={<ArtistsCorner />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* Keep designer route for backward compatibility */}
          <Route path="/designer" element={<TailorNova />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
