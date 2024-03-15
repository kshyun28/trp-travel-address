const bs58check = require('bs58check')

function encodeTravelAddress(url) {
  const urlObj = new URL('https://' + url);
  const queryString = urlObj.search;

  if (!queryString.includes('t=i')) {
    throw new Error('missing query string "t=i"');
  }

  return `ta${bs58check.encode(Buffer.from(url))}`;
}

function decodeTravelAddress(ta) {
  ta = ta.replace('ta', '');
  return uint8ArrayToString(bs58check.decode(ta));
}

function uint8ArrayToString(uint8Array) {
  let decoder = new TextDecoder();
  return decoder.decode(uint8Array);
}

module.exports = {
  encodeTravelAddress,
  decodeTravelAddress
}