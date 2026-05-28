import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import CheckoutPage from "@/pages/CheckoutPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="light"
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(255, 255, 255, 0.98)",
            border: "1px solid rgba(0,0,0,0.08)",
            color: "#1d1d1f",
            backdropFilter: "blur(20px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          },
        }}
      />
    </div>
  );
}

export default App;
