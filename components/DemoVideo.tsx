'use client'

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const DemoVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasPlayAttempted, setHasPlayAttempted] = useState(false);
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Détection des performances du système
  const isLowPerformance = () => {
    if (typeof window === 'undefined') return false;
    return (
      (navigator.hardwareConcurrency || 4) <= 4 ||
      (navigator.deviceMemory || 8) < 4 ||
      /Windows NT/.test(navigator.userAgent)
    );
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Optimisation du chargement de la vidéo
    video.preload = isLowPerformance() ? "metadata" : "auto";
    
    const handleCanPlay = () => {
      setIsLoaded(true);
    };

    const handleError = (e: Event) => {
      console.error("Erreur de chargement vidéo:", e);
      setIsLoaded(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView || hasPlayAttempted || isReducedMotion || isMobile) return;

    const playVideo = async () => {
      try {
        setHasPlayAttempted(true);
        await video.play();
      } catch (error) {
        console.warn("Lecture automatique impossible:", error);
      }
    };

    if (isLoaded) {
      playVideo();
    }
  }, [isInView, isLoaded, hasPlayAttempted, isReducedMotion, isMobile]);

  return (
    <div ref={containerRef} className="relative w-full aspect-video">
      {/* Fallback image pendant le chargement */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse">
          <img
            src="/videos/hero1.jpg"
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <video
        ref={videoRef}
        poster="/videos/hero1.jpg"
        playsInline
        muted
        loop
        controls={!isLowPerformance()}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Format WebM pour une meilleure performance */}
        <source
          src="/videos/demonstration.webm"
          type="video/webm"
        />
        {/* Fallback MP4 */}
        <source
          src="/videos/demonstration.mp4"
          type="video/mp4"
        />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>

      {/* Bouton de lecture manuel pour les appareils à faible performance */}
      {/* {isLowPerformance() && !isReducedMotion && (
        <button
          onClick={() => videoRef.current?.play()}
          className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors"
          aria-label="Lire la vidéo"
        >
          <svg
            className="w-16 h-16 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )} */}
    </div>
  );
}; 