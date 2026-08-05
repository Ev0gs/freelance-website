import Navbar from "./components/Navbar.tsx";
import HeroSection from "./sections/HeroSection.tsx";
import AboutSection from "./sections/AboutSection.tsx";
import Background from "./components/Background.tsx";
import SkillsSection from "./sections/SkillsSection.tsx";
import ContactSection from "./sections/ContactSection.tsx";
import ProjectsSection from "./sections/ProjectsSection.tsx";
import Footer from "./components/Footer.tsx";
import ServicesSection from "@/sections/ServicesSection.tsx";

function App() {
  return (
    <>
        <Background/>
        <Navbar/>
        <HeroSection/>
        <AboutSection/>
        <SkillsSection/>
        <ServicesSection/>
        <ProjectsSection/>
        <ContactSection/>
        <Footer/>
    </>
  )
}

export default App
