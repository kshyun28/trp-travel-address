const { encodeTravelAddress, decodeTravelAddress } = require('./index');

describe('encodeTravelAddress', () => {
  test('valid input', async () => {
    await expect(encodeTravelAddress('beneficiary.com/x/12345?t=i'))
      .resolves
      .toBe('ta2W2HPKfHxgSgrzY178knqXHg1H3jfeQrwQ9JrKBs9wv');
  });

  test('empty URL', async () => {
    await expect(() => encodeTravelAddress())
      .rejects
      .toThrow('URL is required');
  });

  test('missing query string "t=i"', async () => {
    await expect(() => encodeTravelAddress('beneficiary.com/x/12345'))
      .rejects
      .toThrow('missing query string "t=i"');
  });

  test('URI scheme presence', async () => {
    await expect(() => encodeTravelAddress('https://beneficiary.com/x/12345?t=i'))
      .rejects
      .toThrow('URI scheme presence');
  });

  test('unresolvable TLD', async () => {
    await expect(() => encodeTravelAddress('beneficiary/x/12345?t=i'))
      .rejects
      .toThrow('unresolvable TLD');
  });
});

describe('decodeTravelAddress', () => {
  test('valid input', async () => {
    await expect(decodeTravelAddress('ta2W2HPKfHxgSgrzY178knqXHg1H3jfeQrwQ9JrKBs9wv'))
      .resolves
      .toBe('beneficiary.com/x/12345?t=i');
  });

  test('empty travel address', async () => {
    await expect(() => decodeTravelAddress())
      .rejects
      .toThrow('travel address is required');
  });

  test('missing "ta" prefix', async () => {
    await expect(() => decodeTravelAddress('2W2HPKfHxgSgrzY178knqXHg1H3jfeQrwQ9JrKBs9wv`'))
      .rejects
      .toThrow('missing "ta" prefix');
  });

  test('missing query string "t=i"', async () => {
    await expect(() => decodeTravelAddress('taEJKtAQyrS5x6i59GBS2fcbcUxoR14dYiW9cZu'))
      .rejects
      .toThrow('missing query string "t=i"');
  });

  test('URI scheme presence', async () => {
    await expect(() => decodeTravelAddress('ta2BCfkBRHmbhyZuKHmEdHpypmo7HG4RJVgaWYR4LkKGLyAtJQkDtJrK'))
      .rejects
      .toThrow('URI scheme presence');
  });

  test('unresolvable TLD', async () => {
    await expect(() => decodeTravelAddress('taEJKtAQyrS5x6i59GKB6iMPx1iDzs8HXGNhbk1'))
      .rejects
      .toThrow('unresolvable TLD');
  });
});