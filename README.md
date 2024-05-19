# trp-travel-address

Utility for encoding and decoding a travel address based on the [Travel Rule Protocol (TRP)](https://www.openvasp.org/trp).

## Install

`npm i --save trp-travel-address`

## Usage

**encodeTravelAddress(url)**

```js
const { encodeTravelAddress } = require("trp-travel-address");

const url = "beneficiary.com/x/12345?t=i";
const ta = encodeTravelAddress(url);
console.log(ta);
// ta2W2HPKfHxgSgrzY178knqXHg1H3jfeQrwQ9JrKBs9wv
```

**decodeTravelAddress(ta)**

```js
const { decodeTravelAddress } = require("trp-travel-address");

const ta = "ta2W2HPKfHxgSgrzY178knqXHg1H3jfeQrwQ9JrKBs9wv";
const url = decodeTravelAddress(ta);
console.log(url);
// beneficiary.com/x/12345?t=i
```

## References

- [Travel Rule Protocol (TRP): Travel Address](https://gitlab.com/OpenVASP/travel-rule-protocol/-/blob/master/core/specification.md?ref_type=heads#travel-address)
