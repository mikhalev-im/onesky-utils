const fs = require('fs');
const onesky = require('@brainly/onesky-utils');
require('dotenv').config();

const TARGET_DIR = './translations';

const ONESKY_PUBLIC_KEY = process.env.ONESKY_PUBLIC_KEY;
const ONESKY_SECRET_KEY = process.env.ONESKY_SECRET_KEY;

const ONESKY_PROJECT_ID = process.env.ONESKY_PROJECT_ID;
const ONESKY_FILE_NAME = process.env.ONESKY_FILE_NAME;

const ONESKY_OUTPUT_FORMAT = 'json';
const ONESKY_LANGUAGES = ['en', 'de', 'fr'];

/**
 * Sorts object keys alphabetically for consistency
 *
 * @param {object} unordered - unordered object
 */
function sortObject(unordered){
  if (!unordered || typeof unordered !== 'object'){
    return unordered;
  }

  const ordered = {};
  Object.keys(unordered)
    .sort()
    .forEach((key) => {
      ordered[key] = sortObject(unordered[key]);
    });

  return ordered;
}

/**
 * Imports translations for given language
 *
 * @param {string} language - language to import
 */
async function importOneLocale(language){
  // Fetch translations
  const data = await onesky.getFile({
    language,
    apiKey: ONESKY_PUBLIC_KEY,
    secret: ONESKY_SECRET_KEY,
    fileName: ONESKY_FILE_NAME,
    projectId: ONESKY_PROJECT_ID
  });

  // Sort entries
  const sorted = sortObject(JSON.parse(data));
  const content = JSON.stringify(sorted, null, 4);

  // Create target file
  fs.writeFileSync(`${TARGET_DIR}/${language}.${ONESKY_OUTPUT_FORMAT}`, content);
}

/**
 * Imports translations for all languagues
 */
async function importLanguages(){
  // Create target directory if it doesn't exist
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  // Fetch translations in a sequence to avoid hitting the Rate limit error
  for await (const language of ONESKY_LANGUAGES){
    try {
      await importOneLocale(language);
      console.log(`✓ Successfully Imported ${language} From Onesky`);
    } catch (err){
      console.log(`✕ Error importing ${language} From Onesky`);
      console.log(err);
    }
  }
}

importLanguages();

