const dns = require('dns');

/**
 * Throws an error if the query string "t=i" is missing.
 * @param {URL} urlObject 
 */
function hasQueryString(urlObject) {
  const queryString = urlObject.search;
  if (!queryString.includes('t=i')) {
    throw new Error('missing query string "t=i"');
  }
}

/**
 * Throws an error if the URI scheme is present.
 * @param {string} string 
 */
function hasUriScheme(string) {
  const regex = /^[a-z][a-z0-9+.-]*:\/\//i;
  if(regex.test(string)) {
    throw new Error('URI scheme presence');
  }
}

/**
 * Converts a Uint8Array to a string.
 * @param {Uint8Array} uint8Array 
 * @returns {string}
 */
function uint8ArrayToString(uint8Array) {
  const decoder = new TextDecoder();
  return decoder.decode(uint8Array);
}

/**
 * Throws an error if the TLD is unresolvable.
 * @param {string} hostname 
 * @returns {Promise<void>}
 */
function dnsLookup(hostname) {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (error, addresses) => {
      if (error || !addresses) {
        reject(new Error('unresolvable TLD'));
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  hasQueryString,
  hasUriScheme,
  uint8ArrayToString,
  dnsLookup
}
