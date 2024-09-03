# Smart Order Router Test

## Install

```
npm install
node index.js
```

## Example Response

```JSON
{
  quote: CurrencyAmount {
    numerator: JSBI(2) [ 151029657, 52208410, sign: false ],
    denominator: JSBI(1) [ 1, sign: false ],
    currency: Token {
      chainId: 61,
      decimals: 18,
      symbol: 'WETC',
      name: 'WETC',
      isNative: false,
      isToken: true,
      address: '0x1953cab0E5bFa6D4a9BaD6E05fD46C1CC6527a5a',
      buyFeeBps: undefined,
      sellFeeBps: undefined
    },
    decimalScale: JSBI(2) [ 660865024, 931322574, sign: false ]
  },
  quoteGasAdjusted: CurrencyAmount {
    numerator: JSBI(2) [ 913868697, 52089200, sign: false ],
    denominator: JSBI(1) [ 1, sign: false ],
    currency: Token {
      chainId: 61,
      decimals: 18,
      symbol: 'WETC',
      name: 'WETC',
      isNative: false,
      isToken: true,
      address: '0x1953cab0E5bFa6D4a9BaD6E05fD46C1CC6527a5a',
      buyFeeBps: undefined,
      sellFeeBps: undefined
    },
    decimalScale: JSBI(2) [ 660865024, 931322574, sign: false ]
  },
  estimatedGasUsed: BigNumber { _hex: '0x01f400', _isBigNumber: true },
  estimatedGasUsedQuoteToken: CurrencyAmount {
    numerator: JSBI(2) [ 310902784, 119209, sign: false ],
    denominator: JSBI(1) [ 1, sign: false ],
    currency: Token {
      chainId: 61,
      decimals: 18,
      symbol: 'WETC',
      name: 'Wrapped Ether',
      isNative: false,
      isToken: true,
      address: '0x1953cab0E5bFa6D4a9BaD6E05fD46C1CC6527a5a',
      buyFeeBps: undefined,
      sellFeeBps: undefined
    },
    decimalScale: JSBI(2) [ 660865024, 931322574, sign: false ]
  },
  estimatedGasUsedUSD: CurrencyAmount {
    numerator: JSBI(1) [ 2280, sign: false ],
    denominator: JSBI(1) [ 1, sign: false ],
    currency: Token {
      chainId: 61,
      decimals: 6,
      symbol: 'USC',
      name: 'USC',
      isNative: false,
      isToken: true,
      address: '0xDE093684c796204224BC081f937aa059D903c52a',
      buyFeeBps: undefined,
      sellFeeBps: undefined
    },
    decimalScale: JSBI(1) [ 1000000, sign: false ]
  },
  gasPriceWei: BigNumber { _hex: '0x3b9aca00', _isBigNumber: true },
  route: [
    V3RouteWithValidQuote {
      protocol: 'V3',
      amount: [CurrencyAmount],
      rawQuote: [BigNumber],
      sqrtPriceX96AfterList: [Array],
      initializedTicksCrossedList: [Array],
      quoterGasEstimate: [BigNumber],
      quote: [CurrencyAmount],
      percent: 100,
      route: [V3Route],
      gasModel: [Object],
      quoteToken: [Token],
      tradeType: 0,
      gasCostInToken: [CurrencyAmount],
      gasCostInUSD: [CurrencyAmount],
      gasEstimate: [BigNumber],
      quoteAdjustedForGas: [CurrencyAmount],
      poolAddresses: [Array],
      tokenPath: [Array]
    }
  ],
  trade: Trade {
    swaps: [ [Object] ],
    routes: [ [RouteV3] ],
    tradeType: 0,
    _inputAmount: CurrencyAmount {
      numerator: [JSBI],
      denominator: [JSBI],
      currency: [Token],
      decimalScale: [JSBI]
    },
    _outputAmount: CurrencyAmount {
      numerator: [JSBI],
      denominator: [JSBI],
      currency: [Token],
      decimalScale: [JSBI]
    }
  },
  methodParameters: {
    calldata: '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000066d8cdf800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000100000000000000000000000000dd4c825203f97984e7867f11eecc813a036089d100000000000000000000000000000000000000000000000000000000000f424000000000000000000000000000000000000000000000000000b50dcbc25d928b00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002bde093684c796204224bc081f937aa059d903c52a0000641953cab0e5bfa6d4a9bad6e05fd46c1cc6527a5a000000000000000000000000000000000000000000',
    value: '0x00',
    to: '0x9b676E761040D60C6939dcf5f582c2A4B51025F1'
  },
  blockNumber: BigNumber { _hex: '0x013a959d', _isBigNumber: true }
}
```