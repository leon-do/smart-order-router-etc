import { SwapRouter } from "@_etcswap/router-sdk";
import { Route as V2Route, Trade as V2Trade, Pair } from "@_etcswap/v2-sdk";
import {
  Trade as V3Trade,
  Route as V3Route,
  FeeAmount,
  Pool,
  nearestUsableTick,
  TickMath,
  TICK_SPACINGS,
  encodeSqrtRatioX96,
} from "@_etcswap/v3-sdk";
import {
  BigintIsh,
  CurrencyAmount,
  Percent,
  Token,
  TradeType,
} from "@_etcswap/sdk-core";
import JSBI from "jsbi";

(async () => {
  const chainId = 61;

  const token0 = new Token(
    chainId,
    "0xDE093684c796204224BC081f937aa059D903c52a",
    6,
    "USC",
    "USC"
  );
  const token1 = new Token(
    chainId,
    "0x1953cab0E5bFa6D4a9BaD6E05fD46C1CC6527a5a",
    18,
    "WETC",
    "WETC"
  );

  const liquidity = 1000000;

  // https://github.com/etcswap/router-sdk/blob/8c9ff06cedb9dc5b7cfc3ec71b0de8edfb19f5fa/src/swapRouter.test.ts#L56
  const pair_0_1 = makePair(token0, token1, liquidity.toString());
  const pool_0_1 = makePool(token0, token1, Number(liquidity));

  // https://github.com/etcswap/router-sdk/blob/8c9ff06cedb9dc5b7cfc3ec71b0de8edfb19f5fa/src/swapRouter.test.ts#L74
  const amountv2 = CurrencyAmount.fromRawAmount(token0, JSBI.BigInt(100));
  const amountv3 = CurrencyAmount.fromRawAmount(token0, JSBI.BigInt(1000));
  const amountIn = amountv2.add(amountv3);

  const v2Trade = V2Trade.exactIn(
    new V2Route([pair_0_1], token0, token1),
    amountIn
  );
  const v3Trade = V3Trade.fromRoute(
    new V3Route([pool_0_1], token0, token1),
    amountIn,
    TradeType.EXACT_INPUT
  );

  // https://github.com/etcswap/router-sdk/blob/8c9ff06cedb9dc5b7cfc3ec71b0de8edfb19f5fa/src/swapRouter.test.ts#L80
  const trades = [v2Trade, await v3Trade];

  // https://github.com/etcswap/router-sdk/blob/8c9ff06cedb9dc5b7cfc3ec71b0de8edfb19f5fa/src/swapRouter.test.ts#L81
  const { calldata, value } = SwapRouter.swapCallParameters(trades, {
    slippageTolerance: new Percent(50, 10_000), // 0.5% slippage tolerance
    recipient: "0xdD4c825203f97984e7867F11eeCc813A036089D1", // Replace with actual recipient address
    deadlineOrPreviousBlockhash: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
  });

  console.log({ calldata, value });
})();

function makePool(token0: Token, token1: Token, liquidity: number) {
  const sqrtRatioX96 = encodeSqrtRatioX96(1, 1); // Assuming 1:1 price ratio
  return new Pool(
    token0,
    token1,
    FeeAmount.MEDIUM,
    sqrtRatioX96,
    liquidity,
    0, // Default tick value
    [
      {
        index: nearestUsableTick(
          TickMath.MIN_TICK,
          TICK_SPACINGS[FeeAmount.MEDIUM]
        ),
        liquidityNet: liquidity,
        liquidityGross: liquidity,
      },
      {
        index: nearestUsableTick(
          TickMath.MAX_TICK,
          TICK_SPACINGS[FeeAmount.MEDIUM]
        ),
        liquidityNet: -liquidity,
        liquidityGross: liquidity,
      },
    ]
  );
}

function makePair(token0: Token, token1: Token, liquidity: BigintIsh) {
  const amount0 = CurrencyAmount.fromRawAmount(token0, JSBI.BigInt(liquidity));
  const amount1 = CurrencyAmount.fromRawAmount(token1, JSBI.BigInt(liquidity));
  return new Pair(amount0, amount1);
}
