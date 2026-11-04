# Salesforce Value Studio

Independent interview demo for an SMB & Growth Account Executive conversation. Fictional Australian SMB, AUD excluding GST, and explicitly illustrative pricing and assumptions. No affiliation with or endorsement by Salesforce.

## Run

Requires Node.js 20+; no dependencies or credentials.

```sh
npm start
```

The server listens on port 3000 (override with `PORT`). Run `npm test` for financial-model tests. Deploy the static `index.html`, `style.css`, `app.js`, and `model.js` files together to any static website host. Google Fonts are optional; system fonts provide a fallback.

## Demo

Choose Service Cloud or Sales Cloud, edit the baseline and improvement assumptions, compare scenarios, and switch monthly/quarterly/yearly reporting. The second tab contains six navigable presentation slides, separate talking tracks, discovery questions, and a follow-up email. Print / save PDF produces all six slides with presenter notes. This version does not export a .pptx file or call a generative AI service. Customer inputs persist locally in the browser; reset restores the example. Avoid entering sensitive customer data on a shared device.

## Financial conventions

Service: AI resolutions = monthly tickets × AI-offered share × resolution success. Released hours combine avoided human handling of those resolutions with efficiency improvements on all remaining tickets. AI billing is independent of successful resolution: conversations charge all eligible AI interactions; Flex Credits charge interactions × actions per interaction × credits per action. Repeat interactions and escalated tickets remain chargeable. AI cost per resolution divides AI usage and licence costs by successfully resolved tickets.

Sales: released admin hours use 52/12 weeks per month. Incremental revenue = monthly qualified opportunities × percentage-point win-rate improvement × deal revenue; gross margin converts this to profit. Win rate is capped at 100%.

Only the explicitly realisable percentage of capacity value is cash savings. Net monthly benefit = realisable labour savings + incremental gross profit − core subscription − AI licences − AI usage. Remaining capacity is shown separately and never added to financial benefit. Scenarios scale efficiency and AI-offered share or sales conversion uplift by 0.65 / 1 / 1.25, with percentage caps.

Year one assumes zero benefits and zero usage during the chosen ramp, while core subscription and AI licence costs continue, and subtracts implementation once. Payback includes ramp fixed subscription/licence costs and implementation, then divides by positive steady-state monthly net benefit. A three-month delay is positive steady-state monthly net benefit × 3; it is a discussion prompt, not a forecast. Taxes, financing, discount rates, retention, seasonality, and complex rollout curves are outside this model. Validate attribution to avoid overlapping sales benefits.

## Agentforce commercial assumptions

User-supplied Australian list prices (November 2026), not independently verified here: AU$700 / 100,000 Flex Credits, 20 credits per standard action (AU$0.14); AU$2.80 per eligible conversation; AU$175 per employee per month; AU$7 per Agentforce user per month plus Flex Credits. Foundations has no additional platform fee for eligible customers; the Foundations scenario models usage via Flex Credits. Core cloud subscription is separate. Verify eligibility, inclusions, actual billing definitions and negotiated terms with Salesforce.

The five pricing options are alternative scenarios, not automatically interchangeable offers. Employee add-on assumes no extra metered charge; confirm entitlements. Flex estimates are pro rata consumption, not rounded pack purchases. No extra escalation labour penalty is assumed; escalated tickets remain in human workload. Storage schema v2 starts fresh rather than carrying forward obsolete per-resolution pricing assumptions.

## Guided simulation and Suite Plans

The four colour-coded input steps show one panel at a time, with direct step buttons and Previous/Next navigation. Include checkboxes control baseline benefits, improvements, Agentforce, and core investment separately. Removing baseline or improvements removes the associated benefits but leaves separately included costs. Removing Agentforce removes its actions, AI charges and autonomous resolutions; core workflow efficiency remains. Removing investment removes core licences, implementation and ramp; AI costs remain. Capacity realisation belongs to the improvement step.

Flex Credits default to an editable activity estimate: reps × working days × (CRM updates + record lookups + workflow actions per rep/day) × AI execution share. Each standard action uses 20 credits; 100,000 credits cost A$700, or A$0.14/action. Service defaults: 8 reps × 21 days × 32 actions/day × 50% = 2,688 actions, 53,760 credits, A$376.32/month. Sales defaults: 12 reps × 21 days × 22 actions/day × 50% = 2,772 actions, 55,440 credits, A$388.08/month. These are rough illustrative activity assumptions, not measured benchmarks. They are an alternative to interaction-based action estimation, never added on top. Action estimates do not automatically establish corresponding time or conversion benefits; validate those separately.

Core licence pricing supports custom monthly subscription, Starter Suite at A$35/user/month, and Pro Suite at A$140/user/month. Per-user rates and seat counts are editable; switching plans restores the supplied list rate. Core Suite Plans and Agentforce pricing remain separate. Confirm feature availability, Agentforce eligibility, entitlements and contractual terms before treating a combination as an offer.
