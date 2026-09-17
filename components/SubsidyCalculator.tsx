"use client";

import { useState } from "react";
import { wa } from "@/lib/site";
import { Ic, WhatsAppIcon } from "./Icons";

const SUBSIDY: Record<number, number> = { 1: 30000, 2: 60000, 3: 78000 };
const SIZES = [
  { kw: 1, note: "small home" },
  { kw: 2, note: "most homes" },
  { kw: 3, note: "max subsidy" },
] as const;

export default function SubsidyCalculator() {
  const [kw, setKw] = useState(3);

  return (
    <div className="calc">
      <h2>Check your subsidy</h2>
      <p className="lede-l">Choose a system size.</p>
      <div className="sizes" role="group" aria-label="System size">
        {SIZES.map((size) => (
          <button
            key={size.kw}
            type="button"
            aria-pressed={kw === size.kw}
            onClick={() => setKw(size.kw)}
          >
            {size.kw} kW<small>{size.note}</small>
          </button>
        ))}
      </div>
      <div className="result" aria-live="polite">
        <div className="lbl">Government subsidy</div>
        <div className="amount">₹{SUBSIDY[kw].toLocaleString("en-IN")}</div>
        <div className="lbl">Power it makes</div>
        <div className="units">
          about {110 * kw}–{130 * kw} units a month
        </div>
        <p className="small-l">
          Final price depends on your roof and load. The site survey is free.
        </p>
        <a
          className="btn btn-gold"
          href={wa(`Hi SuryaVastra, I want a quote for a ${kw} kW rooftop solar system.`)}
          target="_blank"
          rel="noopener"
        >
          <Ic>
            <WhatsAppIcon />
          </Ic>
          <span>Get a quote on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
