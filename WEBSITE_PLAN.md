# Website plan

Why this file exists: the original build brief lived in a file outside the repo
(`SuryaVastra_Expansion_Plan_for_Cowork.md`) that could not be found again when it
was needed. Decisions that shape the site belong in the repo with the code.

Last settled: 24 October 2026, with SK.

## What this website is for

One job: bring in enquiries for **PM Suryaghar rooftop solar**, and support the
customers who already have a system.

The business target is **10 installations a month** at about **₹10,000 net to SK
per project**, across Narsipatnam and Anakapalli district, Kakinada and Kurnool.
There are no plans to serve new districts, so the site goes deep on those areas
rather than wide.

Two consequences worth stating, because they decide arguments later:

- **Qualified beats many.** A visitor who leaves their monthly electricity bill
  and village is worth more than ten who bounce. Pages are built to produce that,
  not to rank for generic solar terms.
- **No product prices online** beyond the AMC plans. A posted price invites
  undercutting, and the margin is thin enough that it matters. Lead with the
  subsidy figure instead.

## Architecture: two tools, not one

| Audience | Where it lives | Hosting cost |
|---|---|---|
| Public — new and existing customers | This Next.js site, static, on Cloudflare Pages | ₹0 |
| Staff — SK, Aruna, Arjun, Ganga | Claude artifacts (Narsipatnam Ledger, Front Desk & Field Tracker) | ₹0 |

An earlier plan put a staff portal at `/app` behind Supabase Auth on Vercel Pro.
That was dropped: the documents it would generate are already produced from an
artifact, and rebuilding them as a server-rendered portal costs about ₹21,000 a
year to replace something that works.

Because the public side needs no server, it is a **static export**
(`output: "export"`), which Cloudflare serves free and unmetered. The one dynamic
piece is `functions/api/enquiry.ts`.

**What this costs us, stated plainly:** artifacts are shared by link, so the
role permissions the portal plan specified — Arjun and Ganga never seeing
quotation amounts — cannot be enforced technically. Separate artifacts per role
is the mitigation, and it is a discipline boundary rather than a security one. If
that is not good enough for pricing data, the portal and its yearly cost come
back onto the table.

## Pages

| Route | Purpose |
|---|---|
| `/` | What we do, why us, the free survey offer |
| `/home-solar` | PM Suryaghar explained, subsidy calculator, the steps, documents, FAQ |
| `/business-solar` | Shops, schools, mills, cold storages, aqua farms |
| `/amc-service` | Three AMC plans, service booking by WhatsApp |
| `/customer-help` | Existing customers: faults, net meter, subsidy status, warranty |
| `/contact` | Address, hours, GSTIN, areas served, general enquiry form |

## Out of scope

- **Any store, retail or expansion content.** Dropped as a business idea. The
  earlier brief had a `/store` page and a Sankranti 2027 banner; both are gone and
  should not come back without a decision recorded here.
- **CCTV and electrical.** Removed from the site. It does not appear in the
  project portfolio, the financial targets or the roadmap.
- Owner money views — costs, profit, supplier payments. Those stay in the Ledger.
- Customer logins, offline support.

## Open points

- **The enquiry form.** The brief said WhatsApp links only, no web form. The form
  was kept because it captures the monthly bill and system size that qualify a
  lead, which a WhatsApp message does not reliably carry. It lives on `/contact`,
  `/home-solar`, `/business-solar` and `/amc-service`. Revisit if it brings in
  more noise than leads.
- **Do the AMC prices include GST?** The page already carries the three plans,
  the 2-year 10% discount, the half-yearly split and the ₹500 camp offer, but it
  ends on "GST as applicable", which a customer cannot act on. SK to settle it.
- **`/reference` is empty.** The approved design draft, logo files, the three
  fillable PDFs, the AMC price list and the Noto fonts are all still to be placed
  there.
- **Real photos.** The illustrations are placeholders. Needed: 3–6 finished
  rooftop installs and the shop front.
- **Google Business Profile** still needs the website link.
