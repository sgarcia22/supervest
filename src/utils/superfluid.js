import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { store } from "../store";
import { customHttpProvider } from "./config";
import { performSwap } from './swap';
import { getDate } from './helpers';

const NETWORK_NAME = "mumbai";
const SUPER_TOKEN_NAME = "MATICx";
// Middleware Wallet Mumbai Address
// Will perform the swap
const RECIPIENT = "0x8ac29b4a1f99E118E2f23F705507442C2F6Ba9d5";

export async function createNewFlow(fromToken = "fUSDC", toToken = SUPER_TOKEN_NAME, flowRate) {
    const web3ModalProvider = store.state.web3Provider;
    const senderAddress = await web3ModalProvider.getSigner().getAddress();

    const sf = await Framework.create({
      networkName: NETWORK_NAME,
      provider: web3ModalProvider,
    });

    const signer = sf.createSigner({ web3Provider: web3ModalProvider });

    const tokenxContract = await sf.loadSuperToken(fromToken);
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
      Super Token: ${fromToken}
      Sender: ${senderAddress}
      Receiver: ${RECIPIENT},
      FlowRate: ${flowRate}
      `
      );

      store.commit('addStream',  {
          transaction: fromToken,
          superToken: fromToken,
          datetime: getDate(),
          flowRate: `${flowRate}/month`,
          statusTransaction: "progress",
          },
        );

      // Start process to swap tokens continuously
        // await performSwap();
      // Send swapped amount back to original wallet
          

    } catch (error) {
    console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
    }
}


export async function updateExistingFlow(tokenType, flowRate) {
    const web3ModalProvider = store.state.web3Provider;
    const senderAddress = await web3ModalProvider.getSigner().getAddress();

    const sf = await Framework.create({
      networkName: NETWORK_NAME,
      provider: web3ModalProvider,
    });

    const signer = sf.createSigner({ web3Provider: web3ModalProvider });

    const tokenxContract = await sf.loadSuperToken(tokenType);
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
      Super Token: ${tokenType}
      Sender: ${senderAddress}
      Receiver: ${RECIPIENT},
      New FlowRate: ${flowRate}
      `
      );

      // Update Vue store
      store.commit('alterStream',  {
        transaction: tokenType,
        superToken: tokenType,
        datetime: store.state.streams.findIndex(obj => obj.transaction === tokenType).datetime,
        flowRate: `${flowRate}/month`,
        statusTransaction: "progress",
        },
      );
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
}

export async function deleteFlow(tokenType) {
    const web3ModalProvider = store.state.web3Provider;
    const senderAddress = await web3ModalProvider.getSigner().getAddress();

    const sf = await Framework.create({
      networkName: NETWORK_NAME,
      provider: web3ModalProvider,
    });

    const signer = sf.createSigner({ web3Provider: web3ModalProvider });

    const tokenxContract = await sf.loadSuperToken(tokenType);
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
         Super Token: ${tokenType}
         Sender: ${senderAddress}
         Receiver: ${RECIPIENT}
      `
      );


      const storedTransaction = store.state.streams.findIndex(obj => obj.transaction === tokenType);
      // Update Vue store
      store.commit('alterStream',  {
        transaction: tokenType,
        superToken: tokenType,
        datetime: storedTransaction.datetime,
        flowRate: storedTransaction.flowRate,
        statusTransaction: "cancelled",
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

// function calculateFlowRate(amountInDollars) {
//     if (typeof Number(amountInDollars) !== "number" || isNaN(Number(amountInDollars)) === true) {
//         alert("You can only calculate a flowRate based on a number");
//         return;
//     } else if (typeof Number(amountInDollars) === "number") {
//         if (Number(amountInDollars) === 0) {
//         return 0;
//         }
//         const amountInWei = ethers.BigNumber.from(amountInDollars);
//         const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
//         const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
//         return calculatedFlowRate;
//     }
// }
