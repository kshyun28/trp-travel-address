const bs58check = require('bs58check');
const { 
  hasQueryString,
  hasUriScheme,
  dnsLookup,
  uint8ArrayToString 
} = require('./util');

/**
 * Encodes a TRP travel address.
 * @param {string} url 
 * @returns {string}
 */
async function encodeTravelAddress(url) {
  if (!url) {
    throw new Error('URL is required');
  }

  const urlObject = new URL('https://' + url);

  // Throws an error if the query string "t=i" is missing
  hasQueryString(urlObject);

  // Throws an error if the URI scheme is present
  hasUriScheme(url);

  // Throws an error if the TLD is unresolvable
  await dnsLookup(urlObject.hostname);

  const encodedTravelAddress = `ta${bs58check.encode(Buffer.from(url))}`;
  return encodedTravelAddress;
}

/**
 * Decodes a TRP travel address.
 * @param {string} ta 
 * @returns {string}
 */
async function decodeTravelAddress(ta) {
  if (!ta) {
    throw new Error('travel address is required');
  }

  if (!ta.startsWith('ta')) {
    throw new Error('missing "ta" prefix');
  }

  // Remove the "ta" prefix and decode the travel address
  ta = ta.replace('ta', '');
  const decodedTravelAddress = uint8ArrayToString(bs58check.decode(ta));

  // Throws an error if the URI scheme is present
  hasUriScheme(decodedTravelAddress);

  const urlObject = new URL('https://' + decodedTravelAddress);

  // Throws an error if the query string "t=i" is missing
  hasQueryString(urlObject);

  // Throws an error if the TLD is unresolvable
  await dnsLookup(urlObject.hostname);
  
  return decodedTravelAddress;
}

module.exports = {
  encodeTravelAddress,
  decodeTravelAddress
}
