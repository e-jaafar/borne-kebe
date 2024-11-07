import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const attachment = formData.get('attachment') as File | null;

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    const attachments = [];
    if (attachment) {
      const buffer = await attachment.arrayBuffer();
      attachments.push({
        filename: attachment.name,
        content: Buffer.from(buffer),
      });
    }

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['elmrabet.jaafar@gmail.com', 'nexus64be@gmail.com'],
      replyTo: email,
      subject: `Nouveau message de ${name}: ${subject}`,
      attachments,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Nouveau message de contact</title>
          </head>
          <body>
            <h2>Message de ${name} (${email})</h2>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </body>
        </html>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Erreur Resend:', error);
    return Response.json(
      { success: true },
      { status: 200 }
    );
  }
} 