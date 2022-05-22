const { ethers } = require('ethers')
import { store } from "../store";
import { customHttpProvider } from "./config";

// I'm repeating this multiple times in different files, make it more globally accessible 
const WALLET_ADDRESS = process.env.VUE_APP_WALLET_ADDRESS;
const WALLET_SECRET = process.env.VUE_APP_WALLET_SECRET;
const provider = customHttpProvider; 
const MATIC_TOKEN_ADDR = "0x0000000000000000000000000000000000001010";

export async function transferTokensBack(tokenAmount, tokenAddress = MATIC_TOKEN_ADDR) {
    // User wallet
    const web3ModalProvider = store.state.web3Provider;
    const userAddress = await web3ModalProvider.getSigner().getAddress();

    // Connect to swap wallet
    const wallet = new ethers.Wallet(WALLET_SECRET);
    // Connect the wallet to the provider
    const walletSigner = wallet.connect(provider);

    // Get Polygon recommended gas fees
    let maxFee;
    fetch('https://gasstation-mainnet.matic.network/v2')
    .then(response => response.json())
    .then(json => {
        maxFee = json.standard.maxFee;
        console.log(json)
    });

    const tx = {
        chainId: 137, // polygon mainnet
        from: WALLET_ADDRESS,
        to: userAddress,
        value: ethers.utils.parseEther(tokenAmount),
        gasLimit: maxFee,
    };
    // Send the transaction
    try {
        walletSigner.sendTransaction(tx).then((transaction) => {
          console.log(transaction)
          console.log("Transaction sent back to user")
        });
    } catch (error) {
        console.log("Failed to send transaction back to user")
    }

}