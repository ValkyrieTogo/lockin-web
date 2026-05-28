import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(15, 15, 18, 0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#fff",
            backdropFilter: "blur(20px)",
          },
        }}
      />
    </div>
  );
}

export default App;
