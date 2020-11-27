<template>
  <div v-if="showChart">
    <apexchart type="bar" height="350" :options="options" :series="eventCount"></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showChart: false,
      series: [{
        name: 'Net Profit',
        data: [7, 8, 10, 9, 87, 105, 91, 114, 94]
      }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
        },
        yaxis: {
          title: {
            text: 'Events'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' events'
            }
          }
        }
      }
    }
  },
  computed: {
    eventCount () {
      const newseries = this.$store.state.queryuser.newBarChartData

      // [{
      //   name: 'Challenge',
      //   data: this.$store.state.queryuser.newChallengeData
      // }, {
      //   name: 'Revenue',
      //   data: [0, 0, 10, 8, 3]
      // }, {
      //   name: 'Free Cash Flow',
      //   data: [5, 4, 3, 2, 4]
      // }]

      return newseries
    },
    options () {
      const myChartOptions = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: this.$store.state.queryuser.dates || ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
        },
        yaxis: {
          title: {
            text: 'Events'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' events'
            }
          }
        }
      }

      return myChartOptions
    }
  },
  mounted() {
    this.showChart = true
  }
}
</script>
