import { pages } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Recruit } from "@/components/sections/Recruit";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata = pageMetadata("recruit");

export default function RecruitPage() {
  return (
    <>
      <PageHeader {...pages.recruit} />
      <Recruit no="01" />
      <Faq no="02" />
      <CtaBand />
    </>
  );
}
