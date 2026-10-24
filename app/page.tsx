import Link from "next/link";
import HeroArt from "@/components/HeroArt";
import {
  AmcIcon,
  ArrowIcon,
  BusinessIcon,
  HelpIcon,
  HomeSolarIcon,
  Ic,
  VisitIcon,
} from "@/components/Icons";
import { CallButton, Section, Ticks, WaButton } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuryaVastra Solar Energy — Rooftop solar in Narsipatnam",
  description:
    "PM Suryaghar rooftop solar with subsidy up to ₹78,000. Registered vendor in Narsipatnam, Anakapalli district, Kakinada and Kurnool. Free site survey, bank loan help, and AMC plans from ₹2,999.",
  alternates: { canonical: "/" },
};

const services = [
  {
    href: "/home-solar",
    icon: <HomeSolarIcon />,
    title: "Home Solar",
    body: "PM Suryaghar rooftop solar with up to ₹78,000 subsidy. We handle the paperwork and bank loan.",
  },
  {
    href: "/business-solar",
    icon: <BusinessIcon />,
    title: "Business & Farm Solar",
    body: "Rooftop solar for shops, schools, mills, cold storages and aqua farms.",
  },
  {
    href: "/amc-service",
    icon: <AmcIcon />,
    title: "AMC & Service",
    body: "Yearly maintenance plans from ₹2,999. Any brand, any installer.",
  },
  {
    href: "/customer-help",
    icon: <HelpIcon />,
    title: "Customer Help",
    body: "Already have a system? Inverter faults, net meter readings and subsidy status.",
  },
  {
    href: "/contact",
    icon: <VisitIcon />,
    title: "Visit us",
    body: "Narsipatnam · Open Mon–Sat, 9 AM to 7 PM.",
  },
];

const whyUs = [
  {
    title: "Registered PM Suryaghar vendor",
    body: "We register you, follow up with DISCOM and track your subsidy.",
  },
  {
    title: "Bank loan help",
    body: "We prepare the quotation and papers your bank needs.",
  },
  {
    title: "Our own technicians",
    body: "Installation and service by trained local teams.",
  },
  {
    title: "We serve",
    body: "Narsipatnam and Anakapalli district, Kakinada and Kurnool.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker gold">Registered PM Suryaghar vendor · Narsipatnam</p>
            <h1>Rooftop solar for your home, with subsidy up to ₹78,000.</h1>
            <p className="lede">
              We register you under PM Suryaghar, handle the DISCOM paperwork and the
              bank loan, install the system, and service it for years afterwards.
            </p>
            <div className="btn-row">
              <WaButton
                text={
                  "Hi SuryaVastra, I want a free site survey for home solar.\nName:\nVillage/Town:"
                }
                label="Book a free survey"
              />
              <CallButton light />
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <Section>
        <h2>What we do</h2>
        <div className="cards">
          {services.map((service) => (
            <Link className="card" key={service.href} href={service.href}>
              <Ic big>{service.icon}</Ic>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <span className="more">
                Learn more{" "}
                <Ic>
                  <ArrowIcon />
                </Ic>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <section className="band">
        <div className="wrap why">
          <div>
            <h2>Why SuryaVastra</h2>
            <p className="lede-d">
              One local team for the whole job, from the first survey to years of service.
            </p>
          </div>
          <Ticks items={whyUs} />
        </div>
      </section>

      <Section>
        <div className="promo">
          <div>
            <p className="kicker gold">No charge, no obligation</p>
            <h2>Find out what your roof can do</h2>
            <p>
              Tell us your monthly electricity bill and we will measure your roof,
              estimate your subsidy and give you a written quotation.
            </p>
          </div>
          <Link className="btn btn-gold" href="/home-solar">
            <Ic>
              <ArrowIcon />
            </Ic>
            <span>Estimate my subsidy</span>
          </Link>
        </div>
      </Section>
    </>
  );
}
