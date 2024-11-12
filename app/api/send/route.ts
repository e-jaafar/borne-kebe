import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    const file = formData.get('file') as File | null

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Préparation des pièces jointes
    const attachments = []
    if (file && file instanceof File) {
      try {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        attachments.push({
          filename: file.name,
          content: buffer
        })
      } catch (error) {
        console.error('Erreur lors du traitement du fichier:', error)
        return NextResponse.json(
          { error: 'Erreur lors du traitement du fichier' },
          { status: 400 }
        )
      }
    }

    const { data, error } = await resend.emails.send({
      from: 'Borne Kébè <onboarding@resend.dev>',
      to: ['elmrabet.jaafar@gmail.com'],
      subject: `Nouveau message de ${name}: ${subject}`,
      replyTo: email,
      attachments,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau message de contact</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f9fafb;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- En-tête -->
                    <tr>
                      <td style="background: linear-gradient(to right, #9333ea, #7c3aed); padding: 32px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">
                          Nouveau message de contact
                        </h1>
                      </td>
                    </tr>

                    <!-- Contenu principal -->
                    <tr>
                      <td style="padding: 32px;">
                        <!-- Informations de l'expéditeur -->
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="padding-bottom: 24px;">
                              <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 16px;">Informations de l'expéditeur</h2>
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td style="padding: 12px; background-color: #f3f4f6; border-radius: 6px;">
                                    <p style="margin: 0; color: #4b5563;"><strong>Nom:</strong> ${name}</p>
                                    <p style="margin: 8px 0 0; color: #4b5563;"><strong>Email:</strong> ${email}</p>
                                    <p style="margin: 8px 0 0; color: #4b5563;"><strong>Sujet:</strong> ${subject}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <!-- Message -->
                          <tr>
                            <td style="padding-bottom: 24px;">
                              <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 16px;">Message</h2>
                              <div style="padding: 16px; background-color: #f3f4f6; border-radius: 6px;">
                                <p style="margin: 0; color: #4b5563; white-space: pre-line;">${message}</p>
                              </div>
                            </td>
                          </tr>

                          ${file ? `
                            <!-- Pièce jointe -->
                            <tr>
                              <td style="padding-bottom: 24px;">
                                <h2 style="color: #1f2937; font-size: 18px; margin: 0 0 16px;">Pièce jointe</h2>
                                <div style="padding: 12px; background-color: #f3f4f6; border-radius: 6px; border: 1px dashed #9333ea;">
                                  <p style="margin: 0; color: #4b5563;">
                                    <strong>Fichier:</strong> ${file.name}<br>
                                    <strong>Type:</strong> ${file.type}<br>
                                    <strong>Taille:</strong> ${(file.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ` : ''}
                        </table>
                      </td>
                    </tr>

                    <!-- Pied de page -->
                    <tr>
                      <td style="background-color: #f3f4f6; padding: 24px; text-align: center;">
                        <p style="margin: 0; color: #6b7280; font-size: 14px;">
                          Ce message a été envoyé depuis le formulaire de contact de Borne Kébè
                        </p>
                        <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">
                          © ${new Date().getFullYear()} Borne Kébè. Tous droits réservés.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Message envoyé avec succès', data },
      { status: 200 }
    )

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
} 