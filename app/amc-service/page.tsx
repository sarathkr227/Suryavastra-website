import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import { ArrowIcon, CheckIcon, Ic } from "@/components/Icons";
import { Faq, PageHeader, Section } from "@/components/ui";
import { wa } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solar AMC & Service plans",
  description:
    "Yearly solar maintenance plans from ₹2,999 for home systems up to 3 kW, any brand and any installer. Panel cleaning, health checks and breakdown response in Narsipatnam and Anakapalli district.",
  alternates: { canonical: "/amc-service" },
};

const plans = [
  {
    name: "Basic Clean",
    price: "₹2,999",
    popular: false,
    features: [
      "4 panel cleanings a year",
      "Breakdown response within 3 days",
      "Repair labour charged",
    ],
  },
  {
    name: "Standard Care",
    price: "₹4,999",
    popular: true,
    features: [
      "4 panel cleanings a year",
      "2 health checks with generation report",
      "Response within 48 hours",
      "5% discount on replacement parts",
    ],
  },
  {
    name: "Complete Care",
    price: "₹7,999",
    popular: false,
    features: [
      "6 panel cleanings a year",
      "2 health checks with generation report",
      "Response within 24 hours",
      "Free repair labour",
      "10% discount on replacement parts",
    ],
  },
];

const issues = [
  "Panel cleaning or service visit",
  "Inverter not working",
  "Low power generation",
  "Subsidy status",
  "Net meter or bill question",
  "Something else",
];

const faqs = [
  {
    q: "My installer has closed or doesn't respond. Can you help?",
    a: "Yes. We service systems from any brand and any installer.",
  },
  {
    q: "How often should panels be cleaned?",
    a: "Dust reduces output. Most homes in our area benefit from cleaning every two to three months, more often near roads or fields.",
  },
  {
    q: "What happens in a health check?",
    a: "We check the inverter, earthing, cables and connections, and share a generation report.",
  },
];

export default function AmcServicePage() {
  return (
    <>
      <PageHeader
        kicker="AMC & Service"
        title="Keep your solar system working at full power."
        lede="Yearly maintenance plans for home systems up to 3 kW. We service any brand, whoever installed it."
      />

      <Section>
        <div className="plans">
          {plans.map((plan) => (
            <div className={plan.popular ? "plan pop" : "plan"} key={plan.name}>
              {plan.popular && <span className="badge">Most popular</span>}
              <h3>{plan.name}</h3>
              <div className="price">
                {plan.price}
                <small>/year</small>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Ic>
                      <CheckIcon />
                    </Ic>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                className={plan.popular ? "btn btn-gold" : "btn btn-wa"}
                href={`/amc-service?plan=${encodeURIComponent(plan.name)}#join`}

              >
                <Ic>
                  <ArrowIcon />
                </Ic>
                <span>Choose {plan.name}</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="payopts">
          <div>
            <b>2-year plan</b>
            <span>Save 10%: ₹5,398 / ₹8,998 / ₹14,398</span>
          </div>
          <div>
            <b>Half-yearly</b>
            <span>₹1,600 × 2 / ₹2,600 × 2 / ₹4,100 × 2</span>
          </div>
          <div className="offer">
            <b>₹500 off</b>
            <span>when you join at our village camp</span>
          </div>
        </div>

        <p className="note">
          Above 3 kW: add ₹1,000 a year for each extra kW. Parts not under warranty are
          charged separately. GST as applicable. Businesses: ask for a maintenance contract
          priced per kW.
        </p>
      </Section>

      <Section band>
        <h2>Book a service</h2>
        <p className="lede-d">
          Pick your issue. WhatsApp opens with the message ready to send.
        </p>
        <div className="issues">
          {issues.map((issue) => (
            <a
              className="issue"
              key={issue}
              href={wa(
                // Same fields as /customer-help asks for, so a customer is not
                // questioned differently depending on which page they tapped.
                `Hi SuryaVastra, I need help with: ${issue}.\nName:\nVillage/Town:\nConsumer number:`
              )}
              target="_blank"
              rel="noopener"
            >
              <span>{issue}</span>
              <Ic>
                <ArrowIcon />
              </Ic>
            </a>
          ))}
        </div>
      </Section>

      <section id="join">
        <div className="wrap">
          <EnquiryForm
            enquiryType="amc"
            heading="Join a plan or book a visit"
            intro="Leave your details and we will call to confirm the plan and the first visit date."
            extraFields={[
              {
                name: "plan",
                label: "Plan you want",
                options: [
                  "Standard Care — ₹4,999/year",
                  "Basic Clean — ₹2,999/year",
                  "Complete Care — ₹7,999/year",
                  "Not sure — please advise",
                  "One-time service visit only",
                ],
              },
              {
                name: "size",
                label: "Your system size",
                options: ["1 kW", "2 kW", "3 kW", "Above 3 kW", "Not sure"],
              },
              {
                name: "issue",
                label: "Anything wrong right now?",
                options: ["Nothing — routine maintenance", ...issues],
              },
            ]}
            messageLabel="Brand, installer or problem details"
            submitLabel="Join a plan"
            whatsAppText="Hi SuryaVastra, I want a solar AMC plan. My system size is __ kW."
            preselect={{ param: "plan", field: "plan" }}
          />
        </div>
      </section>

      <Section>
        <h2>Common questions</h2>
        <Faq items={faqs} />
      </Section>
    </>
  );
}
