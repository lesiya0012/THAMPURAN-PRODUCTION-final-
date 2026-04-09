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
import Quoteform from "./components/Quoteform"; // import the modal
import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [showQuote, setShowQuote] = useState(false); // modal state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      {/* Pass setShowQuote to Navbar */}
      <Navbar setShowQuote={setShowQuote} />
      <Hero setShowQuote={setShowQuote} />
 
      <WhatsApp />
      <About />
      <Services />
      <Portfolio />
      <Clients />
      <Testimonial />
      <ContactForm />
      <Footer />

      {/* Render Quoteform only when showQuote is true */}
      {showQuote && <Quoteform setShowQuote={setShowQuote} />}
    </div>
  );
}

export default App;