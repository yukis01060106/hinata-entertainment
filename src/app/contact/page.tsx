import { pages } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { PageHeader } from "@/components/ui/PageHeader";
import { Contact } from "@/components/sections/Contact";

export const metadata = pageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <PageHeader {...pages.contact} />
      <Contact hideHeading />
    </>
  );
}
