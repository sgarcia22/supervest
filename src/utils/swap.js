import axios from "axios";
import { store } from "../store";

const FROM_CHAIN = "mumbai";
const FROM_CHAIN_ID = 80001;
const TO_CHAIN = "kovan";
const TO_CHAIN_ID =  42;
const FROM_TOKEN = "MATIC";
const TO_TOKEN = "ETH";
const FROM_TOKEN_ADDR = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";
// Token address on the destination chain. This is only required in case of transfer between EVM and non-EVM chains
const TO_TOKEN_ADDR = "";
// Amount in minimal divisible unit (wei)
const TOKEN_AMOUNT = 10000000;
// const FROM_USER_ADDR = "0xEC0c6441cAc4EBC8d9CD12dF6FFB19829e9c427A";
const BRIDGE = "nxtp";

// Use SWING API to do a cross-chain swap
export async function performSwap() {
    // Compare quote from different bridges and find the best price
    // const getQuoteOptions = {
    //     method: 'GET',
    //     url: 'https://swap.dev.swing.xyz/v0/transfer/quote',
    //     params: {
    //         tokenSymbol: 'ETH',
    //         fromChain: FROM_CHAIN,
    //         toChain: TO_CHAIN
    //     },
    //     headers: {'Content-Type': 'application/json'}
    //   };
      
    //   axios.request(getQuoteOptions).then(function (response) {
    //     console.log(response.data);
    //   }).catch(function (error) {
    //     console.error(error);
    //   });

    const userAddr = await store.state.web3ProvidergetSigner().getAddress();

    // Send transfer request to bridge contract based on the route computed by getQuote api
    let txId;
    const sendCrosschainSwapOptions = {
        method: 'POST',
        url: 'https://swap.dev.swing.xyz/v0/transfer/send',
        headers: {'Content-Type': 'application/json'},
        data: {
          tokenSymbol: FROM_TOKEN,
          toTokenSymbol: TO_TOKEN,
          fromTokenAddress: FROM_TOKEN_ADDR,
          tokenAmount: TOKEN_AMOUNT,
          fromUserAddress: userAddr,
          fromChain: FROM_CHAIN,
          fromChainId: FROM_CHAIN_ID,
          toChain: TO_CHAIN,
          toChainId: TO_CHAIN_ID,
          route: [
                {
                    bridge: BRIDGE, 
                    bridgeTokenAddress: '',
                    name: FROM_TOKEN, 
                    part: 100
                }
            ]
        }
      };
      
    await axios.request(sendCrosschainSwapOptions).then(function (response) {
        console.log("Send Crosschain Swap Options Response");
        console.log(response.data);
        txId = response.data.tx.txId;
    }).catch(function (error) {
        console.error(error);
    });

      console.log("Next option");

    // [NXTP Only] Genereate signature which is required in the NXTP claim request
    const signOptions = {
        method: 'POST',
        url: 'https://swap.dev.swing.xyz/v0/transfer/sign',
        headers: {'Content-Type': 'application/json'},
        data: {
          bridge: BRIDGE,
          txId: txId,
          userAddress: userAddr
        }
      };
    
    await axios.request(signOptions).then(function (response) {
        console.log("Sign Response");
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    // // Claim Crosschain Swap 

    // const claimCrosschainSwapOptions = {
    //     method: 'POST',
    //     url: 'https://swap.dev.swing.xyz/v0/transfer/claim',
    //     headers: {'Content-Type': 'application/json'},
    //     data: {
    //         fromChain: {
    //             chainId: '250', 
    //             slug: 'fantom'
    //         },
    //         toChain: {
    //             chainId: '1285', 
    //             slug: 'moonriver'
    //         },
    //         bridge: 'nxtp',
    //         txId: '0x47a83956ba8b7c6d99b1a4bf8c90177c8efbe5e51129c01961a6fc5f6956ef05',
    //         userAddress: '0x54BEec0EB7F2192CA4BEB4649eEbde71dCb8eB36',
    //         signature: '0xd1745195f41168ca0984f97b1bc5fb6638616f1b2445bfee505a620478bdcab14d1f5599c478a92f663d2543de8efd717b0d4c766411b6f7377dad2050d49b411b'
    //     }
    // };

    // axios.request(claimCrosschainSwapOptions).then(function (response) {
    //     console.log(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });
}