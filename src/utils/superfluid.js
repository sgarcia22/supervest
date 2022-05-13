import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

const NETWORK_NAME = "mumbai";
const SUPER_TOKEN_NAME = "MATICx";
const SENDER_ADDR = "0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721";
// This is not my private key, it is a test one
const PRIVATE_KEY = "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1";

export async function createNewFlow(recipient, flowRate) {
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
    const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: flowRate,
        receiver: recipient,
        superToken: tokenx
        // userData?: string
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
        `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: ${NETWORK_NAME}
    Super Token: ${TOKEN_NAME}
    Sender: ${SENDER_ADDR}
    Receiver: ${recipient},
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

export async function updateExistingFlow(recipient, flowRate) {
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
        receiver: recipient,
        superToken: tokenx
        // userData?: string
      });
  
      console.log("Updating your stream...");
  
      const result = await updateFlowOperation.exec(signer);
      console.log(result);
  
      console.log(
        `Congrats - you've just updated a money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
      Network: ${NETWORK_NAME}
      Super Token: ${SUPER_TOKEN_NAME}
      Sender: ${SENDER_ADDR}
      Receiver: ${recipient},
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
