import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./context/LangContext";
import Topbar from "./components/Topbar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import About from "./components/About";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import AdminApp from "./admin/AdminApp";

function PublicSite() {
  return (
    <LangProvider>
      <Topbar />
      <Header />
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <Reviews />
      <Faq />
      <Contact />
      <Footer />
      <FloatingButtons />
    </LangProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  );
}