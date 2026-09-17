"use client";

import { useState } from "react";
import { wa } from "@/lib/site";
import { Ic, WhatsAppIcon } from "./Icons";

const TYPES = [
  "Shops and showrooms",
  "Schools and colleges",
  "Hospitals and clinics",
  "Rice mills and factories",
  "Cold storages",
  "Aqua and fish farms",
  "Petrol bunks",
  "Apartments and hostels",
  "Other",
];

const BILLS = [
  "Below ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
];

/** The WhatsApp message builder from the approved design. */
export default function SiteVisitBuilder() {
  const [type, setType] = useState(TYPES[0]);
  const [bill, setBill] = useState(BILLS[0]);

  const message = `Hi SuryaVastra, I want a free site visit for business solar.\nBusiness type: ${type}\nMonthly power bill: ${bill}\nName:\nLocation:`;

  return (
    <div className="builder">
      <h2>Ask on WhatsApp instead</h2>
      <p className="lede-d">Pick your details and we&apos;ll reply on WhatsApp.</p>
      <label>
        Business type
        <select value={type} onChange={(event) => setType(event.target.value)}>
          {TYPES.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        Monthly power bill
        <select value={bill} onChange={(event) => setBill(event.target.value)}>
          {BILLS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <a className="btn btn-wa" href={wa(message)} target="_blank" rel="noopener">
        <Ic>
          <WhatsAppIcon />
        </Ic>
        <span>Send on WhatsApp</span>
      </a>
    </div>
  );
}

export { TYPES as BUSINESS_TYPES, BILLS as BUSINESS_BILLS };
