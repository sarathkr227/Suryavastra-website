import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import SiteVisitBuilder, {
  BUSINESS_BILLS,
  BUSINESS_TYPES,
} from "@/components/SiteVisitBuilder";
import { PageHeader, Section, Steps, Ticks } from "@/components/ui";

export const metadata: Metadata = {
  title: "Business & Farm Solar",
  description:
    "Commercial rooftop solar for shops, schools, hospitals, rice mills, cold storages and aqua farms in Anakapalli district and Kakinada. Free site visit and savings estimate.",
  alternates: { canonical: "/business-solar" },
};

const customers = [
  "Shops and showrooms",
  "Schools and colleges",
  "Hospitals and clinics",
  "Rice mills and factories",
  "Cold storages",
  "Aqua and fish farms",
  "Petrol bunks",
  "Apartments and hostels",
];

const benefits = [
  {
    title: "Lower monthly bills",
    body: "Solar covers your daytime load, and extra units are exported through a net meter.",
  },
  {
    title: "Tax benefits",
    body: "Businesses may be able to claim depreciation on solar. Check the details with your CA.",
  },
  {
    title: "Maintenance contract",
    body: "Yearly upkeep priced per kW, so the system keeps producing.",
  },
];

const steps = [
  { title: "Free site visit", body: "We study your roof and your last few power bills." },
  { title: "Design and quote", body: "We size the system and show the expected savings." },
  { title: "Installation", body: "Our team installs with proper earthing and protection." },
  { title: "Net meter", body: "We handle the DISCOM paperwork." },
  { title: "Maintenance", body: "Optional yearly contract, priced per kW." },
];

export default function BusinessSolarPage() {
  return (
    <>
      <PageHeader
        kicker="Business & Farm Solar"
        title="Cut your power bill with rooftop solar."
        lede="Businesses use most power in the daytime, exactly when solar produces. We design, install and maintain systems from 5 kW upward."
      />

      <Section>
        <h2>Who we work with</h2>
        <div className="chips">
          {customers.map((customer) => (
            <span key={customer}>{customer}</span>
          ))}
        </div>
        <div className="two mt">
          <Ticks items={benefits} />
          <div className="feature">
            <h3>For aqua and fish farms</h3>
            <p>
              Aerators and pumps run day and night, so power bills are high. Solar covers
              the daytime load and cuts that bill. We also supply solar dryers for fish and
              farm produce.
            </p>
          </div>
        </div>
      </Section>

      <Section band>
        <h2>How we work</h2>
        <Steps items={steps} />
      </Section>

      <Section>
        <div className="two">
          <EnquiryForm
            enquiryType="business_solar"
            heading="Book a free site visit"
            intro="Tell us about your place and we will call you to fix a visit."
            extraFields={[
              { name: "type", label: "Business type", options: BUSINESS_TYPES },
              { name: "bill", label: "Monthly power bill", options: BUSINESS_BILLS },
            ]}
            messageLabel="Roof type, area, or anything else"
            submitLabel="Request a site visit"
            whatsAppText="Hi SuryaVastra, I want a free site visit for business solar."
          />
          <SiteVisitBuilder />
        </div>
      </Section>
    </>
  );
}
