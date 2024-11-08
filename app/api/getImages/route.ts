import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Fonction pour mélanger un tableau aléatoirement
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public', 'images')
    
    if (!fs.existsSync(publicDir)) {
      console.error(`Dossier non trouvé: ${publicDir}`)
      return NextResponse.json({ error: 'Dossier images non trouvé' }, { status: 404 })
    }

    const files = fs.readdirSync(publicDir)
    
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG'].includes(ext)
    })

    const randomImages = shuffleArray(imageFiles).slice(0, 10)

    const images = randomImages.map(file => ({
      src: `/images/${file}`,
      alt: path.parse(file).name
    }))

    return NextResponse.json(images, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Erreur lors du chargement des images' },
      { status: 500 }
    )
  }
}
