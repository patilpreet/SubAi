/**
 * Script conversion utilities for "Three scripts from one take"
 *
 * Converts subtitle text between Roman Hinglish, Native (Devanagari),
 * and English translation scripts.
 *
 * Uses lookup-based approximation for common Hinglish → Devanagari mapping,
 * and a simple English translation map for common phrases.
 */

const HINGLISH_TO_DEVANAGARI = {
  bhai: "भाई",
  suno: "सुनो",
  yaar: "यार",
  hai: "है",
  nahi: "नहीं",
  karo: "करो",
  hain: "हैं",
  mera: "मेरा",
  tera: "तेरा",
  kya: "क्या",
  aaj: "आज",
  kal: "कल",
  bahut: "बहुत",
  accha: "अच्छा",
  theek: "ठीक",
  chalo: "चलो",
  dekho: "देखो",
  aap: "आप",
  tum: "तुम",
  main: "मैं",
  hum: "हम",
  kaise: "कैसे",
  kab: "कब",
  kahan: "कहाँ",
  kyun: "क्यों",
  kyuki: "क्योंकि",
  lekin: "लेकिन",
  aur: "और",
  toh: "तो",
  phir: "फिर",
  abhi: "अभी",
  wahi: "वही",
  samajh: "समझ",
  baat: "बात",
  kaam: "काम",
  din: "दिन",
  raat: "रात",
  saal: "साल",
  dost: "दोस्त",
  pyar: "प्यार",
  life: "लाइफ",
  game: "गेम",
  startup: "स्टार्टअप",
  hustle: "हसल",
  consistency: "कंसिस्टेंसी",
  push: "पुश",
  follow: "फॉलो",
  results: "रिजल्ट्स",
  video: "वीडियो",
  focus: "फोकस",
  content: "कंटेंट",
  creator: "क्रिएटर",
  time: "टाइम",
  moment: "मोमेंट",
  sirf: "सिर्फ",
  har: "हर",
  thoda: "थोड़ा",
  iske: "इसके",
  baare: "बारे",
  mein: "में",
  nehi: "नहीं",
  kar: "कर",
  sakte: "सकते",
  ho: "हो",
  sakta: "सकता",
  yeh: "यह",
  wo: "वो",
  ye: "ये",
  un: "उन",
  mujhe: "मुझे",
  tujhe: "तुझे",
  usko: "उसको",
  isko: "इसको",
  woh: "वो",
  kuch: "कुछ",
  sab: "सब",
  apna: "अपना",
  apni: "अपनी",
  mere: "मेरे",
  tere: "तेरे",
  uska: "उसका",
  iska: "इसका",
  magar: "मगर",
  ya: "या",
  par: "पर",
  se: "से",
  ke: "के",
  ki: "की",
  ka: "का",
  ko: "को",
  pe: "पे",
  ne: "ने",
  neeche: "नीचे",
  upar: "ऊपर",
  andar: "अंदर",
  bahar: "बाहर",
  sabhi: "सभी",
  koi: "कोई",
  kuch: "कुछ",
  ab: "अब",
  bas: "बस",
  bilkul: "बिल्कुल",
  thoda: "थोड़ा",
  jaldi: "जल्दी",
  der: "देर",
  raat: "रात",
  subah: "सुबह",
  dopahar: "दोपहर",
  sham: "शाम",
  din: "दिन",
  ghar: "घर",
  bahar: "बाहर",
  school: "स्कूल",
  college: "कॉलेज",
  padhai: "पढ़ाई",
  kaam: "काम",
  paisa: "पैसा",
  daulat: "दौलत",
  gareeb: "गरीब",
  ameer: "अमीर",
  saksham: "सक्षम",
  himmat: "हिम्मत",
  soch: "सोच",
  sapna: "सपना",
  safalta: "सफलता",
  haar: "हार",
  jeet: "जीत",
};

const HINGLISH_TO_ENGLISH = {
  bhai: "brother/dude",
  suno: "listen",
  yaar: "friend",
  hai: "is",
  nahi: "no/not",
  karo: "do",
  hain: "are",
  mera: "my",
  tera: "your",
  kya: "what",
  aaj: "today",
  kal: "yesterday/tomorrow",
  bahut: "very/much",
  accha: "good/okay",
  theek: "fine/alright",
  chalo: "let's go",
  dekho: "look/see",
  aap: "you (formal)",
  tum: "you (informal)",
  main: "I",
  hum: "we",
  kaise: "how",
  kab: "when",
  kahan: "where",
  kyun: "why",
  kyuki: "because",
  lekin: "but",
  aur: "and",
  toh: "so/then",
  phir: "then/again",
  abhi: "now/just now",
  wahi: "the same",
  samajh: "understand",
  baat: "thing/matter",
  kaam: "work",
  din: "day",
  raat: "night",
  saal: "year",
  dost: "friend",
  pyar: "love",
  sirf: "only/just",
  har: "every/each",
  thoda: "a little",
  iske: "of this",
  baare: "about",
  mein: "in",
  nehi: "no/not",
  kar: "do",
  sakte: "can",
  ho: "are/be",
  sakta: "can",
};

const DEVANAGARI_WORDS_MAP = {
  "लड़कियों": "ladkiyon",
  "लड़कियां": "ladkiyan",
  "लड़के": "ladke",
  "लोगों": "logon",
  "लोग": "log",
  "ऑप्शंस": "options",
  "ऑप्शन": "option",
  "वीडियो": "video",
  "स्टार्टअप": "startup",
  "कंटेंट": "content",
  "क्रिएटर": "creator",
  "टाइम": "time",
  "फोकस": "focus",
  "गेम": "game",
  "लाइफ": "life",
  "है": "hai",
  "हैं": "hain",
  "नहीं": "nahi",
  "करो": "karo",
  "सुनो": "suno",
  "भाई": "bhai",
  "यार": "yaar",
  "क्या": "kya",
  "बहुत": "bahut",
  "अच्छा": "accha",
  "ठीक": "theek",
  "चलो": "chalo",
  "देखो": "dekho",
  "आप": "aap",
  "तुम": "tum",
  "मैं": "main",
  "हम": "hum",
  "कैसे": "kaise",
  "कब": "kab",
  "कहाँ": "kahan",
  "क्यों": "kyun",
  "क्योंकि": "kyuki",
  "लेकिन": "lekin",
  "और": "aur",
  "तो": "toh",
  "फिर": "phir",
  "अभी": "abhi",
  "वही": "wahi",
  "बात": "baat",
  "काम": "kaam",
  "दिन": "din",
  "रात": "raat",
  "दोस्त": "dost",
  "प्यार": "pyar",
  "सिर्फ": "sirf",
  "हर": "har",
  "थोड़ा": "thoda",
  "इसके": "iske",
  "बारे": "baare",
  "में": "mein",
  "सकते": "sakte",
  "हो": "ho",
  "सकता": "sakta",
  "यह": "yeh",
  "वो": "woh",
  "ये": "ye",
  "उन": "un",
  "मुझे": "mujhe",
  "तुझे": "tujhe",
  "उसको": "usko",
  "इसको": "isko",
  "कुछ": "kuch",
  "सब": "sab",
  "अपना": "apna",
  "अपनी": "apni",
  "मेरे": "mere",
  "तेरे": "tere",
  "उसका": "uska",
  "इसका": "iska",
  "मगर": "magar",
  "या": "ya",
  "पर": "par",
  "से": "se",
  "के": "ke",
  "की": "ki",
  "का": "ka",
  "लिए": "liye",
  "था": "tha",
  "थी": "thi",
  "थे": "the",
  "होगा": "hoga",
  "होगी": "hogi",
  "होंगे": "honge",
};

const DEV_CHAR_MAP = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'an', 'अः': 'ah',
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'f', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
  'ड़': 'r', 'ढ़': 'rh', 'ज़': 'z', 'फ़': 'f', 'क़': 'q', 'ख़': 'kh', 'ग़': 'gh',
  'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ँ': 'n', '्': '', 'ः': 'h'
};

/**
 * Convert Devanagari text to Roman Hinglish.
 */
export function devanagariToHinglish(text) {
  if (!text) return "";
  let result = text;

  // Step 1: Replace whole dictionary words
  for (const [dev, hing] of Object.entries(DEVANAGARI_WORDS_MAP)) {
    result = result.split(dev).join(hing);
  }

  // Step 2: Character-by-character transliteration for remaining Devanagari characters
  let transliterated = "";
  const chars = Array.from(result);
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const nextCh = chars[i + 1];
    if (DEV_CHAR_MAP[ch] !== undefined) {
      let roman = DEV_CHAR_MAP[ch];
      // If consonant without matra or virama, add implicit 'a'
      const isConsonant = /[\u0915-\u0939\u0958-\u095F]/.test(ch);
      const isNextMatraOrVirama = /[\u093E-\u094D\u0962\u0963]/.test(nextCh || "");
      if (isConsonant && !isNextMatraOrVirama && nextCh && /[^\s\p{P}]/u.test(nextCh)) {
        roman += "a";
      }
      transliterated += roman;
    } else {
      transliterated += ch;
    }
  }

  return transliterated;
}

/**
 * Convert Roman Hinglish text to Devanagari script.
 * Falls back to original word for unknown terms.
 */
export function hinglishToDevanagari(text) {
  let result = text;
  for (const [key, val] of Object.entries(HINGLISH_TO_DEVANAGARI)) {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    result = result.replace(regex, val);
  }
  return result;
}

/**
 * Convert Roman Hinglish text to English translation.
 */
export function hinglishToEnglish(text) {
  let result = text;
  for (const [key, val] of Object.entries(HINGLISH_TO_ENGLISH)) {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    result = result.replace(regex, val);
  }
  return result;
}

/**
 * Capitalize first letter of each segment
 */
export function capitalizeSegment(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert subtitles to a different script.
 * @param {Array} subtitles - Array of {id, start, end, text}
 * @param {string} script - "roman" | "native" | "english"
 */
export function convertSubtitles(subtitles, script) {
  if (!Array.isArray(subtitles)) return [];
  return subtitles.map((s) => {
    let newText = s.text;
    if (script === "roman") {
      // If text contains Devanagari script, transliterate to Roman Hinglish
      if (/[\u0900-\u097F]/.test(s.text)) {
        newText = devanagariToHinglish(s.text);
      }
    } else if (script === "native") {
      newText = hinglishToDevanagari(s.text);
    } else if (script === "english") {
      newText = hinglishToEnglish(s.text);
    }
    return { ...s, text: capitalizeSegment(newText) };
  });
}
