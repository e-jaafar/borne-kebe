import { list } from '@vercel/blob'

export async function GET() {
  const { blobs } = await list()
  const video = blobs.find(blob => blob.pathname.includes('demonstration'))
  
  return Response.json({ url: video?.url })
} 