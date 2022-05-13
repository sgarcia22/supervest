export const Framework = require("@superfluid-finance/sdk-core");
export const ethers = require("ethers");

// Ethers.js provider initialization with Polygon Mumbai
export const url =
  "https://rpc-mumbai.maticvigil.com/v1/01782d22fbaade856aefcdb92e317d8090ade43c";
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
