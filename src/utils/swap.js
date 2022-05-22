const { ethers } = require('ethers')
const  { abi: IUniswapV3PoolABI } = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json');
const { abi: SwapRouterABI} = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json')
const { getPoolImmutables, getPoolState } = require('./helpers');
const ERC20ABI = require('./abi.json');
import { customHttpProvider } from "./config";
import { store } from "../store";

// require('dotenv').config();
const INFURA_URL_TESTNET = process.env.VUE_APP_INFURA_URL_TESTNET;
const WALLET_ADDRESS = process.env.VUE_APP_WALLET_ADDRESS;
const WALLET_SECRET = process.env.VUE_APP_WALLET_SECRET;

// Blockchain provider
const provider = customHttpProvider; // polygon
// Wrapped ETH to Uniswap Pool Address
// const poolAddress = "0x4D7C363DED4B3b4e1F954494d2Bc3955e49699cC" // UNI/WETH
const poolAddress = "0xA374094527e1673A86dE625aa59517c5dE346d32" // MATIC / USDC
// Deployed Uniswap Swap Router to actually make the swap
const swapRouterAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'

// Information for wrapped ether token
// const name0 = 'USDC'
const symbol0 = 'USDC'
const decimals0 = 18
const address0 = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'

// Information for Uniswap token
// const name1 = 'MATIC'
const symbol1 = 'MATIC'
const decimals1 = 18
const address1 = '0x0000000000000000000000000000000000001010'

// Perform swap between two tokens using Uniswap API
export async function performSwap(flowRate) {
  console.log("Swap being Called " + flowRate);

  // Initialize contract for the pool
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );

  // Query pool to grab immutable variables from it
  const immutables = await getPoolImmutables(poolContract);

  // Query pool to grab mutable variables from it, such as the current price
  // const state = await getPoolState(poolContract);

  // Connect to swap wallet
  const wallet = new ethers.Wallet(WALLET_SECRET);
  // Connect the wallet to the provider
  const connectedWallet = wallet.connect(provider);

  // Initialize contract for the swap contract
  const swapRouterContract = new ethers.Contract(
    swapRouterAddress,
    SwapRouterABI,
    provider
  );

  // const inputAmount = 0.001;
  const inputAmount = flowRate * 10;
  // Convert to amount that Uniswap expects, first 18 numbers represents decimals.
  // Shift decimal over 18 times
  // .001 => 1 000 000 000 000 000
  const amountIn = ethers.utils.parseUnits(
    inputAmount.toString(),
    decimals0
  );

  // Contract on wrapped ether to give Uniswap permission to access ether in our wallet
  // TODO: Multiply by 100000 to give Uniswap unlimited access to ether in wallet, ONLY FOR TESTNET
  const approvalAmount = (amountIn * 100000).toString();
  // The token contract that will approve our spending amount with Uniswap API
  const tokenContract0 = new ethers.Contract(
    address0,
    ERC20ABI,
    provider
  );

  await tokenContract0.connect(connectedWallet).approve(
    swapRouterAddress,
    approvalAmount
  );

  // Objet that represents details regarding our transaction
  const params = {
    tokenIn: immutables.token1,
    tokenOut: immutables.token0,
    fee: immutables.fee,
    recipient: WALLET_ADDRESS,
    deadline: Math.floor(Date.now() / 1000) + (60 * 10),
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  }

  // Perform the swap with the exact input that we want to spend
  swapRouterContract.connect(connectedWallet).exactInputSingle(
    params,
    {
      gasLimit: ethers.utils.hexlify(1000000)
    }
  ).then(transaction => {
    console.log(transaction)
  });

}