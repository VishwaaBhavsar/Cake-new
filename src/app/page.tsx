import Grain from "@/components/layout/Grain";
import Intro from "@/components/layout/Intro";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CakeExperience from "@/components/sections/CakeExperience";
import Collection from "@/components/sections/Collection";
import Craft from "@/components/sections/Craft";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Story from "@/components/sections/Story";

export default function Home() {
  return (
    <SmoothScroll>
      <Intro />
      <Grain />
      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Story />
        <CakeExperience />
        <Collection />
        <Craft />
      </main>

      <FinalCta />
    </SmoothScroll>
  );
}
