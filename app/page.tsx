import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustedIndustries from "@/components/sections/TrustedIndustries";
import About from "@/components/sections/About";
import ManufacturingProcess from "@/components/sections/ManufacturingProcess";
import Products from "@/components/sections/Products";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
       <TrustedIndustries />
       <About />
       <ManufacturingProcess />
       <Products />
       <Gallery />
       <Testimonials />
       <FAQ />
       <Contact />
       <Footer />
    </>
  );
}