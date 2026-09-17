import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "SuryaVastra Solar Energy — Narsipatnam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The WhatsApp / Google share card, in brand navy and gold. */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D1B3E",
          color: "#F4F7FA",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="74" viewBox="0 0 160 124">
            <g stroke="#F5A800" strokeWidth="7" strokeLinecap="round">
              <path d="M80 6v22M36 22l11 18M124 22l-11 18M12 62h20M128 62h20" />
            </g>
            <path d="M38 82a42 42 0 0 1 84 0Z" fill="#F5A800" />
            <path d="M8 84h144" stroke="#F5A800" strokeWidth="6" />
            <g fill="none" stroke="#B08A3A" strokeWidth="4">
              <rect x="16" y="94" width="38" height="26" rx="5" />
              <rect x="61" y="94" width="38" height="26" rx="5" />
              <rect x="106" y="94" width="38" height="26" rx="5" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 40,
                fontWeight: 900,
                letterSpacing: 6,
                color: "#F5A800",
              }}
            >
              SURYAVASTRA
            </span>
            <span style={{ fontSize: 18, letterSpacing: 10, color: "#D5DCE6" }}>
              SOLAR ENERGY
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.1 }}>
            Solar, service and security for homes, farms and businesses.
          </span>
          <span style={{ fontSize: 30, color: "#B9C8D8" }}>
            PM Suryaghar vendor · Narsipatnam, Anakapalli District · 76800 43727
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 24,
            color: "#0D1B3E",
          }}
        >
          {["Home solar", "Business solar", "Solar store", "AMC & service"].map(
            (chip) => (
              <span
                key={chip}
                style={{
                  background: "#F5A800",
                  padding: "10px 22px",
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              >
                {chip}
              </span>
            )
          )}
        </div>
      </div>
    ),
    size
  );
}
