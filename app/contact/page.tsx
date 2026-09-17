import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Ic, PinIcon } from "@/components/Icons";
import { CallButton, PageHeader, Section, WaButton } from "@/components/ui";
import { site, tel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit SuryaVastra Solar Energy at Kapu Veedhi, Narsipatnam, Anakapalli District. Open Monday to Saturday, 9 AM to 7 PM. Call or WhatsApp 76800 43727.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Visit, call or WhatsApp us."
        lede="We reply fastest on WhatsApp during working hours."
      />

      <Section>
        <div className="two">
          <div>
            <h2>{site.name}</h2>
            <p className="addr">{site.addressLine}</p>
            <dl className="meta">
              <dt>Hours</dt>
              <dd>{site.hours}</dd>
              <dt>Phone</dt>
              <dd>
                <a href={tel}>{site.phoneDisplay}</a>
              </dd>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </dd>
              <dt>GSTIN</dt>
              <dd>{site.gstin}</dd>
            </dl>
            <div className="btn-row mt">
              <a
                className="btn btn-gold"
                href={site.mapsUrl}
                target="_blank"
                rel="noopener"
              >
                <Ic>
                  <PinIcon />
                </Ic>
                <span>Get directions</span>
              </a>
              <WaButton
                text="Hi SuryaVastra, I have a question."
                label="WhatsApp us"
              />
              <CallButton />
            </div>
          </div>

          <div className="areas">
            <h3>Areas we serve</h3>
            <ul>
              {site.areas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <p className="note">
              New store opening on Narsipatnam main road this Sankranti, January 2027.
            </p>
          </div>
        </div>
      </Section>

      <Section band>
        <EnquiryForm
          enquiryType="general"
          heading="Send us a message"
          intro="Leave your number and we will call you back within one working day."
          extraFields={[
            {
              name: "about",
              label: "What is it about?",
              options: [
                "Home solar / PM Suryaghar",
                "Business or farm solar",
                "Solar products",
                "AMC or service",
                "CCTV or electrical",
                "Something else",
              ],
            },
          ]}
          messageLabel="Your message"
          submitLabel="Send message"
          whatsAppText="Hi SuryaVastra, I have a question."
        />
      </Section>
    </>
  );
}
