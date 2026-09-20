export function checkBrowser(supportedLocales = ['en-US', 'de-DE', 'fr-FR', 'hi-IN', 'kn-IN', 'it-IT', 'es-ES']) {
    const browserLanguages = navigator.languages || [navigator.language];

    return(browserLanguages.forEach((lang: string) => {
      if(supportedLocales.includes(lang)) return lang;
    }) ?? "en-US");
  }