import dynamic from "next/dynamic";
import { HeroSection2Exp } from "@/components/ui/herosection2exp";
import AosInit from "./components/AosInit";

// Lazy load below-fold components
const AboutMe = dynamic(() => import("./components/AboutMe"), {
  loading: () => <div className="min-h-[400px]" />,
});
const WhyMe = dynamic(() => import("./components/WhyMe"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Work = dynamic(() => import("./components/Work"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Reviews = dynamic(() => import("./components/Reviews"), {
  loading: () => <div className="min-h-[400px]" />,
});
const FAQ = dynamic(() => import("./components/FAQ"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Footer = dynamic(
  () =>
    import("@/components/ui/footer-section").then((mod) => ({
      default: mod.Footer,
    })),
  { loading: () => <div className="min-h-[200px]" /> }
);

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
