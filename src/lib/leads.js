const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT

/**
 * Sends a quote request to the configured endpoint (Formspree, a CRM webhook, etc).
 * Without an endpoint the request is logged so the form stays usable in development.
 */
export async function submitLead(lead) {
  const payload = { ...lead, source: 'website-quote-form', submittedAt: new Date().toISOString() }

  if (!ENDPOINT) {
    if (import.meta.env.DEV) console.info('[leads] VITE_LEAD_ENDPOINT not set, payload:', payload)
    await new Promise((resolve) => setTimeout(resolve, 700))
    return
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`Lead submission failed with ${response.status}`)
}
