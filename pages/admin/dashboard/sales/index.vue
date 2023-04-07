<template>
  <div class="page">
    <CreateSalesModal v-if="create_product" @close="create_product = false" />

    <div class="section-title">
      <p>Sales</p>
      <button @click="create_product = true">Create Order</button>
    </div>
    <div class="section">

      <!--
                                                                                                                                                                <div class="filter">
                                                                                                                                                                  <div class="filter__header">Filter</div>
                                                                                                                                                                  <div class="filter__container">
                                                                                                                                                                    <div class="filter__item">
                                                                                                                                                                      <label for>Product Name</label>
                                                                                                                                                                      <input type="text" placeholder="Name" />
                                                                                                                                                                    </div>

                                                                                                                                                                    <div class="filter__item">
                                                                                                                                                                      <label for>Category</label>
                                                                                                                                                                      <select>
                                                                                                                                                                        <option>Deji Atoyebi</option>
                                                                                                                                                                        <option>Deji Atoyebi</option>
                                                                                                                                                                        <option>Deji Atoyebi</option>
                                                                                                                                                                      </select>
                                                                                                                                                                    </div>
                                                                                                                                                                    <div class="filter__item">
                                                                                                                                                                      <label for>Deductible Points</label>
                                                                                                                                                                      <input type="text" placeholder="Name" />
                                                                                                                                                                    </div>
                                                                                                                                                                    <div class="filter__item">
                                                                                                                                                                      <label for>Addable Points</label>
                                                                                                                                                                      <input type="text" placeholder="Name" />
                                                                                                                                                                    </div>
                                                                                                                                                                  </div>
                                                                                                                                                                  <div style="display: flex; justify-content: flex-end; padding: 0 16px 16px 16px">
                                                                                                                                                                    <button>Filter</button>
                                                                                                                                                                  </div>
                                                                                                                                                                -->
    </div>

    <div class="table">

      <BaseTable>
        <template #header>

          <th></th>
          <th>Customer Name</th>
          <th>Price</th>
          <th>Points Earned</th>
          <th>Points Used</th>
        </template>

        <template #data>

          <tr v-for="(sale, index) in sales" :key="index">
            <td>
              <Avatar :name="sale.customer.name"></Avatar>
            </td>
            <td>{{ sale.customer.name }}</td>
            <td>{{ sale.currency }} {{ sale.total_amount | money }}</td>
            <td>{{ sale.points_earned }}</td>
            <td>{{ sale.points_used }}</td>
          </tr>
        </template>

      </BaseTable>
    </div>
  </div>
</div></template>

<script>
import BaseTable from '../../../../components/tables/base-table.vue';

export default {
  layout: "admin-dashboard",
  data() {
    return {
      create_product: false,
      create_sale: false,
      orders: [],
      sales: []
    };
  },
  created() {
    this.$store.commit('dashboard/setActive', 'Sales')
    this.getSales();
  },
  methods: {
    getOrders() {
      this.$api.get("/orders").then(resp => {
        this.orders = resp.data.data.list;
      }).catch(err => {
      });
    },
    getSales() {
      this.$api.get("/sales").then(resp => {
        this.sales = resp.data.data.list;
      }).catch(err => {
      });
    },
  },
  components: { BaseTable }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 36px;
}

.filter {
  margin-bottom: 16px;
  //background: whitesmoke;
  background: whitesmoke;
  @include card;
  //box-shadow: none;
  height: max-content;

  button {
    @include smallbutton;
    // min-height: 50px;
    //min-width: 150px;
    font-size: 16px;
    background: $lightaccent;
  }

  &__header {
    height: 50px;
    padding: 16px;
    font-size: 16px;
    background: $dashboard-background-color;
    border-bottom: 1px solid whitesmoke;

    p {
      font-size: 18px;
      color: $charcoal;
    }
  }

  &__container {
    padding: 24px;
    //display: grid;
    //grid-template-columns: 24% 24% 24% 24%;
    justify-content: space-between;
  }

  &__item {
    @include plain-form-input;
  }
}

.section {
  display: grid;
  grid-template-columns: 25% 74%;
  justify-content: space-between;
}

.section-title {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-top: 40px;

  p {
    font-size: 20px;
    font-weight: 500;
    margin-right: 16px;
    color: $charcoal;
  }

  button {
    @include smallbutton;
    background: $lightaccent;
  }
}

.table {
  //@include card;
  width: 100%;
  border-radius: 10px;
  height: max-content; //margin-top: 16px;
  background: white;


}

.form {
  padding: 16px;
}

.form-input {
  @include plain-form-input;

  &--noborder {
    border: 0 !important;

    input {
      border: 0 !important;
    }
  }
}
</style>
