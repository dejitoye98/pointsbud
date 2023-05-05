<template>
  <div class="page">
    <BaseModal v-if="create_customer" @close="create_customer = false">
      <template #header>Register Customer</template>
      <template #body>
        <div class="add-customer">
          <div class="form" @click.stop>
            <div class="form-input">
              <label for>Name</label>
              <input type="text" v-model="new_customer.name" />
            </div>
            <div class="form-input">
              <label for>Email</label>
              <input type="text" v-model="new_customer.email" />
            </div>

            <div class="form-input">
              <label for>Phone</label>
              <input type="text" v-model="new_customer.phone" />
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <button @click.stop="createCustomer">Register</button>
      </template>
    </BaseModal>
    <div class="insights">
      <div class="insights__container">
        <div class="card">
          <div class="card__header">
            <div></div>Total Customers
          </div>
          <p> {{ stats.customers_count }}</p>
          <!--<p>243</p>-->
        </div>
        <!--  <div class="card">
          <div class="card__header">
            <div></div>Returned this Month
          </div>
          <p>{{ stats.customers_returned }}</p>
          <p>72</p>
        </div> -->
      </div>
    </div>

    <div class="section-title">
      <p>Customers</p>
      <button @click="triggerCreateCustomer">Register Customer</button>
    </div>
    <div class="table" v-if="customers">
      <BaseTable>
        <template #header>

          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Code</th>
          <th>Points Earned</th>
          <th>Purchases</th>
        </template>

        <template #data>

          <tr v-for="(customer, index) in customers" :key="index" @click="goToCustomer(customer)">
            <td>
              <Avatar :name="customer.name"></Avatar>
            </td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.code }}</td>
            <td>{{ customer.business_customer[0].points || 0 }}</td>
            <td>{{ customer.business_customer[0].purchases || 0 }}</td>
          </tr>
        </template>

      </BaseTable>
    </div>
  </div>
</template>

<script>
import BaseTable from '../../../../components/tables/base-table.vue';

export default {
  layout: "admin-dashboard",
  data() {
    return {
      new_customer: {
        name: "",
        email: "",
        phone: ""
      },
      stats: {
        customers_returned: 0,
        customers_count: 0
      },
      create_customer: false,
      customers: null
    };
  },
  created() {
    this.getCustomers();
    this.getStats();
  },
  methods: {
    getStats() {
      this.$api.get("/stats/customers").then(resp => {
        this.stats.customers_returned = resp.data.data.customer_returned;
        this.stats.customers_count = resp.data.data.customer_count;
      });
    },
    goToCustomer(customer) {
      this.$router.push("/admin/dashboard/customers/" + customer.id);
    },
    triggerCreateCustomer() {
      this.create_customer = true;
    },
    createCustomer() {
      this.$api
        .post("/customers", this.new_customer)
        .then(resp => {
          this.create_customer = false;
          this.getCustomers();
        })
        .catch(err => { });
    },
    getCustomers() {
      this.$api.get("/customers").then(resp => {
        this.customer_list_info = resp.data.data.page_info;
        this.customers = resp.data.data.list;
      });
    }
  },
  components: { BaseTable }
};
</script>

<style lang="scss" scoped>
.section-title {
  display: flex;
  justify-content: space-between;
  margin-top: 10vh;
  margin-bottom: 16px;
  align-items: flex-end;

  p {
    color: $charcoal;
    font-size: 20px;
    font-weight: 500
  }

  button {
    @include smallbutton;
  }
}

.add-customer {
  width: 600px;

  .form {
    padding: 24px;
  }

  .form-input {
    @include plain-form-input;
  }
}

.page {
  padding: 36px;
}

.insights {
  width: 100%;

  &__container {
    width: 100%;
    display: flex;
    flex-wrap: wrap
  }
}

.card {
  @include card;
  padding: 16px;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  background: rgb(77, 195, 189);
  margin-right: 16px;

  &:last-of-type {
    background-color: #ff7777;

  }

  &__header {
    color: white;
    display: flex;
    align-items: center;
    font-size: 18px;

    div {
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: white;
      margin-right: 16px;
    }
  }

  p {
    margin-left: 31px;
    font-size: 40px;
    color: white;

  }
}

.table {
  //margin-top: 10vh;
  width: 100%;
  //border-radius: 10px;

  table {
    font-size: 15px;
    width: 100%;

    tr {
      border-bottom: 1px solid whitesmoke;
      height: 45px;
      cursor: pointer;

      &:hover {
        background: $dashboard-background-color;
      }
    }

    th {
      //background: $dashboard-background-color;
      background: white;
      color: $charcoal;
      text-align: left;
      padding: 0 16px;
      font-weight: 500;
    }

    td {
      text-align: left;
      color: $charcoal;
      padding: 0 16px;
    }
  }
}
</style>
