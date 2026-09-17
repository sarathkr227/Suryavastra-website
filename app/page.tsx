import Link from "next/link";
import HeroArt from "@/components/HeroArt";
import {
  AmcIcon,
  ArrowIcon,
  BusinessIcon,
  CctvIcon,
  HomeSolarIcon,
  Ic,
  StoreIcon,
  VisitIcon,
} from "@/components/Icons";
import { CallButton, Section, Ticks, WaButton } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuryaVastra Solar Energy — Solar, service and security in Narsipatnam",
  description:
    "PM Suryaghar rooftop solar, business and farm solar, solar products store, AMC plans from ₹2,999, and CCTV in Narsipatnam, Andhra Pradesh.",
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
    href: "/store",
    icon: <StoreIcon />,
    title: "Solar Store",
    body: "Street lights, inverters, batteries, fans, pumps, water heaters and installer supplies.",
  },
  {
    href: "/amc-service",
    icon: <AmcIcon />,
    title: "AMC & Service",
    body: "Yearly maintenance plans from ₹2,999. Any brand, any installer.",
  },
  {
    href: "/cctv-electrical",
    icon: <CctvIcon />,
    title: "CCTV & Electrical",
    body: "Security cameras, wiring, earthing and power backup.",
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
            <p className="kicker gold">PM Suryaghar vendor · Narsipatnam</p>
            <h1>Solar, service and security for homes, farms and businesses.</h1>
            <p className="lede">
              We install rooftop solar, supply solar products, and keep your system working
              year after year.
            </p>
            <div className="btn-row">
              <WaButton
                text="Hi SuryaVastra, I want to know more about your services."
                label="WhatsApp us"
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
            <p className="kicker gold">Coming this Sankranti</p>
            <h2>SuryaVastra Solar Store opens January 2027</h2>
            <p>
              Solar lights, inverters, batteries, fans, pumps and more, with a live demo
              system you can see working.
            </p>
          </div>
          <Link className="btn btn-gold" href="/store">
            <Ic>
              <ArrowIcon />
            </Ic>
            <span>See what we&apos;ll stock</span>
          </Link>
        </div>
      </Section>
    </>
  );
}
