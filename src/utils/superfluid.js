import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { store } from "../store";

const NETWORK_NAME = "mumbai";
const SUPER_TOKEN_NAME = "MATICx";
// Middleware Wallet Mumbai Address
// Will perform the swap
const RECIPIENT = "0x8ac29b4a1f99E118E2f23F705507442C2F6Ba9d5";

export async function createNewFlow(flowRate) {
    const web3ModalProvider = store.state.web3Provider;
    const senderAddress = await web3ModalProvider.getSigner().getAddress();

    const sf = await Framework.create({
      networkName: NETWORK_NAME,
      provider: web3ModalProvider,
    });

    const signer = sf.createSigner({ web3Provider: web3ModalProvider });

    const tokenxContract = await sf.loadSuperToken(SUPER_TOKEN_NAME);
    const tokenx = tokenxContract.address;

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
          flowRate: flowRate,
          receiver: RECIPIENT,
          superToken: tokenx,
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
        `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${RECIPIENT}
    Network: ${NETWORK_NAME}
    Super Token: ${SUPER_TOKEN_NAME}
    Sender: ${senderAddress}
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
    const web3ModalProvider = store.state.web3Provider;
    const senderAddress = await web3ModalProvider.getSigner().getAddress();

    const sf = await Framework.create({
      networkName: NETWORK_NAME,
      provider: web3ModalProvider,
    });

    const signer = sf.createSigner({ web3Provider: web3ModalProvider });

    const tokenxContract = await sf.loadSuperToken(SUPER_TOKEN_NAME);
    const tokenx = tokenxContract.address;
  
    try {
      const updateFlowOperation = sf.cfaV1.updateFlow({
        flowRate: flowRate,
        receiver: RECIPIENT,
        superToken: tokenx
      });
  
      console.log("Updating your stream...");
  
      const result = await updateFlowOperation.exec(signer);
      console.log(result);
  
      console.log(
        `Congrats - you've just updated a money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${RECIPIENT}
      Network: ${NETWORK_NAME}
      Super Token: ${SUPER_TOKEN_NAME}
      Sender: ${senderAddress}
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
    const web3ModalProvider = store.state.web3Provider;
    const senderAddress = await web3ModalProvider.getSigner().getAddress();

    const sf = await Framework.create({
      networkName: NETWORK_NAME,
      provider: web3ModalProvider,
    });

    const signer = sf.createSigner({ web3Provider: web3ModalProvider });

    const tokenxContract = await sf.loadSuperToken(SUPER_TOKEN_NAME);
    const tokenx = tokenxContract.address;
  
    try {
      const deleteFlowOperation = sf.cfaV1.deleteFlow({
        sender: senderAddress,
        receiver: RECIPIENT,
        superToken: tokenx
      });
  
      console.log("Deleting your stream...");
  
      await deleteFlowOperation.exec(signer);
  
      console.log(
        `Congrats - you've just deleted your money stream!
         Network: ${NETWORK_NAME}
         Super Token: ${SUPER_TOKEN_NAME}
         Sender: ${senderAddress}
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
