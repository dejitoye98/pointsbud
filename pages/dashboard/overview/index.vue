<template>
  <div class="overview">
    <div class="section" v-if="context === 'marketer'">
      <div class="section__container">
        <GroupedMarketerClicksChart />
        <GroupedMarketerSalesChart />
      </div>
    </div>
    <div class="section" v-if="context === 'business'">
      <div class="section__container">
        <div class="section__body">
          <div class="l-card">
            <div class="l-card__body">
              <div class="l-card__header">
                <p>Disbursements Today</p>
              </div>
              <div class="l-card__content">
                <div class="l-card__content__item">
                  <label for>Volume</label>
                  <p v-if="disbursements.today.total">{{disbursements.today.total || 0}}</p>
                  <p v-else>0</p>
                </div>
                <div class="l-card__content__item">
                  <label for>Value</label>
                  <p
                    v-if="disbursements.today.amount"
                  >NGN {{formatMoney(disbursements.today.amount) || 0}}</p>
                  <p v-else>NGN 0</p>
                </div>
              </div>
            </div>
          </div>
          <div class="l-card">
            <div class="l-card__body">
              <div class="l-card__header">
                <p>Clicks Today</p>
              </div>
              <div class="l-card__content">
                <div class="l-card__content__item">
                  <label for>Volume</label>
                  <p>{{ clicks.today.total || 0}}</p>
                </div>
                <div class="l-card__content__item">
                  <label for>Value</label>
                  <p
                    v-if="clicks && clicks.today && clicks.today.amount"
                  >NGN {{ formatMoney(clicks && sales.today && clicks.today.amount) }}</p>
                  <p v-else>NGN 0</p>
                </div>
              </div>
            </div>
          </div>
          <div class="l-card">
            <div class="l-card__body">
              <div class="l-card__header">
                <p>Sales Today</p>
              </div>
              <div class="l-card__content">
                <div class="l-card__content__item">
                  <label for>Volume</label>
                  <p>{{ sales.today.total || 0}}</p>
                </div>
                <div class="l-card__content__item">
                  <label for>Value</label>
                  <p
                    v-if="sales && sales.today && sales.today.amount"
                  >NGN {{ formatMoney(sales && sales.today && sales.today.amount) }}</p>
                  <p v-else>NGN 0</p>
                </div>
              </div>
            </div>
          </div>
          <div class="l-card">
            <div class="l-card__body">
              <div class="l-card__header">
                <p>Leads Today</p>
              </div>
              <div class="l-card__content">
                <div class="l-card__content__item">
                  <label for>Volume</label>
                  <p>{{ leads.today.total || 0}}</p>
                </div>
                <div class="l-card__content__item">
                  <label for>Value</label>
                  <p
                    v-if="leads && leads.today && leads.today.amount"
                  >NGN {{ formatMoney(leads && leads.today && leads.today.amount) }}</p>
                  <p v-else>NGN 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section__container">
        <div class="section__body">
          <div class="section__body__stat section__body__stat--earnings">
            <StatisticsChart
              @onFilterChanged="changeStatisticsFilter"
              name="disbursements"
              v-if="disbursements.chart.datasets[0].data.length>0"
              :filter="disbursements.filter"
              :chart_data="disbursements.chart"
              type="line"
              title="Disbursements"
            />
          </div>
          <div class="section__body__stat section__body__stat--earnings">
            <ValueChart
              :model="sales"
              name="Sales Value"
              :loading="loading.sales"
              title="Sales Value"
            />
          </div>
          <div class="section__body__stat section__body__stat--earnings">
            <!-- <StatisticsChart  @onFilterChanged="changeStatisticsFilter" name="sales"  v-if="sales.chart.datasets[0].data.length>0" :filter="sales.filter" :chart_data='sales.chart'  type="line" title="Sales"/>-->
            <ValueChart
              :model="clicks"
              name="Clicks Value"
              :loading="loading.clicks"
              title="Clicks Value"
            />
          </div>

          <!--
                   <div class="section__body__stat section__body__stat--earnings">
                        <StatisticsChart title="Average Earnings">
                            <div class="most">
                                <div class="most__item">
                                    <p>Per Day: N30,000</p>
                                </div>
                                <div class="most__item">
                                    <p>Per week: N40,000</p>
                                </div>
                            </div>
                        </StatisticsChart>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ClicksByCountryChart from "../../../components/charts/ClicksByCountryChart";
import moment from "moment";
export default {
  layout: "dashboard",
  components: {
    ClicksByCountryChart
  },
  data() {
    return {
      earnings_chart: {
        labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
        datasets: [
          {
            label: ["Amount in NGN"],
            borderColor: ["#DE5C6E"],
            fill: false,
            data: [2000, 4000, 5000, 6000, 0, 124, 3234] // to be filled
          }
        ]
      },
      top_grossing_campaigns: {
        labels: {}
      },
      links: {
        labels: ["Accepted Clicks", "Disallowed Clicks"],
        datasets: [
          {
            backgroundColor: ["lightseagreen", "#DE5C6E"],
            data: [100, 200]
          }
        ]
      },

      disbursements: {
        data: [],
        filter: { by: "week" },
        today: {},
        chart: {
          labels: [],
          datasets: [
            {
              label: ["Amount in NGN"],
              borderColor: ["#DE5C6E"],
              fill: false,
              data: []
            }
          ]
        }
      },
      sales: {
        group_by_day: [],
        filter: { by: "week" },
        today: {},
        chart: {
          labels: [],
          datasets: [
            {
              label: ["Amount in NGN"],
              borderColor: ["#DE5C6E"],
              fill: false,
              data: []
            }
          ]
        }
      },
      clicks: {
        group_by_day: [],
        filter: { by: "week" },
        today: {},
        chart: {
          labels: [],
          datasets: [
            {
              label: ["Amount in NGN"],
              borderColor: ["#DE5C6E"],
              fill: false,
              data: []
            }
          ]
        }
      },
      leads: {
        group_by_day: [],
        filter: { by: "week" },
        today: {},
        chart: {
          labels: [],
          datasets: [
            {
              label: ["Amount in NGN"],
              borderColor: ["#DE5C6E"],
              fill: false,
              data: []
            }
          ]
        }
      },
      loading: {
        clicks: true,
        sales: true,
        disbursements: true
      }
    };
  },
  created() {
    this.getDisbursements();
    this.getSales();
    this.getLeads();
    this.getClicks();
  },
  methods: {
    getData(type, filter) {
      this.loading[type] = true;
      let url = `/insights/${type}?include=group_by_day&time=${filter.by}`;
      this.$api
        .get(url)
        .then(resp => {
          this.loading[type] = false;
          if (type === "disbursements") {
            this.disbursements.data = resp.data.data;
          } else {
            this.clicks[type].group_by_day = resp.data.data.group_by_day;
          }
          this.computeClicksData(type);
        })
        .catch(err => {
          this.loading[type] = false;
        });
    },

    changeFilter(name) {
      if (name === "disbursements") {
        this.disbursements.filter.by = val.filter;
        this.getData("disbursements", this.disbursements.filter);
      } else if (name === "clicks") {
        this.clicks.filter.by = val.filter;
        this.getData("clicks", this.clicks.filter);
      } else if (name === "sales") {
        this.sales.filter.by = val.filter;
        this.getData("sales", this.sales.filter);
      }
    },
    changeStatisticsFilter(val) {
      switch (val.name) {
        case "disbursements":
          this.disbursements.filter.by = val.filter;
          this.getDisbursements();
          break;
        case "sales":
          this.sales.filter.by = val.filter;
          this.getSales();
          break;
        case "leads":
          this.leads.filter.by = val.filter;
          this.getLeads();
          break;
        case "clicks":
          this.leads.filter.by = val.filter;
          this.getClicks();
          break;
      }
    },
    formatMoney(value) {
      return Intl.NumberFormat("en-US").format(value);
    },
    findDisbursementsToday() {
      let data = this.disbursements.data;
      for (let i = 0; i < data.length; i++) {
        const disbursement = data[i];
        const is_today = moment().diff(data.date, "days") === 0;
        if (is_today) {
          this.disbursements.today = disbursement;
          return;
        }
      }
    },
    findSalesToday() {
      let data = this.sales.group_by_day;
      for (let i = 0; i < data.length; i++) {
        const sale = data[i];
        const is_today = moment().diff(sale.date, "days") === 0;
        if (is_today) {
          this.sales.today = sale;
          return;
        }
      }
    },
    getSales() {
      const filter = this.sales.filter;
      const time = this.sales.filter.by;
      this.loading.sales = true;
      let url = "/insights/sales?include=group_by_day";

      if (time) {
        url += "&time=" + time;
      }
      this.$api
        .get(url)
        .then(resp => {
          this.sales.group_by_day = resp.data.data.group_by_day;
          if (!this.sales.today) this.findSalesToday();
          this.computeData("sales");
          this.loading.sales = false;
        })
        .catch(err => {
          this.loading.sales = false;
        });
    },
    findClicksToday() {
      let data = this.clicks.group_by_day;
      for (let i = 0; i < data.length; i++) {
        const click = data[i];
        const is_today = moment().diff(sale.date, "days") === 0;
        if (is_today) {
          this.clicks.today = click;
          return;
        }
      }
    },
    getClicks() {
      this.loading.clicks = true;
      const filter = this.clicks.filter;
      const time = this.clicks.filter.by;
      let url = "/insights/clicks?include=group_by_day";

      if (time) {
        url += "&time=" + time;
      }
      this.$api
        .get(url)
        .then(resp => {
          this.loading.clicks = false;
          this.clicks.group_by_day = resp.data.data.group_by_day;
          if (!this.clicks.today) this.findClicksToday();
          this.computeData("clicks");
        })
        .catch(err => {
          this.loading.clicks = false;
        });
    },
    findLeadsToday() {
      let data = this.leads.group_by_day;
      for (let i = 0; i < data.length; i++) {
        const lead = data[i];
        const is_today = moment().diff(lead.date, "days") === 0;
        if (is_today) {
          this.leads.today = lead;
          return;
        }
      }
    },
    getLeads() {
      let filter = this.leads.filter.by;
      let url = `/insights/leads?include=group_by_day`;

      if (filter) {
        url += `&time=${filter}`;
      }
      this.$api.get(url).then(resp => {
        this.leads.group_by_day = resp.data.data.group_by_day;
        if (!this.leads.today) this.findLeadsToday();
        this.computeData("leads");
      });
    },
    getDisbursements() {
      const filter = this.disbursements.filter;

      this.$api.get("/insights/disbursements").then(resp => {
        this.disbursements.data = resp.data.data;
        this.findDisbursementsToday();
        this.computeData("disbursements");
      });
    },

    computeData(type) {
      if (this[type].filter.by === "week") {
        const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const datasets = [0, 0, 0, 0, 0, 0, 0];

        this[type].chart.labels = labels;

        if (type === "disbursements") {
          this[type].data.forEach(data => {
            const day = moment(data.date).day();
            datasets[day] = data.amount;
          });
        } else {
          this[type].group_by_day.forEach(data => {
            const day = moment(data.date).day();
            datasets[day] = data.amount;
          });
        }
        this[type].chart.datasets[0].data = datasets;
      } else if (this[type].filter.by === "month") {
        try {
          const labels = [];
          const datasets = [];
          const month = new Date().getUTCMonth();
          for (let i = 1; i <= this.monthDaysMapping[month]; i++) {
            labels.push(this.pad(i));
            datasets.push(0);
          }

          //this.clicks[type].chart.labels = labels;
          this[type].group_by_day.forEach(data => {
            const clickday = this.pad(moment(data.date).date());
            const index = labels.indexOf(clickday);
            datasets[index] = type === "value" ? data.amount || 0 : data.total;
          });
          // change labels

          this[type].chart.labels = labels;
          this.$set(this[type].chart.datasets[0], "data", datasets);
          //this.loading[type] = false;
        } catch (err) {
          alert(err);
        }
      }
    }
  },
  computed: {
    monthDaysMapping() {
      return {
        "01": 31,
        "02": 29,
        "03": 31,
        "04": 30,
        "05": 31,
        "06": 30,
        "07": 31,
        "08": 31,
        "09": 30,
        "10": 31,
        "11": 30,
        "12": 31
      };
    },
    monthNameMapping() {
      return {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
      };
    },

    context() {
      return window.localStorage.getItem("afContext");
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.l-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 50px;
  border: 0.5px solid rgba(0, 0, 0, 0.06);

  //box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  &__header {
    font-size: 20px;
    color: $charcoal;
    padding: 0 16px;
  }
  &__content {
    display: grid;
    grid-template-columns: 50% 50%;

    &__item {
      //margin-top: 16px;
      padding: 0 16px;
      &:first-of-type {
        //border-right: 0.2px solid lightgrey;
        label {
          // color: $lightaccent
        }
      }
      label {
        //color: lightseagreen;
        font-weight: 500;
        font-size: 25px;
      }
      p {
        color: $charcoal;
        font-size: 20px;
      }
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
  }
}
.overview {
}

.section {
  &__container {
  }
  &__header {
    margin-bottom: 16px;
    p {
      font-size: 20px;
      color: grey;
    }
  }

  &__body {
    display: grid;

    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;

    @include media("<=dashbreak") {
      grid-template-columns: 100%;
    }

    &__stat {
      width: 100%;
      margin-bottom: 20px;

      @include media("<=dashbreak") {
        width: 100%;
      }

      &--earnings {
      }

      &--50 {
        width: 65%;
      }
    }
  }
}

.most {
  color: grey;

  &__item {
    p {
      text-align: center;
      font-size: 20px;
    }
  }
}
</style>