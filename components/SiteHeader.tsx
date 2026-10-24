"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site, tel } from "@/lib/site";
import { Ic, Logo, PhoneIcon } from "./Icons";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="announce">
        <Link href="/home-solar">
          PM Suryaghar subsidy up to ₹78,000 · free site survey in Narsipatnam →
        </Link>
      </div>
      <header className="top">
        <div className="wrap bar">
          <Link className="brand" href="/" aria-label={`${site.name} home`}>
            <Logo />
            <span className="bn">
              <b>SURYAVASTRA</b>
              <span>SOLAR ENERGY</span>
            </span>
          </Link>
          <nav className={open ? "nav open" : "nav"} id="nav" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a className="hcall" href={tel}>
            <Ic>
              <PhoneIcon />
            </Ic>
            <span>{site.phoneDisplay}</span>
          </a>
          <button
            className="menu"
            id="menu"
            type="button"
            aria-expanded={open}
            aria-controls="nav"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
}
