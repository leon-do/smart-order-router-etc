import { AlphaRouter } from "@_etcswap/smart-order-router";
import { Token, CurrencyAmount, Percent } from "@uniswap/sdk-core";
import { parseUnits } from "@ethersproject/units";
import ethers from "ethers";
import JSBI from "jsbi";

const chainId = 1; // 61

const alphaRouter = new AlphaRouter({
  chainId, // 61
  provider: new ethers.providers.JsonRpcProvider(
    "https://ethereum-rpc.publicnode.com" // https://etc.rivet.link
  ),
});

const tokenIn = new Token(
  chainId, // 16
  "0x514910771af9ca656af840dff83e8264ecf986ca", // 0xDE093684c796204224BC081f937aa059D903c52a
  18, // 6
  "LINK", // USC
  "LINK" // USC
);

// Add the output token (e.g., WETH)
const tokenOut = new Token(
  chainId, // 16
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // 0x1953cab0E5bFa6D4a9BaD6E05fD46C1CC6527a5a
  18,
  "WETH", // WETC
  "Wrapped Ether"
);

function parseAmount(value, currency) {
  const typedValueParsed = parseUnits(value, currency.decimals).toString();
  return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));
}

const amount = parseAmount("1", tokenIn);

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

const ROUTING_CONFIG = {
  ...routingConfig,
  protocols: ["V3", "V2"],
};

main();
async function main() {
  const swap = await alphaRouter.route(
    amount,
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
  );

  console.log('-==-=--==-=-', swap);
}
