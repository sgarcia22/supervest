import { createStore } from 'vuex'
import { performSwap } from './utils/swap';

export const store = createStore({
    state () {
      return {
        web3Provider: null,
        streams: [],
        swapFunctionTimer: null,
      }
    },
    mutations: {
      changeWeb3ProviderValue (state, newValue) {
        state.web3Provider = newValue;
      },
      addStream(state, newVal) {
        state.streams.push(newVal);
      },
      alterStream(state, newVal) {
        const index = state.streams.findIndex(obj => obj.transaction === newVal.transaction);
        state.streams[index] = newVal;
      },
      setswapFunctionTimer(state, newVal) {
        const transaction = state.streams[state.streams.findIndex(obj => obj.transaction === newVal.transaction)];
        const interval = setInterval(async () => {
          if (transaction.statusTransaction !== 'progress') {
            clearInterval(interval);
          }
          else
            await performSwap(transaction.flowRate);
        }, 10000);

        state.swapFunctionTimer = newVal;
      },
      clearSwapFunctionTimer(state) {
        clearInterval(state.swapFunctionTimer);
      }
    }
});
