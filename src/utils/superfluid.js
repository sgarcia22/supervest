import { customHttpProvider } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export async function createNewFlow(recipient, flowRate) {
    const sf = await Framework.create({
    networkName: "mumbai",
    provider: customHttpProvider
    });

    const signer = sf.createSigner({
    privateKey:
        "0xd2ebfb1517ee73c4bd3d209530a7e1c25352542843077109ae77a2c0213375f1",
    provider: customHttpProvider
    });

    const MATICxContract = await sf.loadSuperToken("MATICx");
    const MATICx = MATICxContract.address;

    try {
    const createFlowOperation = sf.cfaV1.createFlow({
        flowRate: flowRate,
        receiver: recipient,
        superToken: MATICx
        // userData?: string
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
        `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: MATIC
    Super Token: MATICx
    Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
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
