'use client'

export function DemoVideo() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        controls
      >
        <source src="/videos/demonstration.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  )
} 