import { AlphaRouter } from "@_etcswap/smart-order-router";
import { Token, CurrencyAmount, Percent } from "@uniswap/sdk-core";
import { parseUnits } from "@ethersproject/units";
import ethers from "ethers";
import JSBI from "jsbi";

const chainId = 61;

// https://github.com/etcswap/smart-order-router/blob/etcswap/test/integ/routers/alpha-router/alpha-router.integration.test.ts#L513
const alphaRouter = new AlphaRouter({
  chainId,
  provider: new ethers.providers.JsonRpcProvider("https://etc.rivet.link"),
});

const tokenIn = new Token(
  chainId,
  "0xDE093684c796204224BC081f937aa059D903c52a", // USC
  6,
  "USC",
  "USC"
);

const tokenOut = new Token(
  chainId,
  "0x1953cab0E5bFa6D4a9BaD6E05fD46C1CC6527a5a", // WETC
  18,
  "WETC",
  "WETC"
);

// https://github.com/etcswap/smart-order-router/blob/etcswap/src/util/amounts.ts#L14
function parseAmount(value, currency) {
  const typedValueParsed = parseUnits(value, currency.decimals).toString();
  return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));
}

// https://github.com/etcswap/smart-order-router/blob/etcswap/src/routers/alpha-router/config.ts#L67
const routingConfig = {
  v2PoolSelection: {
    topN: 3,
    topNDirectSwaps: 1,
    topNTokenInOut: 5,
    topNSecondHop: 2,
    topNWithEachBaseToken: 2,
    topNWithBaseToken: 6,
  },
  v3PoolSelection: {
    topN: 2,
    topNDirectSwaps: 2,
    topNTokenInOut: 3,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 5,
  },
  maxSwapsPerPath: 3,
  minSplits: 1,
  maxSplits: 7,
  distributionPercent: 5,
  forceCrossProtocol: false,
};

// https://github.com/etcswap/smart-order-router/blob/etcswap/test/integ/routers/alpha-router/alpha-router.integration.test.ts#L173
const ROUTING_CONFIG = {
  ...routingConfig,
  protocols: ["V3", "V2"],
};

// https://github.com/etcswap/smart-order-router/blob/66d83d254b03b36f6b5459b0f877f267b1682bab/src/routers/alpha-router/alpha-router.ts#L851
alphaRouter
  .route(
    parseAmount("1", tokenIn),
    tokenOut, // Change tokenIn to tokenOut here
    0,
    {
      type: 0,
      recipient: "0xdD4c825203f97984e7867F11eeCc813A036089D1",
      slippageTolerance: new Percent(10, 100), // 10% slippage tolerance
      deadlineOrPreviousBlockhash: Math.floor(Date.now() / 1000) + 100000,
    },
    {
      ...ROUTING_CONFIG,
    }
  )
  .then((route) => {
    console.log("ROUTE", route);
  })
  .catch((error) => {
    console.log("ERROR", error);
  });
