# SuryaVastra Solar Energy — website

The public website for SuryaVastra Solar Energy, Narsipatnam. Seven pages, built from
the approved design in `SuryaVastra_Expansion_Plan_for_Cowork.md` section 6.

| Page | Path |
|---|---|
| Home | `/` |
| Home Solar | `/home-solar` |
| Business & Farm Solar | `/business-solar` |
| Solar Store | `/store` |
| AMC & Service | `/amc-service` |
| CCTV & Electrical | `/cctv-electrical` |
| Contact | `/contact` |

## Content rules (from the plan)

- English only.
- No product prices online. AMC plan prices are shown, product prices are not.
- The banner says the store opens at Sankranti 2027.
- Phase 2–3 business lines stay off the site until they are running.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in the Supabase key
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

## Where enquiries go

Every page has a short form. It posts to `/api/enquiry`, which validates the input and
inserts a row into `public.website_enquiries` in the **suryavastra-staging** Supabase
project.

That table is deliberately separate from `public.leads`. A lead needs `customer_id`,
`branch_id` and `current_stage_id`, so a web form cannot create a well-formed one.
Instead Aruna reviews the enquiry in the Front Desk app and converts it into a real lead,
stamping `converted_lead_id` on the enquiry so the trail is kept.

Row-level security on the table:

- the website's key (`anon`) may **insert** an enquiry and nothing else — it cannot read
  a single row back;
- signed-in staff can read the inbox; `edit_leads` can update it; `manage_config` can
  delete.

Spam is handled by a hidden honeypot field, a per-instance rate limit of 5 submissions
per 10 minutes, and CHECK constraints on the table itself.

Every form also keeps its WhatsApp and call buttons, which stay the fastest route for
most local customers.

## Environment variables

| Name | What it is |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | The suryavastra-staging project URL |
| `SUPABASE_PUBLISHABLE_KEY` | The publishable (anon) key. Safe to deploy — RLS limits it to inserting an enquiry |
| `NEXT_PUBLIC_SITE_URL` | The live address, used for canonical URLs, the sitemap and share cards |

`vercel.json` carries these so a fresh deploy works without setup. Moving them into the
Vercel project's Environment Variables screen and deleting the `env` block there is
tidier once the project is settled.

## Still to do (from the plan)

- Replace the illustrations with real photos: 3–6 finished rooftop installs, the shop
  front, and later the store and demo wall.
- When the store opens, update the address, map link and banner.
- Update the Google Business Profile and add the website link.
