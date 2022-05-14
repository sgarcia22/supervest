import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { store } from "../store";

const INFURA_ID = "27e484dcd9e3efcfd25a83a78777cdf1";

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: INFURA_ID
        }
    }
};

// web3modal with WalletConnect
export async function connectWallet() {
    const web3Modal = new Web3Modal({
        network: "testnet",
        cacheProvider: true,
        providerOptions
    });
    
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    store.commit('changeWeb3ProviderValue', provider);
    return provider;

    // console.log(await provider.getSigner().getAddress());

    // const signer = provider.getSigner();
}

