export function getAsciiDomain(urlString: string): string {
  try {
    const url = new URL(urlString);
    return url.hostname; // Retourne le nom de domaine en ASCII
  } catch (error) {
    console.error('Invalid URL:', error);
    return '';
  }
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_ENV === 'development' 
    ? process.env.NEXT_PUBLIC_LOCAL_URL 
    : process.env.NEXT_PUBLIC_SITE_URL
} 