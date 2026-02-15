export function checkBrowser(supportedLocales = ['en-US', 'de-DE', 'fr-FR', 'hi-IN', 'kn-IN', 'it-IT', 'es-ES']) {
    const browserLanguages = navigator.languages || [navigator.language];
  
    for (const lang of browserLanguages) {
      const baseLang = lang;
      if (supportedLocales.includes(baseLang)) {
        return baseLang;
      }
    }
  
    return 'en-US'; // default fallback
  }