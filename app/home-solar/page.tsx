import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { CheckIcon, Ic } from "@/components/Icons";
import SubsidyCalculator from "@/components/SubsidyCalculator";
import { CallButton, Faq, PageHeader, Section, Steps, WaButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Home Solar & PM Suryaghar subsidy",
  description:
    "Rooftop solar for homes in Narsipatnam and Anakapalli district under PM Suryaghar. Up to ₹78,000 central subsidy. Free site survey, portal registration, DISCOM and loan paperwork handled.",
  alternates: { canonical: "/home-solar" },
};

const steps = [
  { title: "Free site survey", body: "We check your roof, shade and sanctioned load." },
  { title: "Portal registration", body: "We register you on the PM Suryaghar portal." },
  { title: "DISCOM approval", body: "APEPDCL or APSPDCL approves feasibility." },
  { title: "Bank loan, if needed", body: "We help with the loan papers." },
  { title: "Installation", body: "Our team fits panels, inverter and wiring." },
  { title: "Net meter and inspection", body: "DISCOM fits the net meter and inspects." },
  { title: "Subsidy in your account", body: "Credited to your bank after commissioning." },
];

const documents = [
  "Aadhaar card",
  "Latest electricity bill",
  "Bank passbook (Aadhaar-linked)",
  "House tax receipt or ownership proof",
  "Passport-size photo",
];

const faqs = [
  {
    q: "Who can apply?",
    a: "Any household with its own electricity connection and a suitable roof. The system cannot be bigger than your sanctioned load.",
  },
  {
    q: "When will I get the subsidy?",
    a: "After installation, net metering and DISCOM inspection are done and the system is commissioned on the portal. It is paid into your Aadhaar-linked bank account.",
  },
  {
    q: "Do I pay the full amount first?",
    a: "The subsidy comes back after installation. A bank loan can cover most of the cost, and we help with the papers.",
  },
  {
    q: "What size do I need?",
    a: "Most homes use 1 to 3 kW. We suggest the right size after seeing your bill and roof in the free survey.",
  },
];

export default function HomeSolarPage() {
  return (
    <>
      <PageHeader
        kicker="Home Solar · PM Suryaghar"
        title="Solar on your roof, up to ₹78,000 back from the government."
        lede="The central government pays a subsidy to homes that install rooftop solar. The panels power your home, and extra units go to the grid through a net meter."
      />

      <section>
        <div className="wrap two">
          <div>
            <h2>Subsidy by system size</h2>
            <table className="slabs">
              <thead>
                <tr>
                  <th>System size</th>
                  <th>Central subsidy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 kW</td>
                  <td>₹30,000</td>
                </tr>
                <tr>
                  <td>2 kW</td>
                  <td>₹60,000</td>
                </tr>
                <tr>
                  <td>3 kW and above</td>
                  <td>₹78,000</td>
                </tr>
              </tbody>
            </table>
            <p className="small-d">
              Paid into your Aadhaar-linked bank account after installation and inspection.
            </p>
          </div>
          <SubsidyCalculator />
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>From enquiry to subsidy</h2>
          <Steps items={steps} />
          <div className="docs">
            <h3>Keep these documents ready</h3>
            <ul>
              {documents.map((document) => (
                <li key={document}>
                  <Ic>
                    <CheckIcon />
                  </Ic>
                  {document}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section>
        <EnquiryForm
          enquiryType="home_solar"
          heading="Book your free site survey"
          intro="Leave your number and we will call you back to fix a visit. No charge, no obligation."
          extraFields={[
            {
              name: "size",
              label: "System size you are thinking of",
              options: ["Not sure yet", "1 kW", "2 kW", "3 kW", "Above 3 kW"],
            },
            {
              name: "bill",
              label: "Your monthly electricity bill",
              options: [
                "Below ₹1,000",
                "₹1,000 – ₹2,500",
                "₹2,500 – ₹5,000",
                "Above ₹5,000",
              ],
            },
          ]}
          whatsAppText="Hi SuryaVastra, I want to know about rooftop solar under PM Suryaghar."
        />
      </Section>

      <Section band>
        <h2>Common questions</h2>
        <Faq items={faqs} />
        <div className="btn-row mt">
          <WaButton
            text="Hi SuryaVastra, I want to know about rooftop solar under PM Suryaghar."
            label="Ask on WhatsApp"
          />
          <CallButton />
        </div>
      </Section>
    </>
  );
}
