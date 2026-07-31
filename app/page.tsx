import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustedIndustries from "@/components/sections/TrustedIndustries";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
       <TrustedIndustries />
       <About />
    </>
  );
}