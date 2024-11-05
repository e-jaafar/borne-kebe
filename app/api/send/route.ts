import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Récupérer le FormData
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

    // Préparer les pièces jointes si présentes
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
      to: ['elmrabet.jaafar@gmail.com',
           'nexus64be@gmail.com'],
      replyTo: email,
      subject: `Nouveau message de ${name}: ${subject}`,
      attachments,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau message de contact</title>
          </head>
          <body style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
          ">
            <div style="
              background-color: white;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            ">
              <h1 style="
                color: #1a0f2e;
                margin-bottom: 25px;
                font-size: 24px;
                text-align: center;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 15px;
              ">
                Nouveau message de contact
              </h1>

              <div style="margin-bottom: 20px;">
                <h2 style="
                  color: #4b5563;
                  font-size: 16px;
                  margin-bottom: 8px;
                ">
                  Informations de contact
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="
                      padding: 12px;
                      border-bottom: 1px solid #e5e7eb;
                      color: #6b7280;
                      width: 120px;
                    ">
                      <strong>Nom:</strong>
                    </td>
                    <td style="
                      padding: 12px;
                      border-bottom: 1px solid #e5e7eb;
                      color: #1f2937;
                    ">
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="
                      padding: 12px;
                      border-bottom: 1px solid #e5e7eb;
                      color: #6b7280;
                    ">
                      <strong>Email:</strong>
                    </td>
                    <td style="
                      padding: 12px;
                      border-bottom: 1px solid #e5e7eb;
                      color: #1f2937;
                    ">
                      <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">
                        ${email}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="
                      padding: 12px;
                      border-bottom: 1px solid #e5e7eb;
                      color: #6b7280;
                    ">
                      <strong>Sujet:</strong>
                    </td>
                    <td style="
                      padding: 12px;
                      border-bottom: 1px solid #e5e7eb;
                      color: #1f2937;
                    ">
                      ${subject}
                    </td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 30px;">
                <h2 style="
                  color: #4b5563;
                  font-size: 16px;
                  margin-bottom: 15px;
                ">
                  Message
                </h2>
                <div style="
                  background-color: #f9fafb;
                  padding: 20px;
                  border-radius: 6px;
                  color: #1f2937;
                  white-space: pre-wrap;
                  line-height: 1.6;
                ">
                  ${message}
                </div>
              </div>

              <div style="
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
              ">
                <p>
                  Ce message a été envoyé depuis le formulaire de contact de Borne-Kébè.
                  <br>
                  Pour répondre directement à l'expéditeur, utilisez le bouton "Répondre" de votre client mail.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Erreur Resend:', error);
    return Response.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
} 