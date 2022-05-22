export const ethers = require("ethers");

// Ethers.js provider initialization with Polygon Mumbai
// export const url =
//   "https://rpc-mumbai.maticvigil.com/v1/01782d22fbaade856aefcdb92e317d8090ade43c";
export const url =
  "https://polygon-rpc.com";
// export const url =
//   "https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX";
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
