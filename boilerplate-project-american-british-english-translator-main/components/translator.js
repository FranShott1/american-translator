const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(text, locale) {
    if (!text && text !== '') {
      return { error: 'Required field(s) missing' };
    }

    if (text === '') {
      return { error: 'No text to translate' };
    }

    if (!locale) {
      return { error: 'Required field(s) missing' };
    }

    if (locale !== 'american-to-british' && locale !== 'british-to-american') {
      return { error: 'Invalid value for locale field' };
    }

    let translatedText = text;
    let translations = [];

    if (locale === 'american-to-british') {
      // Translate American-only terms
      translations = translations.concat(this.translateTerms(text, americanOnly));

      // Translate spelling differences
      translations = translations.concat(this.translateTerms(text, americanToBritishSpelling));

      // Translate titles
      translations = translations.concat(this.translateTitles(text, americanToBritishTitles));

      // Translate time format (12:30 -> 12.30)
      translations = translations.concat(this.translateTimeAmericanToBritish(text));

    } else {
      // British to American
      // Create reverse dictionaries
      const britishToAmericanSpelling = this.reverseDict(americanToBritishSpelling);
      const britishToAmericanTitles = this.reverseDict(americanToBritishTitles);

      // Translate British-only terms
      translations = translations.concat(this.translateTerms(text, britishOnly));

      // Translate spelling differences
      translations = translations.concat(this.translateTerms(text, britishToAmericanSpelling));

      // Translate titles
      translations = translations.concat(this.translateTitles(text, britishToAmericanTitles));

      // Translate time format (12.30 -> 12:30)
      translations = translations.concat(this.translateTimeBritishToAmerican(text));
    }

    // Apply all translations
    if (translations.length === 0) {
      return { text: text, translation: 'Everything looks good to me!' };
    }

    // Sort translations by position (longest first to avoid partial replacements)
    translations.sort((a, b) => b.original.length - a.original.length);

    // Apply translations with highlighting
    translatedText = this.applyTranslations(text, translations);

    return { text: text, translation: translatedText };
  }

  translateTerms(text, dictionary) {
    const translations = [];

    for (let [american, british] of Object.entries(dictionary)) {
      // Create case-insensitive regex with word boundaries
      const regex = new RegExp(`\\b${this.escapeRegex(american)}\\b`, 'gi');
      let match;

      while ((match = regex.exec(text)) !== null) {
        translations.push({
          start: match.index,
          end: match.index + match[0].length,
          original: match[0],
          replacement: british
        });
      }
    }

    return translations;
  }

  translateTitles(text, titlesDict) {
    const translations = [];

    for (let [american, british] of Object.entries(titlesDict)) {
      // For titles, we need to match case-insensitively but preserve the case pattern
      const regex = new RegExp(`\\b${this.escapeRegex(american)}(?=\\s[A-Z])`, 'gi');
      let match;

      while ((match = regex.exec(text)) !== null) {
        // Preserve capitalization
        let replacement = british;
        if (match[0][0] === match[0][0].toUpperCase()) {
          replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
        }

        translations.push({
          start: match.index,
          end: match.index + match[0].length,
          original: match[0],
          replacement: replacement
        });
      }
    }

    return translations;
  }

  translateTimeAmericanToBritish(text) {
    const translations = [];
    // Match time format like 12:30
    const regex = /\b(\d{1,2}):(\d{2})\b/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      translations.push({
        start: match.index,
        end: match.index + match[0].length,
        original: match[0],
        replacement: `${match[1]}.${match[2]}`
      });
    }

    return translations;
  }

  translateTimeBritishToAmerican(text) {
    const translations = [];
    // Match time format like 12.30
    const regex = /\b(\d{1,2})\.(\d{2})\b/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      translations.push({
        start: match.index,
        end: match.index + match[0].length,
        original: match[0],
        replacement: `${match[1]}:${match[2]}`
      });
    }

    return translations;
  }

  applyTranslations(text, translations) {
    // Remove duplicate translations (same position)
    const uniqueTranslations = [];
    const positions = new Set();

    for (let trans of translations) {
      const key = `${trans.start}-${trans.end}`;
      if (!positions.has(key)) {
        positions.add(key);
        uniqueTranslations.push(trans);
      }
    }

    // Sort by start position (descending) to replace from end to start
    uniqueTranslations.sort((a, b) => b.start - a.start);

    let result = text;
    for (let trans of uniqueTranslations) {
      const before = result.substring(0, trans.start);
      const after = result.substring(trans.end);
      result = before + `<span class="highlight">${trans.replacement}</span>` + after;
    }

    return result;
  }

  reverseDict(dict) {
    const reversed = {};
    for (let [key, value] of Object.entries(dict)) {
      reversed[value] = key;
    }
    return reversed;
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

module.exports = Translator;
