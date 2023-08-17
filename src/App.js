import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import SubmitForm from "./pages/TodoList";
import Navbar from "./Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="form" element={<SubmitForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
