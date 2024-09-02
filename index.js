import { AlphaRouter } from "@uniswap/smart-order-router";
import { Token, CurrencyAmount, Percent } from "@uniswap/sdk-core";
import { parseUnits } from "@ethersproject/units";
import ethers from "ethers";
import JSBI from "jsbi";

const alphaRouter = new AlphaRouter({
  chainId: 1,
  provider: new ethers.providers.JsonRpcProvider(
    "https://ethereum-rpc.publicnode.com"
  ),
});

const tokenIn = new Token(
  1,
  "0x514910771af9ca656af840dff83e8264ecf986ca",
  18,
  "LINK",
  "LINK"
);

// Add the output token (e.g., WETH)
const tokenOut = new Token(
  1,
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  18,
  "WETH",
  "Wrapped Ether"
);

function parseAmount(value, currency) {
  const typedValueParsed = parseUnits(value, currency.decimals).toString();
  return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));
}

const amount = parseAmount("100", tokenIn);

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
