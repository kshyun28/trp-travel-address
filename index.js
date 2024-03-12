const bs58check = require('bs58check')

function encodeTravelAddress(url) {
  url = url.replace('https://', '');
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