import { createStore } from 'vuex'

export const store = createStore({
    state () {
      return {
        web3Provider: null,
        streams: [],
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
      }
    }
});
