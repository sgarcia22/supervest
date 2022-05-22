<template>
  <div class="dashboard p-4">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a
            href="#"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              class="mr-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              ></path>
            </svg>
            Streams
          </a>
        </li>
      </ol>
    </nav>
    <!-- end nav -->
    <div class="mt-5 w-full">
      <h1 class="text-2xl text-gray-900 dark:text-gray-200 font-medium">
        Streams
      </h1>
    </div>

    <button
        type="button"
        @click="swapTokens()"
        class="py-1 px-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
        SWAP TEST
    </button>

  <!-- Create streams -->
    <div class="flex justify-center">
    <div
        class="mt-4 p-5 w-3/5 rounded-md"
        >
        <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200 flex justify-center">
            Create a new stream
        </h2>
        <p class="text-gray-400 font-lexend font-normal flex justify-center">
            We currently only support the Polygon Network
        </p>
        <div class="wrapping-table mt-10 ">
            <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:overflow-auto overflow-x-scroll "
            >
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 "
            >
                <tr>
                <th scope="col" class="uppercase px-6 py-3">From</th>
                <th scope="col" class="uppercase px-6 py-3">To</th>
                <th scope="col" class="uppercase px-6 py-3">Flow Rate</th>
                <th scope="col" class="uppercase px-6 py-3"></th>
                </tr>
            </thead>
            <tbody>
                <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50"
                >
                <td class="px-6 py-4">
                    USDC
                </td>
                <td class="py-4 w-1/3">
                <v-select class="px-4 border-gray-700 " :options="token2Config.options" v-model="selectedOption"></v-select>
                </td>
                <td class="py-4">
                    <div
                    class="input-box border dark:bg-gray-900 dark:border-gray-700 rounded-md mr-5 w-full box-border lg:flex md:flex focus-within:bg-gray-100 dark:focus-within:bg-gray-700"
                    >
                    <span class="text-3xl p-2 text-gray-400"
                        ><Icon icon="bx:dollar-circle"
                    /></span>
                    <input
                        type="text"
                        placeholder="Enter rate/month"
                        v-model="selectedRate"
                        class="p-3 w-full bg-white dark:bg-gray-900 rounded-md outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                    />
                    </div>
                </td>
                <td class="px-6 pt-1">
                    <button
                        type="button"
                        @click="createStream()"
                        class="py-1 px-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                        Create stream
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </div>

    <div
      class="mt-10 bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border shadow"
    >
      <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">
        Streams
      </h2>
      <p class="text-gray-400 font-lexend font-normal">
        This is a list of your token streams
      </p>
      <div class="wrapping-table mt-10">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400 lg:overflow-auto overflow-x-scroll"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="uppercase px-6 py-3">Token</th>
              <th scope="col" class="uppercase px-6 py-3">Date Started</th>
              <th scope="col" class="uppercase px-6 py-3">Flow Rate</th>
              <th scope="col" class="uppercase px-6 py-3">Status</th>
              <th scope="col" class="uppercase px-6 py-3">Update</th>
              <th scope="col" class="uppercase px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50"
              v-for="items in this.$store.state.streams"
              :key="items.transaction"
            >
              <td class="px-6 py-4">
                {{ items.transaction }}
              </td>
              <td class="px-6 py-4">
                {{ items.datetime }}
              </td>
              <td class="px-6 py-4">
                {{ items.flowRate }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="text-green-800 bg-green-300 px-3 py-1 rounded-md"
                  v-if="items.statusTransaction == 'completed'"
                >
                  {{ items.statusTransaction }}
                </span>
                <span
                  class="text-purple-800 bg-purple-300 px-3 py-1 rounded-md"
                  v-else-if="items.statusTransaction == 'progress'"
                >
                  in progress
                </span>
                <span
                  class="text-red-800 bg-red-300 px-3 py-1 rounded-md"
                  v-else
                >
                  {{ items.statusTransaction }}
                </span>
              </td>
              <td class="px-6 py-4 flex flew-row">
                <div
                    class="input-box border dark:bg-gray-900 dark:border-gray-700 rounded-md mr-5 w-4/5 box-border lg:flex md:flex focus-within:bg-gray-100 dark:focus-within:bg-gray-700"
                    >
                    <span class="text-3xl p-2 text-gray-400"
                        ><Icon icon="bx:dollar-circle"
                    /></span>
                    <input
                        type="text"
                        placeholder="Enter new rate per month"
                        v-model="items.newRate"
                        class="p-3 w-full bg-white dark:bg-gray-900 rounded-md outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                    />
                </div>
                <button
                    type="button"
                    @click="items.newRate ? updateStream(items.superToken, items.newRate) : ''"
                    class="mt-2 mr-2 px-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    <span class="text-md text-gray-400">
                        <Icon icon="bi:check-lg"/>
                    </span>
                </button>
              </td>
              <td lass="px-6 py-4 mt-4">
                <button
                    type="button"
                    @click="deleteStream(items.superToken)"
                    class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                    Delete stream
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { Icon } from "@iconify/vue";
  import { createNewFlow, updateExistingFlow, deleteFlow } from "../utils/superfluid";
  import { performSwap } from "../utils/swap";
  import 'vue-select/dist/vue-select.css';

  export default {
    name: "StreamsDashboard",
    components: {
      Icon,
    },
    methods: {
      async createStream() {
          // TODO: add checks to make sure the strings are valid
          if (this.selectedOption && this.selectedRate)
              createNewFlow(this.selectedOption, this.selectedRate);
          // const testTransaction =  {
          //   transaction: 'TESTTOKEN',
          //   superToken: 'TESTTOKEN',
          //   datetime: 'date',
          //   flowRate: 'month',
          //   statusTransaction: "progress",
          // };

          // this.$store.commit('addStream', testTransaction);
          // this.$store.commit('setswapFunctionTimer', testTransaction);
      },
      async updateStream(tokenType, amount) {
        updateExistingFlow(tokenType, amount);
      },
      async deleteStream(tokenType) {
          // const testTransaction =  {
          //   transaction: 'TESTTOKEN',
          //   superToken: 'TESTTOKEN',
          //   datetime: 'date',
          //   flowRate: 'month',
          //   statusTransaction: "cancelled",
          // };

          // this.$store.commit('alterStream', testTransaction);
        deleteFlow(tokenType);
        // clearInterval(this.$store.state.streams.findIndex(obj => obj.transaction === tokenType).swapTimer);
      },
      async swapTokens() {
        await performSwap(.00000039);
      },
      setSelectedStreamToken(selectedOption) {
        this.selectedOption = selectedOption;
        console.log(selectedOption);
     }
    },
    data() {
      return {
        walletAddress: "0x1dCF1Ec2ED51A4ffd1b3435a5d5A2EEdf1A9441A",
        selectedOption: '',
        selectedRate: '',
        token1Config: {
            options: [
            "USDCx"
            ],
            placeholder: "USDCx",
            backgroundColor: "#cde4f5",
            textColor: "black",
            borderRadius: "1.5em",
            border: "1px solid gray",
            width: 200
        },
        token2Config: {
            options: [
            "MATIC"
            ],
            placeholder: "Second Token",
            backgroundColor: "#cde4f5",
            textColor: "black",
            borderRadius: "1.5em",
            border: "1px solid gray",
            width: 200
        },
         tableTransaction: [
            {
                transaction: "MATIC",
                superToken: "MATICx",
                datetime: "May 2, 2022",
                flowRate: "$10/month",
                statusTransaction: "progress",
            },
         ],
      };
    },
    mounted() {},
  };
</script>
<style scoped>
>>> {
  --vs-controls-color: #e5e7eb;
  --vs-border-color: #e5e7eb;

  --vs-dropdown-bg: #374151;
  --vs-dropdown-color: #9ca3af;
  --vs-dropdown-option-color: #9ca3af;

  --vs-selected-bg: #e5e7eb;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #e5e7eb;
  --vs-dropdown-option--active-color: #eeeeee;
}
</style>