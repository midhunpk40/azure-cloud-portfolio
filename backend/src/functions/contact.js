const { app } = require('@azure/functions');
const { EmailClient } = require('@azure/communication-email');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

app.http('contact', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    if (request.method === 'OPTIONS') {
      return { status: 204, headers: corsHeaders };
    }

    try {
      const body = await request.json();
      const name = (body.name || '').trim();
      const email = (body.email || '').trim();
      const subject = (body.subject || '').trim();
      const message = (body.message || '').trim();

      if (!name || !email || !subject || !message) {
        return {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          jsonBody: { error: 'All fields are required.' },
        };
      }

      const connectionString = process.env.ACS_CONNECTION_STRING;
      const senderAddress = process.env.ACS_SENDER_ADDRESS;
      const toEmail = process.env.CONTACT_TO_EMAIL;

      if (!connectionString || !senderAddress || !toEmail) {
        context.error('Missing ACS_CONNECTION_STRING, ACS_SENDER_ADDRESS, or CONTACT_TO_EMAIL.');
        return {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          jsonBody: { error: 'Azure email settings are not configured.' },
        };
      }

      const client = new EmailClient(connectionString);
      const poller = await client.beginSend({
        senderAddress,
        recipients: { to: [{ address: toEmail }] },
        replyTo: [{ address: email, displayName: name }],
        content: {
          subject: `[Portfolio] ${subject} — ${name}`,
          plainText: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
        },
      });

      await poller.pollUntilDone();

      return {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        jsonBody: { ok: true, message: 'Email notification sent via Azure.' },
      };
    } catch (err) {
      context.error('Azure Communication Services error:', err);
      return {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        jsonBody: { error: 'Failed to send email notification.' },
      };
    }
  },
});