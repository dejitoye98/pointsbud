<template>
  <div class="container">
    <JoinedCampaignModal :campaign="campaign_just_joined" />

    <div class="header desktop">
      <!--<div class="sort">
                <p>Sort By: </p>
                <select v-model="sort_by">
                    <option @click="changeSortBy(type)" v-for="(type, index) in sort_types" :key="index">{{type}}</option>
                </select>
      </div>-->
      <div class="search">
        <div class="search__container">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
              stroke="grey"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
              stroke="grey"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <input type="text" placeholder="search title, description" />
        </div>
      </div>
    </div>
    <div class="body">
      <div class="filter desktop">
        <div class="filter__header">
          <p>Filter</p>
        </div>
        <div class="filter__body">
          <div class="filter__item">
            <label for>Business Name</label>
            <input v-model="filter.business_name" type="text" />
          </div>

          <div class="filter__item">
            <label for>Campaign Title</label>
            <input v-model="filter.campaign_title" type="text" />
          </div>
          <!--
          <div class="filter__item">
            <label for>Budget</label>
            <div class="filter__flex">
              <input v-model="filter.min_budget" type="number" placeholder="min" />
              <input v-model="filter.max_budget" type="number" placeholder="max" />
            </div>
          </div>
          <div class="filter__item">
            <label for>Average Pay Per Click</label>
            <div class="filter__flex">
              <input v-model="filter.min_avg_ppc" type="number" placeholder="min" />
              <input v-model="filter.max_avg_ppc" type="number" placeholder="max" />
            </div>
          </div>-->
          <div class="filter__item">
            <button @click="applyFilter">Filter</button>
          </div>
        </div>
      </div>

      <div class="mobile-filter mobile">
        <div class="mobile-filter__header" @click="showMobileFilter">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.40002 2.09998H18.6C19.7 2.09998 20.6 2.99998 20.6 4.09998V6.29998C20.6 7.09998 20.1 8.09998 19.6 8.59998L15.3 12.4C14.7 12.9 14.3 13.9 14.3 14.7V19C14.3 19.6 13.9 20.4 13.4 20.7L12 21.6C10.7 22.4 8.90002 21.5 8.90002 19.9V14.6C8.90002 13.9 8.50002 13 8.10002 12.5L4.30002 8.49998C3.80002 7.99998 3.40002 7.09998 3.40002 6.49998V4.19998C3.40002 2.99998 4.30002 2.09998 5.40002 2.09998Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.93 2.09998L6 9.99998"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>Filter</p>
        </div>

        <div class="mobile-filter__body" v-if="show_mobile_filter">
          <div class="filter__item">
            <label for>Business Name</label>
            <input v-model="filter.business_name" type="text" />
          </div>

          <div class="filter__item">
            <label for>Campaign Title</label>
            <input v-model="filter.campaign_title" type="text" />
          </div>
          <div class="filter__item">
            <label for>Budget</label>
            <div class="filter__flex">
              <input v-model="filter.min_budget" type="number" placeholder="min" />
              <input v-model="filter.max_budget" type="number" placeholder="max" />
            </div>
          </div>
          <div class="filter__item">
            <label for>Average Pay Per Click</label>
            <div class="filter__flex">
              <input v-model="filter.min_avg_ppc" type="number" placeholder="min" />
              <input v-model="filter.max_avg_ppc" type="number" placeholder="max" />
            </div>
          </div>
          <div class="mobile-filter__cta">
            <button @click="applyFilter">Filter</button>
          </div>
        </div>
      </div>

      <template
        v-if="tab === 'mine' && !my_campaign_indicators.loading && !my_campaign_indicators.empty
                 || tab === 'find' && !find_campaign_indicators.loading && !find_campaign_indicators.empty"
      >
        <div class="list">
          <div
            class="card"
            v-for="(campaign, index) in campaigns"
            :key="index"
            @click="open(campaign.id)"
          >
            <div class="card__image">
              <img :src="campaign.thumbnail" alt />
            </div>

            <div class="card__body">
              <div class="card__body__header">
                <p>{{campaign.title}}</p>
                <template
                  v-if="userContext === 'marketer' && tab !== 'mine' && campaign.who_can_join !== 2 && campaign.campaign_marketers && campaign.campaign_marketers.length < 1 "
                >
                  <button @click.stop="join(index)">Join</button>
                </template>
                <template
                  v-if="userContext === 'marketer' && tab !== 'mine' && campaign.who_can_join === 2 && campaign.campaign_marketers &&  campaign.campaign_marketers.length < 1"
                >
                  <button @click.stop>Apply</button>
                </template>
                <template
                  v-else-if="userContext === 'marketer' && (tab === 'mine' || campaign.campaign_marketers.length >0)"
                >
                  <span>Joined {{daysAgo(campaign && campaign.campaign_marketers.length > 0 && campaign.campaign_marketers[0].createdAt)}}</span>
                </template>
              </div>
              <div class="card__body__description">
                <p>{{campaign.description}}</p>
              </div>
              <div class="card__body__details">
                <div class="card__body__details__detail">
                  <label for>Business Name</label>
                  <p>{{campaign.business && campaign.business.name}}</p>
                </div>
                <!--
                <div class="card__body__details__detail">
                  <label for>Budget</label>
                  <p>NGN {{computeMoney(campaign.budget)}}</p>
                </div>-->
                <div
                  class="card__body__details__detail"
                  v-if="(userContext === 'marketer' && tab !== 'mine') || userContext === 'business' "
                >
                  <label for>Marketers required</label>
                  <p>{{campaign.marketers_required || 'unlimited'}}</p>
                </div>
                <div
                  class="card__body__details__detail"
                  v-if="(userContext === 'marketer' && tab === 'mine') || userContext === 'business' "
                >
                  <label for>Budget Left</label>
                  <p>NGN {{computeMoney(campaign.budget)}}</p>
                </div>
                <div
                  class="card__body__details__detail"
                  v-if="(userContext === 'marketer' && tab !== 'mine') || userContext === 'business' "
                >
                  <label for>Marketers joined</label>
                  <p>{{campaign.marketers_joined || 'unknown'}}</p>
                </div>
                <div
                  class="card__body__details__detail"
                  v-if="(userContext === 'marketer' && tab === 'mine') "
                >
                  <label for>Clicks Driven</label>
                  <p>{{campaign && campaign.campaign_marketers.length > 0 && campaign.campaign_marketers[0].clicks_driven}}</p>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%">
            <pagination
              :records="campaigns_page_info && campaigns_page_info.total || 0"
              v-model="current_page"
              :per-page="campaigns_page_info.page_size"
              @paginate="applyFilter"
            ></pagination>
          </div>
        </div>
      </template>

      <template
        v-else-if="tab === 'mine' && my_campaign_indicators.loading || tab === 'find' && find_campaign_indicators.loading"
      >
        <div class="loading">
          <LoadingState />
        </div>
      </template>

      <template v-else>
        <EmptyState
          :classes="['white-background']"
          :show_illustration="false"
          v-if="tab==='mine'"
          caption="You haven't joined any campaigns"
        />
        <EmptyState
          :classes="['white-background']"
          :show_illustration="false"
          v-else
          caption="No campaigns to show"
        />
        <!--<EmptyState v-else caption="No campaigns to show"/>-->
      </template>
    </div>
  </div>
</template>

<script>
import Pagination from "vue-pagination-2";
import moment from "moment";
import JoinedCampaignModal from "../modals/JoinedCampaignModal";
import LoadingState from "../states/LoadingState";
import EmptyState from "../states/EmptyState";

export default {
  props: ["tab"],
  watch: {
    tab(value) {
      this.getCampaigns(this.computedQueryString);
    }
  },
  components: {
    Pagination,
    JoinedCampaignModal,
    EmptyState,
    LoadingState
  },
  data() {
    return {
      current_page: this.$route.params.page || null,
      campaign_just_joined: {},
      campaigns: {},
      campaigns_page_info: {},
      filter: {
        error: "",
        business_name: this.$route.query.business_name || "",
        campaign_title: this.$route.query.campaign_title || "",
        min_budget: this.$route.query.min_budget || null,
        max_budget: this.$route.query.max_budget || null,
        min_avg_ppc: this.$route.query.min_avg_ppc || null,
        max_avg_ppc: this.$route.query.max_avg_ppc || null
      },
      sort_types: ["Started Date", "Avg Pay Per Click", "Budget"],
      sort_by: "Started Date",

      my_campaign_indicators: {
        loading: true,
        empty: false
      },
      find_campaign_indicators: {
        loading: true,
        empty: false
      },
      show_mobile_filter: false
    };
  },

  created() {
    this.getCampaigns(this.computedQueryString);
  },

  methods: {
    open(id) {
      this.$router.push("/dashboard/campaigns/" + id);
    },
    showMobileFilter() {
      this.show_mobile_filter = !this.show_mobile_filter;
    },

    join(index) {
      this.$api
        .post(`/campaigns/${this.campaigns[index].id}/join`)
        .then(resp => {
          this.campaigns[index].campaign_marketers = [{ createdAt: moment() }];
          this.campaign_just_joined = this.campaigns[index];
        })
        .catch(err => {
          this.$store.dispatch("dashboard/actionShowErrorToast", {
            message: (err.response && err.response.data.data) || err
          });
        });
    },

    changeSortBy(type) {
      this.sort_by = type;
    },

    computeMoney(money) {
      return Intl.NumberFormat("en-US").format(money);
    },
    computeDate(date) {
      return moment(date).format("MMM DD, YYYY");
    },
    daysAgo(date) {
      const diff = moment().diff(date, "days");

      if (diff === 0) {
        return "Today";
      }
      return `${diff} days ago`;
    },
    getCampaigns(query) {
      // reset empty states
      this.my_campaign_indicators.empty = false;
      this.find_campaign_indicators.empty = false;

      let my_campaigns = this.tab === "mine";
      let url = "/campaigns";
      if (my_campaigns) {
        url += "/mine";
      }
      if (query) {
        url += query;
      }

      if (my_campaigns) {
        this.my_campaign_indicators.loading = true;
      } else {
        this.find_campaign_indicators.loading = true;
      }

      this.$api
        .get(url)
        .then(resp => {
          this.loading = false;
          this.campaigns = resp.data.data.list;
          this.campaigns_page_info = resp.data.data.page_info;
          this.current_page = resp.data.data.page_info.current_page;
          if (my_campaigns) {
            this.my_campaign_indicators.loading = false;
            if (this.campaigns.length < 1)
              this.my_campaign_indicators.empty = true;
          } else {
            this.find_campaign_indicators.loading = false;
            if (this.campaigns.length < 1)
              this.find_campaign_indicators.empty = true;
          }
        })
        .catch(err => {
          if (my_campaigns) {
            this.my_campaign_indicators.loading = false;
          } else {
            this.find_campaign_indicators.loading = false;
          }
          //this.loading = false;
        });
      //this.loading = false;
    },
    applyFilter() {
      this.$router.push("/dashboard/campaigns" + this.computedQueryString);
      this.getCampaigns(this.computedQueryString);
    }
  },
  computed: {
    userContext() {
      return window.localStorage.getItem("afContext");
    },
    computedQueryString() {
      return (
        "?" +
        this.computedPageQuery +
        this.filterQueryString +
        this.computedSortQuery
      );
    },
    computedSortQuery() {
      let query = "sort_by=";
      switch (this.sort_by) {
        case "Started Date":
          query += `id&`;
          break;
        case "Avg Pay Per Click":
          query += "avg_pay_per_click&";
          break;
        case "Budget":
          query += "budget&";
          break;
        default:
          query += "id&";
          break;
      }
      return query;
    },

    computedPageQuery() {
      if (this.current_page) return `page=${this.current_page}&`;
      return "";
    },
    filterQueryString() {
      let query = "";
      Object.keys(this.filter).forEach(item => {
        const value = this.filter[item];
        if (value) {
          query += `${item}=${value}&`;
        }
      });
      return query;
    }
  }
};
</script>

<style lang="scss" scoped>
.desktop {
  display: none !important;
  @include media(">=dashbreak") {
    display: block !important;
  }
}

.mobile {
  display: block !important;
  @include media(">=dashbreak") {
    display: none !important;
  }
}
input,
select {
  background: white !important;
  border: 1.5px solid #ced4da58 !important;

  &:hover {
    //outline-color: lightgray !important;
    // border-color: lightgray !important;
  }
  &:focus {
    outline-color: $primary !important;
    border-color: $primary !important;
  }
}
.container {
  width: 100%;
  //position: relative;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; //padding: 16px;

  @include media("<=dashbreak") {
    background: transparent;
  }
}

.body {
  display: flex;
  //border: 0.5px solid rgba(53, 3, 3, 0.129);
  padding-bottom: 16px;

  @include media("<=dashbreak") {
    flex-direction: column;
  }
}

.header {
  padding: 16px;
  border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search {
  width: 80%;

  &__container {
    display: flex;
    position: relative;
  }

  svg {
    position: absolute;
    top: 0;
    left: 16px;
    margin-top: 12px;
  }

  input {
    border: 1.5px solid rgba(211, 211, 211, 0.442);
    width: 100%;
    padding: 10px 48px;
    color: grey;
    border-radius: 5px;
    font-size: 15px;
  }
}

.filter {
  width: 20%;
  &__header {
    padding: 16px 16px;
    color: grey;
    font-size: 16px;
    background: $dashboard-background-color;
    font-weight: 500;
    //border: $dashboard-background-color;
    //border: 0.5px solid rgba(53, 3, 3, 0.129);
    border-right: 0;
    border-top: 0;
    border-bottom: 0;

    //border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
  }

  button {
    @include largebutton;
    max-width: auto !important;
    width: 100% !important;
    //font-size: 14px !;
    border-radius: 5px;
    margin: auto !important;
    height: 40px !important;
    max-height: 40px !important;
    border: 0;
    color: white;
    padding: 0;
  }

  &__item {
    display: flex;
    flex-direction: column;
    padding: 8px 16px;

    label {
      font-size: 15px;
      color: grey;
      font-weight: 400;
      margin-bottom: 2px;
    }

    input {
      padding: 8px;
      color: grey;
      border-radius: 5px;
      font-size: 15px;
      border: 0.5px solid rgba(53, 3, 3, 0.129);
      appearance: none;
      -webkit-appearance: none;
    }
  }
  &__flex {
    display: flex;
    justify-content: space-between;

    input {
      width: 48%;
    }
  }
}

.mobile-filter {
  display: block;
  &__header {
    padding: 16px 16px;
    color: $charcoal;
    background: white;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background: $dashboard-background-color;
    }
    svg {
      margin-right: 10px;
    }
  }
  &__body {
    background: white;
    //padding: 16px 0px;
  }
  &__cta {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 8px 16px;

    button {
      @include smallbutton;
    }
  }
}

.list {
  width: 80%;

  //max-height: 200vh;
  @include media("<=dashbreak") {
    width: 100%;
  }
}

.sort {
  display: flex;
  align-items: center;
  width: 15%;
  p {
    font-size: 15px;
    color: grey;
    margin-right: 8px;
  }
  select {
    appearance: none;
    color: grey;
    font-size: 15px;
    border: 0.5px solid rgba(53, 3, 3, 0.129);
    border-radius: 5px;
    padding: 10px;
  }
}
.card {
  cursor: pointer;
  //min-height: 600px;
  //border-radius: 10px;
  width: 100%;
  margin: auto;
  //box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
  padding: 16px 16px;
  border: 0.5px solid rgba(53, 3, 3, 0.129);
  border-left: 0;
  border-right: 0;
  border-top: 0;
  background: white !important;
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 10;
  //align-items: center;
  margin-bottom: 2px;

  &:first-of-type {
    border-top: 0;
    @include media("<=dashbreak") {
      border: 0.5px solid rgba(53, 3, 3, 0.129);
    }
  }
  @include media("<=dashbreak") {
    flex-direction: column;
    margin-bottom: 8px;
    background: transparent;
  }

  @include media("<=t") {
    width: 100%;
  }
  //justify-content: space-between;
  &__image {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    background-color: rgba(211, 211, 211, 0.372);
    margin-right: 10px;
    @include media("<=dashbreak") {
      width: 100%;
    }

    //margin-right: 16px;
    img {
      //width: 50%;
      height: auto;
      object-fit: contain;
      @include media("<=dashbreak") {
        object-fit: cover;
      }
    }
  }
  &__body {
    //margin-top: 408px;
    width: 100%;
    button {
      @include smallbutton;
    }
    &__description {
      font-size: 16px;
      margin: 8px 0;
      font-weight: 300;
      color: $charcoal;
      @include media("<=dashbreak") {
        font-size: 14px;
        margin-top: 0;
        margin: 8px 0;
      }
    }
    &__header {
      display: flex;
      width: 100%;
      position: relative;
      //border: 1px solid grey;
      justify-content: space-between;

      @include media("<=dashbreak") {
        padding-top: 16px;
        align-items: center;
      }

      p {
        color: black;
        font-size: 20px;
        font-weight: 500;
        //display: block;
        width: 80%;

        @include media("<=dashbreak") {
          font-size: 16px;
        }
      }
      span {
        color: $primary;
        font-size: 15px;
        text-align: end;
        @include media("<=dashbreak") {
          font-size: 14px;
        }
      }

      button {
        @include smallbutton;
        margin-bottom: 0;
        position: absolute;
        top: 0;
        font-size: 14px;
        font-weight: 400;
        border-radius: 5px;
        right: 0;

        @include media("<=dashbreak") {
          position: relative;
          min-height: auto;
          height: 30px;
          display: flex;
          align-items: center;
        }
      }
    }

    &__details {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      button {
        @include largebutton;
        width: 100%;
        margin-top: 8px;
        margin-bottom: 16px;
      }

      &__detail {
        width: 25%;
        //border-top: 0.5px solid rgba(211, 211, 211, 0.442);
        //border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
        padding: 0px 0;
        @include media("<=dashbreak") {
          width: 45%;
          margin-bottom: 8px;
        }

        label {
          color: $charcoal;
          font-weight: 400;
          font-size: 15px;
          @include media("<=dashbreak") {
            font-size: 13px;
          }
        }

        p {
          font-size: 15px;
          color: $charcoal;
          font-weight: 300;
          @include media("<=dashbreak") {
            font-size: 13px;
          }
        }
      }
    }
  }
}

:deep(.pagination) {
  display: flex;
  width: auto;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  // margin: 3rem;
  border-radius: 0.6rem;
  //background: #ffffff;

  ul {
    height: auto;
    border: 1.5px solid lightgray;
    width: 100%;

    //box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
  }
  li {
    width: 100%;

    background: white;
    //border: 1px solid grey;
    cursor: pointer;
    color: grey;
    width: 2.6rem;
    height: 2.6rem;
    //border-radius: 0.4rem;
    //background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
  }
  p {
    color: grey;
    font-size: 14px;
  }
}

:deep(.VuePagination) {
  p {
    color: grey;
    font-size: 14px;
  }
}
</style>