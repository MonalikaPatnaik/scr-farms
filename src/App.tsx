import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import BilonaMethod from "./pages/BilonaMethod";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin imports
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from "./components/admin/LoginPage";
import Dashboard from "./components/admin/Dashboard";
import ProductForm from "./components/admin/ProductForm";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import SignupPage from "./components/admin/SignupPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin Routes - No Navbar/Footer for admin pages */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/signup" element={<SignupPage />} />
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product/:id" element={<ProductForm />} />
            </Route>
            
            {/* Redirect from /admin to dashboard */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Public Routes with Navbar and Footer */}
            <Route path="/*" element={
              <>
                <Navbar />
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/bilona-method" element={<BilonaMethod />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
                <Footer />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;