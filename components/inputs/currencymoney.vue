<template>
  <div class="input">
    <select v-model="currency">
      <option value="NGN">NGN</option>
    </select>
    <input type="text" v-model="amount" />
  </div>
</template>


<script>
export default {
  data() {
    return {
      currency: "",
      amount: ""
    };
  },
  watch: {
    currency(value) {
      this.$emit("onCurrencyChange", value);
    },
    amount(value) {
      this.$emit("onPriceChange", value);
    }
  }
};
</script>
<style lang='scss' scoped>
.input {
  position: relative;
  @include plain-form-input;

  display: flex !important;
  flex-direction: row;
  select {
    width: 20%;
    border-top-right-radius: 0;
    border-right: 0;
    border-bottom-right-radius: 0;
    background: $dashboard-background-color;
  }
  input {
    width: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>