import { ethers } from "ethers";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { store } from "../store";

const TESTNET = "testnet";
const MAINNET = "mainnet"; // WalletConnect doesn't work with testnet

const INFURA_ID = "27e484dcd9e3efcfd25a83a78777cdf1";

const providerOptions = {
    coinbasewallet: {
        package: CoinbaseWalletSDK, 
        options: {
          appName: "Web 3 Modal Demo",
          infuraId: process.env.INFURA_KEY 
        }
    },
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: INFURA_ID
        }
    }
};

const web3Modal = new Web3Modal({
    network: TESTNET,
    cacheProvider: true,
    providerOptions
});


// web3modal with WalletConnect
export async function connectWallet() {
    await web3Modal.clearCachedProvider();
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    store.commit('changeWeb3ProviderValue', provider);
    return provider;

    // console.log(await provider.getSigner().getAddress());

    // const signer = provider.getSigner();
}

export async function clearWallet() {
    console.log(await web3Modal.clearCachedProvider());
    store.commit('changeWeb3ProviderValue', null);
}
