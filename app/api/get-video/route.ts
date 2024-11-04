export async function GET() {
  return Response.json({ 
    url: '/videos/demonstration.mp4' // Vidéo locale dans le dossier public
  })
} 