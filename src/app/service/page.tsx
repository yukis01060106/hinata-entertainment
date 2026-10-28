import { pages } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { TiktokLive } from "@/components/sections/TiktokLive";
import { Service } from "@/components/sections/Service";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata("service");

export default function ServicePage() {
  return (
    <>
      <PageHeader {...pages.service} />
      <TiktokLive no="01" />
      <Service hideHeading />
      <CtaBand />
    </>
  );
}
