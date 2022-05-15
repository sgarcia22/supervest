const { expect } = require("chai");
const { ethers } = require("hardhat");

// MATIC
const TOKEN_ADDR_IN = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const AMOUNT_IN = 1;
const TOKEN_ADDR_OUT = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";

describe("Uniswap Functionality", function() {
    it("Should return amount out", async function () {
      const Swap = await ethers.getContractFactory("Swap");
      const swapContract = await Swap.deploy();
      const amountOut = await swapContract.swapExactInputSingle(TOKEN_ADDR_IN, AMOUNT_IN, TOKEN_ADDR_OUT);
      console.log("Done deal");
      console.log(amountOut);
      expect(amountOut).to.not.empty;
    });
});
