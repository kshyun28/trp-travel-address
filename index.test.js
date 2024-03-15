const { encodeTravelAddress, decodeTravelAddress } = require('./index');

describe('encodeTravelAddress', () => {
  test('valid input', () => {
    expect(encodeTravelAddress('beneficiary.com/x/12345?t=i')).toBe('ta2W2HPKfHxgSgrzY178knqXHg1H3jfeQrwQ9JrKBs9wv');
  });

  test('missing query string', () => {
    expect(() => encodeTravelAddress('beneficiary.com/x/12345')).toThrow();
  });
});

describe('decodeTravelAddress', () => {
  test('valid input', () => {
    expect(decodeTravelAddress('ta2W2HPKfHxgSgrzY178knqXHg1H3jfeQrwQ9JrKBs9wv')).toBe('beneficiary.com/x/12345?t=i');
  });
});