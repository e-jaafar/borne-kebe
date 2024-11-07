export function getAsciiDomain(urlString: string): string {
  try {
    const url = new URL(urlString);
    return url.hostname; // Retourne le nom de domaine en ASCII
  } catch (error) {
    console.error('Invalid URL:', error);
    return '';
  }
} 