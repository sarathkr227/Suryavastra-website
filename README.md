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
npm run build                # static export into out/
npx serve out                # check the exported site
```

`npm run build` writes a static site to `out/`. There is no `npm start`: the
pages are plain HTML by the time the build finishes.

## Where enquiries go

Every page has a short form. It posts to `/api/enquiry`, which validates the input and
inserts a row into `public.website_enquiries` in the **suryavastra-staging** Supabase
project.

That endpoint is a Cloudflare Pages Function in `functions/api/enquiry.ts`, not a
Next.js route — a static export cannot carry one. It reads its Supabase settings from
the request context, so they have to be set as Pages environment variables and not
only baked into the build.

That table is deliberately separate from `public.leads`. A lead needs `customer_id`,
`branch_id` and `current_stage_id`, so a web form cannot create a well-formed one.
Instead Aruna reviews the enquiry in the Front Desk app and converts it into a real lead,
stamping `converted_lead_id` on the enquiry so the trail is kept.

Row-level security on the table:

- the website's key (`anon`) may **insert** an enquiry and nothing else — it cannot read
  a single row back;
- signed-in staff can read the inbox; `edit_leads` can update it; `manage_config` can
  delete.

Spam is handled by a hidden honeypot field, a rate limit of 5 submissions per 10
minutes, and CHECK constraints on the table itself. The limit counts per Worker
isolate rather than across the account, so it stops one address hammering the form
but is not a hard global cap.

Every form also keeps its WhatsApp and call buttons, which stay the fastest route for
most local customers.

### Keeping the database awake

A free Supabase project pauses after roughly a week of inactivity, and a paused
database makes the form answer "We could not save your details" — so a quiet week
would cost us enquiries without anything looking broken.

`.github/workflows/supabase-keepalive.yml` calls `public.keepalive()` every three
days to prevent that. The function returns the current time and reads no data, so
the anonymous role may execute it safely. If a ping fails the job fails, which turns
the schedule into a monitor: a failure email means the project is paused and the form
is down.

Two things about the schedule itself. GitHub only fires `schedule` triggers on the
**default branch**, so this does nothing at all until the workflow is merged into
`main` — until then use "Run workflow" by hand. And GitHub disables schedules in a
repository idle for 60 days, which produces no failed run and therefore no email:
the monitor simply stops, the project pauses, and the form breaks quietly. If
enquiries matter, point the job at an external dead-man's-switch so that silence
itself raises an alarm.

The keep-alive is a workaround for the free tier, not a fix. It does nothing about
the lack of automatic backups, which is the other reason a paid plan is worth
considering once the site is taking real enquiries.

## Environment variables

| Name | What it is |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | The suryavastra-staging project URL |
| `SUPABASE_PUBLISHABLE_KEY` | The publishable (anon) key. Safe to deploy — RLS limits it to inserting an enquiry |
| `NEXT_PUBLIC_SITE_URL` | The live address, used for canonical URLs, the sitemap and share cards |
| `SITE_LIVE` | Build-time only. Must be exactly `true` for the site to be indexable; anything else disallows every crawler |

`NEXT_PUBLIC_SITE_URL` and `SITE_LIVE` are read while the pages are generated, so
changing either one needs a fresh deploy. The two Supabase values are read per
request by the enquiry function, so those apply as soon as they are saved.

`vercel.json` still carries the Supabase values, but **Vercel is no longer a
complete fallback**. With `output: "export"` a Vercel build produces static files
and nothing else: the pages all work, and `/api/enquiry` does not exist there, so
every form fails silently. Its `regions` and runtime `env` settings are now inert.
Either delete the file and disconnect the Vercel project, or treat that deploy as
a read-only mirror — do not rely on it to take enquiries.

## Deploying to Cloudflare Pages

Pages serves `out/` as static files, which are free and unmetered, and runs
`functions/api/enquiry.ts` for the one dynamic request the site makes.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Framework preset | None |

Set all three environment variables above in the Pages project, for **Production and
Preview both**. `NEXT_PUBLIC_SITE_URL` and `SITE_LIVE` are read during the build, so a
change to either needs a fresh deploy to take effect; the two Supabase values are read
at request time by the Function.

`SITE_LIVE` stays unset until the domain is live. While it is unset, `robots.txt`
disallows everything, so the preview address never competes with the real one in
Google.

Response headers live in `public/_headers`, which Next copies into `out/` and
Cloudflare applies at the edge. The Content-Security-Policy there allows the Google
Fonts hosts that `app/layout.tsx` loads from; adding another external script, font or
image source means widening that policy too, or the browser silently blocks it.

## Still to do (from the plan)

- Replace the illustrations with real photos: 3–6 finished rooftop installs, the shop
  front, and later the store and demo wall.
- When the store opens, update the address, map link and banner.
- Update the Google Business Profile and add the website link.
