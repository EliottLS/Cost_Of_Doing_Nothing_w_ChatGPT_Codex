# Salesforce Value Studio

Independent interview demo for an SMB & Growth AE conversation. One shared Suite investment, with separate Sales and Service value streams and a combined financial business case. Fictional Australian SMB, AUD excluding GST, and supplied/illustrative pricing; not affiliated with or endorsed by Salesforce.

## Run and deploy

Requires Node.js 20+; no dependencies or credentials.

```sh
npm start
npm test
```

Port 3000, override with `PORT`. Deploy `index.html`, `style.css`, `app.js`, and `model.js` together to any static host. The GitHub Pages workflow on `main` runs the financial tests, uploads only those four assets, and deploys them. The repository must use GitHub Actions as its Pages source. Google Fonts are optional; system fonts provide fallback.

## Three guided areas

1. **Shared investment:** core Suite (Starter A$35/user/month, Pro A$140, or custom), unique billed users, one implementation and ramp, customer-facing AI, employee AI, cost allocation and overlap review. Colour-coded steps with inclusion controls.
2. **Value analysis:** distinct Sales and Service inputs, scenarios, opportunities before shared investment, and net after allocated recurring costs. Each stream can be included independently. Core and employee licence seats never come from adding the two team headcounts.
3. **Business case & deck:** combined annual net, first-year net, payback, cost of delay, six navigable slides, separate talking tracks, discovery questions and follow-up email. PDF printing includes all six slides with presenter notes. No .pptx export or external generative AI service.

Inputs persist in local browser storage. Reset restores the fictional example. Earlier team inputs are retained where possible; the new shared commercial configuration starts from explicit defaults and should be reviewed. Old per-team subscription and implementation inputs are ignored by the combined case. Avoid sensitive data on a shared device.

## Financial model

`calculateCase` is the application model; it uses `calculate` to measure each team's workload and financial benefits.

- Sales released admin hours use 52/12 weeks/month. Additional revenue = opportunities × percentage-point win-rate uplift × deal value; gross margin converts revenue to gross profit. Win rate is capped at 100%.
- Service released hours combine successful AI resolutions with handling efficiency on remaining tickets, avoiding double-counting. Eligible customer conversations are charged even when escalated. Removing resolution benefits does not remove conversation charges.
- Capacity is operational value. Only the entered realisable percentage becomes labour cash savings. Financial benefit = cash savings + incremental gross profit.
- Shared employee actions = the sum of distinct activity estimates from included teams: reps × working days × (CRM updates + record lookups + workflow actions/day) × AI execution share. Check duplicate employee activities manually; a shared person may work in both teams but each chargeable action should appear once. Activity estimates do not automatically create more savings.
- Combined benefit subtracts the entered duplicate-benefit amount, capped at available benefit. The deduction is distributed proportionately between value streams. A separate duplicate-hours deduction affects combined capacity only. Review both to avoid inconsistent assumptions.
- Combined net = adjusted Sales benefit + adjusted Service benefit − one Suite subscription − one unique employee AI licence pool − customer and employee usage.
- Allocate all recurring costs for team reporting by headcount or a custom percentage. Allocation never changes combined net or billed seats. A sole included stream gets 100%; with both excluded, shared costs remain unallocated. Team annual allocated net excludes implementation; combined first-year net includes it once.
- First-year net = steady-state net × (12 − ramp months) − fixed licence costs during ramp − one implementation. Assume no benefits or metered usage during ramp. Payback includes ramp fixed costs plus implementation and requires positive monthly net. One common ramp is a simplifying assumption.
- Three-month combined cost of delay = positive steady-state net × 3. Team views instead show three months of foregone opportunity **before shared investment**; do not add independently calculated net ROI claims.

Scenarios scale efficiency and customer AI-offered share or Sales conversion uplift by 0.65 / 1 / 1.25 with percentage caps. Other inputs remain fixed. Taxes, financing, discounting, complex rollout curves and seasonality are excluded.

## Commercial references and qualifications

User-supplied Australian references (November 2026), not independently verified here: Starter Suite A$35/user/month; Pro Suite A$140; conversations A$2.80 each; Flex Credits A$700 per 100,000, with 20 credits per standard action (A$0.14/action). Flex costs are pro rata estimates, not rounded pack purchases.

Employee options:

- Agentforce User Licence: A$7/unique user/month plus Flex Credits; limited CRM objects and deployed-agent access.
- Employee AI Add-on: A$175/unique user/month alongside compatible CRM licences; qualifying employee-agent usage is unmetered. Other services, such as Data 360, can be entered separately.
- Coworker User Licence: a distinct US$50/user/month reference. AUD-per-USD is editable (1.5 default is illustrative, not live FX). Enter additional service/usage costs manually; no inclusion or free usage is assumed.

Max editions are a qualification alternative; no invented Max price or bundled entitlement is assumed. Foundations is noted in the reference table but is not a separate shared Suite offer. A shared platform does not imply every Suite includes both teams' required capabilities or permits shared licence access. Confirm eligibility, functionality, billing definitions, included usage and negotiated terms with Salesforce before treating any combination as a quote.
