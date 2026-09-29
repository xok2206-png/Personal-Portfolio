# Contact email integration

The centered form is implemented, with native required/email validation, pending state, retry preserving fields, success clearing fields, 15-second timeout, and an unobtrusive honeypot. No real mail service is connected, as requested. Without configuration the form explicitly reports that nothing was sent.

Set VITE_CONTACT_FORM_ENDPOINT in your local environment and deployment settings to a public HTTPS form endpoint accepting JSON POST fields name, email, subject, message, website. Rebuild/restart Vite after changing it. A 2xx response indicates acceptance; non-2xx/network failures preserve the draft. The service must support the site's origin via CORS and enforce server-side validation, rate limiting and delivery. Never put private provider API keys in VITE variables: these are public client configuration.

Browser QA used a mocked endpoint for HTTP500 retry and HTTP200 success. No actual message was sent.
