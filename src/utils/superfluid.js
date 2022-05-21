import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { store } from "../store";
import Web3Modal from "web3modal";

const NETWORK_NAME = "mumbai";
const SUPER_TOKEN_NAME = "MATICx";
// const SENDER_ADDR = "0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721";
// This is not my private key, it is a test one
// const PRIVATE_KEY = "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1";

// Middleware Wallet Kovan ETH Address
// Will perform the swap
const RECIPIENT = "0x8ac29b4a1f99E118E2f23F705507442C2F6Ba9d5";

export async function createNewFlow(flowRate) {
    // const web3Provider = store.state.web3Provider;

    // const mmProvider = new ethers.providers.Web3Provider(window.ethereum);
    // const mmSf = await Framework.create({
    //   networkName: "matic",
    //   provider: mmProvider
    // });

    // const sf = await Framework.create({
    //   networkName: NETWORK_NAME,
    //   provider: web3Provider
    // });
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {}
    });

    const web3ModalRawProvider = await web3Modal.connect();
    const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalRawProvider, "any");

    const sf = await Framework.create({
      networkName: "mumbai",
      provider: web3ModalProvider,
    });

    const signer = sf.createSigner({ web3Provider: web3ModalProvider });

    console.log("hello");

    // const signer = sf.createSigner({
    //   web3Provider: web3Provider
    // });

    const tokenxContract = await sf.loadSuperToken(SUPER_TOKEN_NAME);
    const tokenx = tokenxContract.address;

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
          flowRate: flowRate,
          receiver: RECIPIENT,
          superToken: tokenx,
          // userData?: string
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
        `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${RECIPIENT}
    Network: ${NETWORK_NAME}
    Super Token: ${SUPER_TOKEN_NAME}
    Sender: ${await web3ModalProvider.getSigner().getAddress()}
    Receiver: ${RECIPIENT},
    FlowRate: ${flowRate}
    `
    );
    } catch (error) {
    console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
    }
}

export async function updateExistingFlow(flowRate) {
    const sf = await Framework.create({
      networkName: NETWORK_NAME,
      provider: customHttpProvider
    });
  
    const signer = sf.createSigner({
      privateKey:
        PRIVATE_KEY,
      provider: customHttpProvider
    });
  
    const tokenxContract = await sf.loadSuperToken(SUPER_TOKEN_NAME);
    const tokenx = tokenxContract.address;
  
    try {
      const updateFlowOperation = sf.cfaV1.updateFlow({
        flowRate: flowRate,
        receiver: RECIPIENT,
        superToken: tokenx
        // userData?: string
      });
  
      console.log("Updating your stream...");
  
      const result = await updateFlowOperation.exec(signer);
      console.log(result);
  
      console.log(
        `Congrats - you've just updated a money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${RECIPIENT}
      Network: ${NETWORK_NAME}
      Super Token: ${SUPER_TOKEN_NAME}
      Sender: ${SENDER_ADDR}
      Receiver: ${RECIPIENT},
      New FlowRate: ${flowRate}
      `
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
}

export async function deleteFlow() {
    const sf = await Framework.create({
      networkName: NETWORK_NAME,
      provider: customHttpProvider
    });
  
    const signer = sf.createSigner({
      privateKey:
        PRIVATE_KEY,
      provider: customHttpProvider
    });
  
    const tokenxContract = await sf.loadSuperToken(SUPER_TOKEN_NAME);
    const tokenx = tokenxContract.address;
  
    try {
      const deleteFlowOperation = sf.cfaV1.deleteFlow({
        sender: SENDER_ADDR,
        receiver: RECIPIENT,
        superToken: tokenx
        // userData?: string
      });
  
      console.log("Deleting your stream...");
  
      await deleteFlowOperation.exec(signer);
  
      console.log(
        `Congrats - you've just deleted your money stream!
         Network: ${NETWORK_NAME}
         Super Token: ${SUPER_TOKEN_NAME}
         Sender: ${SENDER_ADDR}
         Receiver: ${RECIPIENT}
      `
      );
    } catch (error) {
      console.error(error);
    }
  }

function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
        alert("You can only calculate a flowRate based on a number");
        return;
    } else if (typeof Number(amount) === "number") {
        if (Number(amount) === 0) {
        return 0;
        }
        const amountInWei = ethers.BigNumber.from(amount);
        const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
        const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
        return calculatedFlowRate;
    }
}
