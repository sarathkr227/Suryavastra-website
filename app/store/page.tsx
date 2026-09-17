import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Ic, WhatsAppIcon } from "@/components/Icons";
import { CallButton, PageHeader, Section, WaButton } from "@/components/ui";
import { wa } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solar Store",
  description:
    "Solar street lights, inverters, batteries, fans, pumps, water heaters, fencing, dryers and installer supplies in Narsipatnam. BIS-certified products from authorised distributors.",
  alternates: { canonical: "/store" },
};

const categories = [
  {
    title: "Solar street lights and home lights",
    body: "All-in-one street lights, flood lights, lanterns and home lighting kits.",
  },
  {
    title: "Inverters and batteries",
    body: "Home inverters, tubular and lithium batteries, solar inverters.",
  },
  { title: "Solar and BLDC fans", body: "Low-power fans for homes with weak supply." },
  {
    title: "Solar water pumps",
    body: "Pumps for farms and homes, including PM-KUSUM guidance.",
  },
  {
    title: "Off-grid home kits",
    body: "Panel, battery, lights, fan and charging in one kit.",
  },
  { title: "Solar water heaters", body: "For homes, hostels, hotels and hospitals." },
  {
    title: "Solar fencing and insect traps",
    body: "Protect crops from animals and pests.",
  },
  {
    title: "Fish and crop dryers",
    body: "Faster, cleaner drying for fish and farm produce.",
  },
  { title: "Solar phone chargers", body: "Handy for farm work and travel." },
  {
    title: "Installer supplies",
    body: "DC cable, MC4 connectors, ACDB/DCDB, earthing kits and structures. Bulk rates for vendors.",
  },
];

export default function StorePage() {
  return (
    <>
      <PageHeader
        kicker="Solar Store"
        title="Everything solar, under one roof."
        lede="Our Narsipatnam store opens this Sankranti, January 2027. Until then, call or WhatsApp to order."
      />

      <Section>
        <div className="cards cats">
          {categories.map((category) => (
            <div className="card static" key={category.title}>
              <h3>{category.title}</h3>
              <p>{category.body}</p>
              <a
                className="link"
                href={wa(
                  `Hi SuryaVastra, please share the price for: ${category.title}.`
                )}
                target="_blank"
                rel="noopener"
              >
                <Ic>
                  <WhatsAppIcon />
                </Ic>
                Ask price
              </a>
            </div>
          ))}
        </div>
        <p className="note">
          We stock BIS-certified products from authorised distributors. Prices change
          often, so please ask for today&apos;s rate.
        </p>
      </Section>

      <Section band>
        <div className="two">
          <div>
            <h2>For solar vendors and electricians</h2>
            <p className="lede-d">
              Buy cables, connectors, distribution boxes, earthing kits and structures at
              bulk rates from a local stock.
            </p>
            <div className="btn-row mt">
              <WaButton
                text="Hi SuryaVastra, I am a vendor/electrician. Please share bulk rates for installer supplies."
                label="Ask for bulk rates"
              />
              <CallButton />
            </div>
          </div>
          <EnquiryForm
            enquiryType="store"
            heading="Ask for a price"
            intro="Tell us what you need and we will send today's rate."
            extraFields={[
              {
                name: "category",
                label: "What are you looking for?",
                options: [...categories.map((c) => c.title), "Something else"],
              },
              {
                name: "buyer",
                label: "You are",
                options: ["A home customer", "A vendor or electrician", "A business"],
              },
            ]}
            messageLabel="Quantity, brand or model"
            submitLabel="Ask for a price"
            whatsAppText="Hi SuryaVastra, please share the price for: "
          />
        </div>
      </Section>
    </>
  );
}
