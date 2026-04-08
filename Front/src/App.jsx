import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Services from "./pages/Services";
import Clients from "./pages/Clients";
import Testimonial from "./pages/Testimonial";
import WhatsApp from "./components/Whatsapp";
import ContactForm from "./pages/ContactForm";
import Preloader from "./components/Preloader";
import Portfolio from "./pages/Portfolio";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (or wait for API/data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <WhatsApp />
      <About />
      <Services />
      <Portfolio/>
      <Clients />
      <Testimonial />
      <ContactForm />
      <Footer/>
    </div>
  );
}

export default App;