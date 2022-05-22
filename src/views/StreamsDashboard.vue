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

  <!-- Create streams -->

    <h2 class="flex justify-center font-bold text-lg text-gray-800 dark:text-gray-200">
    We currently only support the Polygon Network
    </h2>

    <div class="flex justify-center mt-4">
        <div class="flex flex-row justify-between w-1/3">
            <v-select class="w-1/2 px-4" :options="token1Config.options"></v-select>
            <v-select class="w-1/2 px-4" :options="token2Config.options"></v-select>
        </div>
        <button
            type="button"
            @click="createStream()"
            class="py-1.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
            Create stream
        </button>
    </div>

    <!-- <button
      type="button"
      @click="createStream()"
      class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Create stream
    </button>

    <button
      type="button"
      @click="updateStream()"
      class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Update stream
    </button> -->

      <!-- <button
      type="button"
      @click="swapTokens()"
      class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Swap Tokens
    </button> -->


    <div
      class="mt-2 bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border shadow"
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
              v-for="items in tableTransaction"
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
                        class="p-3 w-full bg-white dark:bg-gray-900 rounded-md outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                    />
                </div>
                <button
                    type="button"
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
      <!-- <div class="wrapper-button mt-3">
        <select
          name=""
          id=""
          class="dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-300 border max-w-lg px-4 py-3 block rounded-md text-gray-500 dark:text-gray-400"
        >
          <option value="">Last 7 years</option>
        </select>
        <button
          class="uppercase float-right -mt-7 border-b border-red-600 text-red-600"
        >
          Transaction Report
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { Icon } from "@iconify/vue";
  import DropdownSelect from "../components/DropdownSelect.vue";
  import { createNewFlow, updateExistingFlow, deleteFlow } from "../utils/superfluid";
  import { performSwap } from "../utils/swap";
  import 'vue-select/dist/vue-select.css';

  export default {
    name: "StreamsDashboard",
    components: {
      Icon,
      DropdownSelect
    },
    methods: {
      async createStream(tokenType, amount) {
        createNewFlow(tokenType, amount);
      },
      async updateStream(tokenType, amount) {
        updateExistingFlow(tokenType, amount);
      },
      async deleteStream(tokenType) {
        deleteFlow(tokenType);
      },
      async swapTokens() {
        performSwap();
      },
      setNewSelectedOption(selectedOption) {
        this.config.placeholder = selectedOption.value;
        }
    },
    data() {
      return {
        walletAddress: "0x1dCF1Ec2ED51A4ffd1b3435a5d5A2EEdf1A9441A",
        token1Config: {
            options: [
            "option 1", "option 2", "option 3"
            ],
            placeholder: "First Token",
            backgroundColor: "#cde4f5",
            textColor: "black",
            borderRadius: "1.5em",
            border: "1px solid gray",
            width: 200
        },
        token2Config: {
            options: [
            "option 1", "option 2", "option 3"
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
