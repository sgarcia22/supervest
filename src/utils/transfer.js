const { ethers } = require('ethers')
import { store } from "../store";
import { customHttpProvider } from "./config";

// I'm repeating this multiple times in different files, make it more globally accessible 
const WALLET_ADDRESS = process.env.VUE_APP_WALLET_ADDRESS;
const WALLET_SECRET = process.env.VUE_APP_WALLET_SECRET;
const INFURA_URL_POLYGON_MAINNET = process.env.VUE_APP_INFURA_POLYGON_URL;
const GAS_LIMIT = "0x100000";
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

    const curentGasPrice = await walletSigner.getGasPrice();
    const gasPrice = ethers.utils.hexlify(parseInt(curentGasPrice))

    // console.log(gas_price);
    // console.log(ethers.utils.parseEther(tokenAmount).toString());


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
        // nonce: walletSigner.getTransactionCount(WALLET_ADDRESS, "latest"),
        gasLimit: maxFee,//ethers.utils.hexlify(GAS_LIMIT), // 100000
        // gasPrice: gasPrice,
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

    // walletSigner.getGasPrice().then((currentGasPrice) => {
    //     let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice))
    //     console.log(`gas_price: ${gas_price}`)
    
    //     if (tokenAddress) {
    //       // general token send
    //       let contract = new ethers.Contract(
    //         tokenAddress,
    //         send_abi,
    //         walletSigner
    //       )
    
    //       // How many tokens?
    //       let numberOfTokens = ethers.utils.parseUnits(tokenAmount, 18)
    //       console.log(`numberOfTokens: ${numberOfTokens}`)
    
    //       // Send tokens
    //       contract.transfer(userAddress, numberOfTokens).then((transferResult) => {
    //         console.dir(transferResult)
    //         alert("sent token")
    //       })
    //     } // ether send
    //     else {
    //       const tx = {
    //         from: WALLET_ADDRESS,
    //         to: userAddress,
    //         value: ethers.utils.parseEther(tokenAmount),
    //         nonce: window.ethersProvider.getTransactionCount(
    //           WALLET_ADDRESS,
    //           "latest"
    //         ),
    //         gasLimit: ethers.utils.hexlify(gas_limit), // 100000
    //         gasPrice: gas_price,
    //       }
    //       console.dir(tx)
    //       try {
    //         walletSigner.sendTransaction(tx).then((transaction) => {
    //           console.dir(transaction)
    //           alert("Send finished!")
    //         })
    //       } catch (error) {
    //         alert("failed to send!!")
    //       }
    //     }
    //   })
    // Get current gas price
    // const curentGasPrice = await window.ethersProvider.getGasPrice();
    // const gas_price = ethers.utils.hexlify(parseInt(curentGasPrice))
    // // Define the transaction
    // const tx = {
    //     from: WALLET_ADDRESS,
    //     to: userAddress,
    //     value: ethers.utils.parseEther(tokenAmount),
    //     nonce: window.ethersProvider.getTransactionCount(WALLET_ADDRESS, "latest"),
    //     gasLimit: ethers.utils.hexlify(GAS_LIMIT), // 100000
    //     gasPrice: gas_price,
    // };
    // // Send the transaction
    // try {
    //     walletSigner.sendTransaction(tx).then((transaction) => {
    //       console.log(transaction)
    //       console.log("Transaction sent back to user")
    //     });
    // } catch (error) {
    //     console.log("Failed to send transaction back to user")
    // }
}