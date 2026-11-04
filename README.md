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

Service: AI resolutions = monthly tickets × AI-offered share × resolution success. Released hours combine avoided human handling of those resolutions with efficiency improvements on all remaining tickets. AI consumption is charged per successful resolution for this illustrative model; verify the actual Salesforce product's contractual billing units.

Sales: released admin hours use 52/12 weeks per month. Incremental revenue = monthly qualified opportunities × percentage-point win-rate improvement × deal revenue; gross margin converts this to profit. Win rate is capped at 100%.

Only the explicitly realisable percentage of capacity value is cash savings. Net monthly benefit = realisable labour savings + incremental gross profit − subscription − AI usage. Remaining capacity is shown separately and never added to financial benefit. Scenarios scale efficiency and AI-offered share or sales conversion uplift by 0.65 / 1 / 1.25, with percentage caps.

Year one assumes zero benefits and zero usage during the chosen ramp, while subscription costs continue, and subtracts implementation once. Payback includes ramp subscription and implementation, then divides by positive steady-state monthly net benefit. A three-month delay is positive steady-state monthly net benefit × 3; it is a discussion prompt, not a forecast. Taxes, financing, discount rates, retention, seasonality, and complex rollout curves are outside this model. Validate attribution to avoid overlapping sales benefits.
