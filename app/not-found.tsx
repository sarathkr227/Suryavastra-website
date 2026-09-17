import Link from "next/link";
import { PageHeader, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHeader
        kicker="Page not found"
        title="That page has moved or never existed."
        lede="Use the menu above, or start again from the home page."
      />
      <Section>
        <Link className="btn btn-gold" href="/">
          <span>Back to home</span>
        </Link>
      </Section>
    </>
  );
}
