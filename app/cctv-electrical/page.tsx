import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { CheckIcon, Ic } from "@/components/Icons";
import { PageHeader, Section, WaButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "CCTV & Electrical",
  description:
    "CCTV camera installation, house and shop wiring, earthing, lightning protection and inverter backup in Narsipatnam and Anakapalli district.",
  alternates: { canonical: "/cctv-electrical" },
};

const cctv = [
  "Cameras for homes, shops, schools and farms",
  "View live on your mobile",
  "Night vision and recording backup",
  "Installation, setup and yearly service",
];

const electrical = [
  "House and shop wiring",
  "Earthing and lightning protection",
  "Inverter and UPS backup installation",
  "Electrical safety check",
];

export default function CctvElectricalPage() {
  return (
    <>
      <PageHeader
        kicker="CCTV & Electrical"
        title="Security and safe power for homes, shops and schools."
        lede="The same trusted local team that installs your solar can protect your property and wiring."
      />

      <Section>
        <div className="two">
          <div className="feature">
            <h3>CCTV cameras</h3>
            <ul className="plain">
              {cctv.map((item) => (
                <li key={item}>
                  <Ic>
                    <CheckIcon />
                  </Ic>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <WaButton
              text="Hi SuryaVastra, I want a CCTV quote. Place type: __. Number of cameras: __."
              label="Get a CCTV quote"
            />
          </div>
          <div className="feature">
            <h3>Electrical work</h3>
            <ul className="plain">
              {electrical.map((item) => (
                <li key={item}>
                  <Ic>
                    <CheckIcon />
                  </Ic>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <WaButton
              text="Hi SuryaVastra, I need electrical work: __."
              label="Book an electrician"
            />
          </div>
        </div>
      </Section>

      <Section band>
        <EnquiryForm
          enquiryType="cctv_electrical"
          heading="Ask for a quote"
          intro="Leave your details and we will call you back with a price."
          extraFields={[
            {
              name: "work",
              label: "What do you need?",
              options: [
                "CCTV cameras",
                "House or shop wiring",
                "Earthing or lightning protection",
                "Inverter or UPS backup",
                "Electrical safety check",
                "Something else",
              ],
            },
            {
              name: "place",
              label: "Place type",
              options: ["Home", "Shop", "School or college", "Farm", "Factory", "Other"],
            },
          ]}
          messageLabel="Number of cameras, rooms, or other details"
          submitLabel="Ask for a quote"
          whatsAppText="Hi SuryaVastra, I want a CCTV quote. Place type: __. Number of cameras: __."
        />
      </Section>
    </>
  );
}
