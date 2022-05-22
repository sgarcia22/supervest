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
            Dashboard
          </a>
        </li>
      </ol>
    </nav>
    <!-- end nav -->
    <div class="mt-5 w-full">
      <h1 class="text-2xl text-gray-900 dark:text-gray-200 font-medium">
        Dashboard
      </h1>
    </div>

    <!-- grid wrapper card -->
    <div
      class="wrapper-card grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-2 mt-5"
    > 
      <div
        class="card bg-white dark:bg-gray-800 w-full rounded-md p-5 shadow flex"
      >
        <div class="p-2 max-w-sm">
          <div
            class="bg-purple-200 rounded-full w-14 h-14 text-lg p-3 text-purple-600 mx-auto"
          >
            <span class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="30px"
                height="30px"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 16 16"
              >
                <g fill="currentColor">
                  <path d="M15 13v1H1.5l-.5-.5V0h1v13h13Z" />
                  <path
                    d="M13 3.207L7.854 8.354h-.708L5.5 6.707l-3.646 3.647l-.708-.708l4-4h.708L7.5 7.293l5.146-5.147h.707l2 2l-.707.708L13 3.207Z"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div class="block p-2 w-full">
          <p class="font-semibold text-gray-900 dark:text-gray-200 text-xl">
            {{this.$store.state.streams.length}}
          </p>
          <h2 class="font-normal text-gray-400 text-md mt-1">Total Streams</h2>
        </div>
      </div>
      <!-- end card -->
    </div>
    <!-- end wrapper card -->
    <div class="mt-2 lg:flex block lg:gap-2">
    </div>
    <div class="mt-2 lg:flex block lg:gap-2">
      <div
        class="mt-2 bg-white dark:bg-gray-800 p-5 w-full rounded-md box-border shadow"
      >
        <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">
          {{currentMaticPriceData.value}}
        </h2>
        <p class="text-gray-400 font-lexend font-normal">MATIC PRICE</p>
        <span class="float-right">
          <div v-if="stonksUp">
            <h2 class="text-green-500 -mt-12 flex">
              <span class="mr-2"> {{percentageDifferece}}% </span
              ><span>
                <Icon icon="akar-icons:arrow-up" />
              </span>
            </h2>
          </div>
          <div v-else>
            <h2 class="text-red-500 -mt-12 flex">
              <span class="mr-2"> -{{percentageDifferece}}% </span
              ><span>
                <Icon icon="akar-icons:arrow-down" />
              </span>
            </h2>
          </div>
        </span>
        <div class="wrapper-chart mt-5">
          <apexchart
            width="100%"
            height="380"
            type="area"
            :options="optionsVisitor"
            :series="seriesVisitor"
          ></apexchart>
          <br />
          <hr />
          <div class="wrapper-button mt-3">
            <select
              name=""
              id=""
              class="dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-300 border max-w-lg px-4 py-3 block rounded-md text-gray-500 dark:text-gray-400"
            >
              <option value="">Last 7 days</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { Icon } from "@iconify/vue";
  import redstone from 'redstone-api';

  export default {
    name: "SupervestDashboard",
    methods: {
      async getMaticPrice() { 
        var today = new Date();
        var maticPrice = [];
        for (let i = 7; i > 0; i--) {
          var date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
          // this.optionsVisitor.xaxis.categories.push(date);
          const priceData = await redstone.getHistoricalPrice('MATIC', {
              date: date,
              verifySignature: true,
            });
          maticPrice.push(priceData.value);
            // this.weeklyMaticPriceData.push(await redstone.getHistoricalPrice('MATIC', {
            //   date: date,
            //   verifySignature: true,
            // }).value);
        }
        // var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        this.currentMaticPriceData = await redstone.getHistoricalPrice('MATIC', {
          verifySignature: true,
        });
        // console.log(maticPrice);
        this.seriesVisitor[0].data = maticPrice;
        this.percentageDifferece = ((maticPrice[0] - maticPrice[maticPrice.length - 1]) / maticPrice[0]) * 100;
        this.stonksUp = maticPrice[maticPrice.length - 1] > maticPrice[0];
      }
    },
    async mounted() {
      // console.log("GET");
      await this.getMaticPrice();
    },
    data() {
      return {
        currentMaticPriceData: {},
        weeklyMaticPriceData: [{
            data: [] }],
        percentageDifferece: 0,
        stonksUp: true,
        walletAddress: "0x1dCF1Ec2ED51A4ffd1b3435a5d5A2EEdf1A9441A",
        // for more guide apexchart.js
        // https://apexcharts.com/docs/chart-types/line-chart/

        // chart data area
        optionsArea: {
          xaxis: {
            categories: [],
          },
          fontFamily: "Segoe UI, sans-serif",
          stroke: {
            curve: "straight",
          },

          markers: {
            size: 0,
          },
          // yaxis: {
          //   show: false,
          // },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
            },
          },
        },

        chart: {
          fontFamily: "lexend, sans-serif",
        },

        // seriesArea: [
        //   {
        //     name: "Revenue",
        //     data: [30, 40, 45, 50, 49, 60, 70, 91],
        //   },
        //   {
        //     name: "Revenue (Previous period)",
        //     data: [20, 34, 45, 55, 79, 87, 90, 98],
        //   },
        // ],
        // optionsBar: {
        //   chart: {
        //     toolbar: {
        //       show: false,
        //     },
        //     zoom: {
        //       enabled: false,
        //     },
        //     sparkline: {
        //       enabled: true,
        //     },
        //   },
        //   legend: {
        //     show: false,
        //   },
        //   xaxis: {
        //     show: false,
        //   },
        //   yaxis: {
        //     show: false,
        //   },
        //   colors: ["#4f46e5", "#DC2626"],
        //   dataLabels: {
        //     enabled: false,
        //   },
        //   stroke: {
        //     curve: "straight",
        //   },
        // },

        // seriesBar: [
        //   {
        //     name: "Product 1",
        //     data: [30, 40, 45, 50, 49, 60, 70, 91],
        //   },
        //   {
        //     name: "Product 2",
        //     data: [20, 34, 45, 55, 79, 87, 90, 98],
        //   },
        // ],
        optionsVisitor: {
          chart: {
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
            sparkline: {
              enabled: true,
            },
          },
          legend: {
            show: false,
          },
          xaxis: {
            show: false,
            // categories: []
          },
          yaxis: {
            show: false,
          },
          colors: ["#4f46e5"],
          dataLabels: {
            enabled: false,
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
            },
          },
          stroke: {
            curve: "smooth",
          },
        },

        seriesVisitor: [
          {
            name: "MATIC PRICE ",
            data: [0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
        // optionsDonut: {
        //   chart: {
        //     type: "donut",
        //   },
        //   legend: false,
        //   dataLabels: {
        //     enabled: false,
        //   },
        //   labels: ["admin", "SuperAdmin", "User", "Costumer"],
        // },

        // seriesDonut: [20, 15, 63, 83],
        tableTransaction: [
        ],
      };
      // end chart data line
    },
    components: {
      Icon,
    },
  };
</script>
