"use client";

import { useEffect, useRef } from "react";

/** The rooftop illustration from the approved design; the sun rises once on load. */
export default function HeroArt() {
  const sunRef = useRef<SVGGElement | null>(null);
  const arcRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const sun = sunRef.current;
    const arc = arcRef.current;
    if (!sun || !arc) return;

    const length = arc.getTotalLength();
    const stop = 0.42;
    const place = (fraction: number) => {
      const point = arc.getPointAtLength(length * fraction);
      sun.setAttribute("transform", `translate(${point.x} ${point.y})`);
    };

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      place(stop);
      return;
    }

    let start: number | null = null;
    let frame = 0;
    place(0.02);
    const step = (time: number) => {
      if (start === null) start = time;
      const k = Math.min((time - start) / 1800, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      place(0.02 + (stop - 0.02) * eased);
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg viewBox="0 0 480 400" className="hero-art" aria-hidden="true">
      <path
        ref={arcRef}
        className="arc"
        d="M40 300 Q240 -40 440 300"
        fill="none"
        stroke="#F5A800"
        strokeOpacity=".45"
        strokeWidth="2"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <g ref={sunRef} className="sun">
        <circle r="40" fill="#F5A800" opacity=".18" />
        <circle r="26" fill="#F5A800" />
      </g>
      <path d="M60 400V280L240 170l180 110v120Z" fill="#15294F" />
      <path d="M40 292 240 166l200 126" fill="none" stroke="#F4F7FA" strokeWidth="6" strokeLinejoin="round" />
      <path d="M120 262 240 188l120 74-26 18-94-58-94 58Z" fill="#1E4F80" />
      <path d="M147 280 240 222l93 58-30 19-63-39-63 39Z" fill="#2A6399" />
      <g stroke="#9CC1E4" strokeWidth="1.5" fill="none">
        <path d="M120 262 147 280M360 262 333 280M240 188v34M180 225 201 239M300 225 279 239M150 244 175 260M330 244 305 260" />
      </g>
      <rect x="200" y="320" width="80" height="80" fill="#0D1B3E" />
      <rect x="110" y="310" width="54" height="44" fill="#F5A800" opacity=".85" />
      <rect x="316" y="310" width="54" height="44" fill="#F5A800" opacity=".85" />
      <path d="M137 310v44M110 332h54M343 310v44M316 332h54" stroke="#15294F" strokeWidth="3" />
    </svg>
  );
}
