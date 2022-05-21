const { expect } = require("chai");
const { ethers } = require("hardhat");

// MATIC
// const TOKEN_ADDR_IN = "0xd0A1E359811322d97991E03f863a0C30C2cF029C";
const TOKEN_ADDR_IN = "0xb685400156cF3CBE8725958DeAA61436727A30c3";
// in wei, 0.1 MATIC
const AMOUNT_IN = 1;
// WETH
const TOKEN_ADDR_OUT = "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747";
// const TOKEN_ADDR_OUT = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";

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
