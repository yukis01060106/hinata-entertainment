import { pages } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Livers } from "@/components/sections/Livers";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata("livers");

export default function LiversPage() {
  return (
    <>
      <PageHeader {...pages.livers} />
      <Livers hideHeading />
      <CtaBand />
    </>
  );
}
