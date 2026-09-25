import { contact } from "@/content/site";
import { ApplyLinks } from "@/components/ui/ApplyLinks";
import { Split } from "@/components/ui/Split";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" data-sky="night" className="relative px-[var(--gutter)] pt-[clamp(4rem,10vw,8rem)] pb-[clamp(6rem,14vw,10rem)]">
      <div className="mx-auto max-w-3xl">
        <p className="label" data-reveal="fade">
          <span className="n">(07)</span>お問い合わせ
        </p>
        <Split as="h2" lines={["Contact"]} className="display mt-6 text-[clamp(3.8rem,17vw,9rem)] italic" />
        <p className="mt-6 text-sm leading-loose text-ink/80 md:text-base" data-reveal="fade">
          {contact.lead}
        </p>
        <div className="mt-8 border-y border-ink/15 py-5" data-reveal="fade">
          <p className="text-xs tracking-[0.1em] text-ink/75">ライバー応募は、フォームのほかに LINE・Instagram・TikTok の DM からも受け付けています。</p>
          <ApplyLinks className="mt-3" />
        </div>
        <div className="mt-12" data-reveal="fade">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
