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
        const interval = setInterval(async () => {
          if (state.streams[state.streams.findIndex(obj => obj.transaction === newVal.transaction)].statusTransaction !== 'progress') {
            console.log(state.streams[state.streams.findIndex(obj => obj.transaction === newVal.transaction)].statusTransaction);
            clearInterval(interval);
          }
          else
            await performSwap(1);
        }, 10000);

        state.swapFunctionTimer = newVal;
      },
      clearSwapFunctionTimer(state) {
        clearInterval(state.swapFunctionTimer);
      }
    }
});
