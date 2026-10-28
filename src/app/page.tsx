import { marquees } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { TiktokLive } from "@/components/sections/TiktokLive";
import { About } from "@/components/sections/About";
import { Service } from "@/components/sections/Service";
import { Livers } from "@/components/sections/Livers";
import { Recruit } from "@/components/sections/Recruit";
import { Marquee } from "@/components/ui/Marquee";

/** トップ：各ページのさわりを並べ、くわしい内容は下層ページへ案内する */
export default function Home() {
  return (
    <>
      <Hero />
      <TiktokLive no="01" />
      <About no="02" compact />
      <Marquee items={marquees.first} />
      <Service no="03" compact />
      <Livers no="04" limit={5} />
      <Marquee items={marquees.second} reverse />
      <Recruit no="05" compact />
    </>
  );
}
