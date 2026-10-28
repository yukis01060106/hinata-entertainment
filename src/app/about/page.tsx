import { pages } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { About } from "@/components/sections/About";
import { Manager } from "@/components/sections/Manager";
import { Company } from "@/components/sections/Company";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <PageHeader {...pages.about} />
      <About no="01" />
      <Manager no="02" />
      <Company no="03" />
      <CtaBand />
    </>
  );
}
