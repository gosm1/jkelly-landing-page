import { HeroSection2Exp } from "@/components/ui/herosection2exp";
import WhyMe from "./components/WhyMe";
import AboutMe from "./components/AboutMe";
import Work from "./components/Work";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import { Footer } from "@/components/ui/footer-section";
import AosInit from "./components/AosInit";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <AosInit />
      <main className="grow">
        <HeroSection2Exp />
        <AboutMe />
        <WhyMe />
        <Work />
        <Reviews />
        <FAQ />
        <Contact />

      </main>
      <Footer />
    </div>
  );
}
