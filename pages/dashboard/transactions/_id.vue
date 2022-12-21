<template>
  <div class="transaction">
    <div class="panel">
      <div class="panel__item">
        <p>Amount</p>
        <p>{{transaction.currency||'NGN'}} {{transaction.amount}}</p>
      </div>
      <div class="panel__item">
        <p>Status</p>
        <p>{{transaction.status}}</p>
      </div>
      <div class="panel__item">
        <p>Initiation Date</p>
        <p>{{formatDate(transaction.createdAt)}}</p>
      </div>
      <div class="panel__item">
        <p>Arrival Date</p>
        <p>{{formatDate(transaction.createdAt)}}</p>
      </div>
      <div class="panel__item">
        <p>Reference</p>
        <p>{{transaction.tx_ref}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
export default {
  layout: "dashboard",
  data() {
    return {
      transaction_id: this.$route.params.id,
      transaction: {}
    };
  },
  created() {
    this.$store.commit(
      "dashboard/setDashboardTitle",
      `Transaction - ${this.transaction_id}`
    );
    this.$store.commit("dashboard/setActive", "Earnings");
    this.getTransaction();
  },

  methods: {
    getTransaction() {
      this.$api.get(`/transactions/${this.$route.params.id}`).then(resp => {
        this.transaction = resp.data.data;
      });
    },
    formatDate(date) {
      return moment().format("DD  MMMM, YYYY");
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  width: 100%;
  background: white;
  height: auto;
  justify-content: space-between;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
  border: 0.5px solid rgba(211, 211, 211, 0.442);
  background: white;
  flex-wrap: wrap;

  @include media("<=t") {
  }

  &__item {
    border-right: 0.5px solid rgba(211, 211, 211, 0.442);
    height: 100px;
    padding: 16px;
    width: 29%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include media("<=t") {
      padding: 8px;
      width: 100%;
      text-align: center;
      border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
    }

    p {
      &:first-of-type {
        font-size: 25px;
        color: $charcoal;
        @include media("<=t") {
          font-size: 20px;
        }
      }
      color: $charcoal;
    }
  }
  &:last-of-type {
    border-right: none;
  }
}
</style>