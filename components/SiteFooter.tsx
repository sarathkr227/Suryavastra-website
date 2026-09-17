import Link from "next/link";
import { nav, site, tel, wa } from "@/lib/site";
import { Logo, WhatsAppIcon } from "./Icons";

export default function SiteFooter() {
  return (
    <>
      <footer>
        <div className="wrap fgrid">
          <div>
            <div className="fbrand">
              <Logo />
              <span className="bn">
                <b>SURYAVASTRA</b>
                <span>SOLAR ENERGY</span>
              </span>
            </div>
            <p className="tag">{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="fmeta">
            <p>D No 7-2-101/1, Kapu Veedhi, Narsipatnam 531116</p>
            <p>
              Mon–Sat 9 AM–7 PM · <a href={tel}>{site.phoneDisplay}</a>
            </p>
            <p>GSTIN {site.gstin}</p>
            <p className="fine">
              PM Suryaghar Muft Bijli Yojana vendor. Subsidy amounts as per the central
              scheme; the final amount is decided by the government.
            </p>
          </div>
        </div>
      </footer>
      <a
        className="fab"
        href={wa("Hi SuryaVastra, I have a question.")}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp SuryaVastra"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
