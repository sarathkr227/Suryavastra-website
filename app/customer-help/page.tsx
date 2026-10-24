import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, Ic } from "@/components/Icons";
import { CallButton, Faq, PageHeader, Section, Ticks, WaButton } from "@/components/ui";
import { wa } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer Help",
  description:
    "Help for existing SuryaVastra customers in Narsipatnam: inverter faults, low generation, reading your net meter, subsidy status, panel cleaning, and warranty or AMC questions.",
  alternates: { canonical: "/customer-help" },
};

/**
 * One WhatsApp link per problem, with the message already written and the fields
 * we always end up asking for. Someone who taps "Subsidy status" should not have
 * to be told twice that we need their consumer number.
 */
const topics = [
  {
    label: "Inverter not working",
    message:
      "Hi SuryaVastra, my inverter is not working.\nName:\nVillage/Town:\nConsumer number:\nWhat the display shows:",
  },
  {
    label: "Low power generation",
    message:
      "Hi SuryaVastra, my system is generating less than usual.\nName:\nVillage/Town:\nConsumer number:\nToday's reading on the inverter:",
  },
  {
    label: "Reading my net meter",
    message:
      "Hi SuryaVastra, please help me read my net meter.\nName:\nVillage/Town:\nConsumer number:\nImport reading:\nExport reading:",
  },
  {
    label: "Subsidy status",
    message:
      "Hi SuryaVastra, I want to check my subsidy status.\nName:\nVillage/Town:\nConsumer number:",
  },
  {
    label: "Panel cleaning",
    message:
      "Hi SuryaVastra, I want to book a panel cleaning.\nName:\nVillage/Town:\nSystem size:",
  },
  {
    label: "Warranty or AMC question",
    message:
      "Hi SuryaVastra, I have a question about my warranty or AMC.\nName:\nVillage/Town:\nInstalled in (month and year):",
  },
];

/** Asked on nearly every support call, so it is worth saying once, up front. */
const ready = [
  {
    title: "Your consumer number",
    body: "Printed on your electricity bill. It is how we find your project.",
  },
  {
    title: "Village or town",
    body: "Where the system is installed, so we can route the right technician.",
  },
  {
    title: "What the inverter shows",
    body: "Any error code or warning light on the display.",
  },
  {
    title: "A photo, if you can take one",
    body: "Of the inverter screen or the meter. It often saves a visit.",
  },
];

const answers = [
  {
    q: "Which number on my net meter matters?",
    a: "The meter counts two things separately: the units you drew from the grid, and the units your panels sent back. Your DISCOM bills the difference between them, so a month where you export more than you import should not produce a large bill. If both numbers look wrong, send us what each one reads and we will check it.",
  },
  {
    q: "When does the subsidy reach me, and who pays it?",
    a: "PM Suryaghar credits the subsidy directly into the bank account given in your application, and only after installation, net metering and the DISCOM inspection are all complete. The money never passes through SuryaVastra — we file the claim and follow it up. If your bank details have changed since you applied, tell us as soon as you can.",
  },
  {
    q: "You did not install my system. Will you still service it?",
    a: "Yes. We service systems from any brand and any installer, including cases where the original installer has closed or stopped responding.",
  },
  {
    q: "How soon will someone come?",
    a: "We answer Monday to Saturday, 9 AM to 7 PM. For a breakdown, calling is faster than messaging. Visit timing depends on where you are and whether you hold an AMC plan.",
  },
];

export default function CustomerHelpPage() {
  return (
    <>
      <PageHeader
        kicker="Customer Help"
        title="Already have a system? Start here."
        lede="Pick what is wrong and WhatsApp opens with the message written for you. We answer Monday to Saturday, 9 AM to 7 PM."
      />

      <Section>
        <h2>What do you need help with?</h2>
        <p className="lede-d">
          Each one opens WhatsApp with the details we need already listed. Fill in
          your answers and send.
        </p>
        <div className="issues">
          {topics.map((topic) => (
            <a
              className="issue"
              key={topic.label}
              href={wa(topic.message)}
              target="_blank"
              rel="noopener"
            >
              <span>{topic.label}</span>
              <Ic>
                <ArrowIcon />
              </Ic>
            </a>
          ))}
        </div>
      </Section>

      <section className="band">
        <div className="wrap why">
          <div>
            <h2>Have these ready</h2>
            <p className="lede-d">
              Sending these with your first message usually saves a day of back and
              forth.
            </p>
          </div>
          <Ticks items={ready} />
        </div>
      </section>

      <Section>
        <h2>Common questions</h2>
        <Faq items={answers} />
      </Section>

      <Section band>
        <h2>Prefer to talk?</h2>
        <p className="lede-d">
          For anything urgent, calling is faster than messaging.
        </p>
        <div className="btn-row">
          <WaButton
            text={"Hi SuryaVastra, I need help with my solar system.\nName:\nVillage/Town:"}
            label="WhatsApp us"
          />
          <CallButton />
        </div>
        <p className="formnote">
          Paying per visit? <Link href="/amc-service">Our AMC plans</Link> cover
          cleaning and health checks for the year, on any brand and any installer.
        </p>
      </Section>
    </>
  );
}
