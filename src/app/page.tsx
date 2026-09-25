import { marquees } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Service } from "@/components/sections/Service";
import { Livers } from "@/components/sections/Livers";
import { Recruit } from "@/components/sections/Recruit";
import { Faq } from "@/components/sections/Faq";
import { Company } from "@/components/sections/Company";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Marquee items={marquees.first} />
      <Service />
      <Livers />
      <Marquee items={marquees.second} reverse />
      <Recruit />
      <Faq />
      <Company />
      <Contact />
    </>
  );
}
