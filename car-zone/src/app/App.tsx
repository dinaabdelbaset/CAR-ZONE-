import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { BrowseCarsPage } from "./pages/BrowseCarsPage";
import { CompareModelsPage } from "./pages/CompareModelsPage";
import { CarDetailsPage } from "./pages/CarDetailsPage";
import { ContactPage } from "./pages/ContactPage";
import { UsedCarsPage } from "./pages/UsedCarsPage";
import { SparePartsPage } from "./pages/SparePartsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Public Site Routes */}
            <Route path="/" element={
              <>
                <Navigation />
                <HomePage />
              </>
            } />
            <Route path="/browse" element={<><Navigation /><BrowseCarsPage /></>} />
            <Route path="/used-cars" element={<><Navigation /><UsedCarsPage /></>} />
            <Route path="/spare-parts" element={<><Navigation /><SparePartsPage /></>} />
            <Route path="/compare" element={<><Navigation /><CompareModelsPage /></>} />
            <Route path="/car/:id" element={<><Navigation /><CarDetailsPage /></>} />
            <Route path="/contact" element={<><Navigation /><ContactPage /></>} />
            <Route path="/profile" element={<><Navigation /><ProfilePage /></>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}
