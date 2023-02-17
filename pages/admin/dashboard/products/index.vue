<template>
  <div class="page">
    <BaseModal v-if="create_product" @close="create_product=false">
      <template #header>Create new product</template>
      <template #body>
        <div class="form" @click.stop>
          <div class="form-input">
            <label for>Name</label>
            <input v-model="product.name" type="text" name />
          </div>
          <div class>
            <label for>Price</label>
            <Currencymoney
              @onCurrencyChange="changeProductCurrency"
              @onPriceChange="changeProductPrice"
            />
          </div>

          <div class="category-input">
            <label for>Category</label>
            <AddChooseCategory @onChoose="chooseCategory" />
          </div>

          <div class="form-input">
            <label>Image</label>
            <ImageUpload @onImageUploaded="changeThumbnail" />
          </div>

          <div class="form-input">
            <label for>Points to earn</label>
            <input v-model="product.points_to_earn" type="number" name />
          </div>
          <div class="form-input">
            <label for>Points to deduct</label>
            <input v-model="product.points_to_deduct" type="number" name />
          </div>
        </div>
      </template>
      <template #footer>
        <button @click.stop="createProduct">Create</button>
      </template>
    </BaseModal>

    <div class="section-title">
      <p>Products</p>
      <button @click="create_product = true">Create Product</button>
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
            <label for>Earnable Points</label>
            <input type="text" placeholder="Name" />
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; padding: 0 16px 16px 16px">
          <button>Filter</button>
        </div>
      </div>-->

      <div class="table">
        <table>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>Categories</th>
            <th>Price</th>
            <th>Deductible Points</th>
            <th>Addable Points</th>
          </tr>

          <tr v-for="(product, index) in products" :key="index">
            <td>
              <img class="product-thumbnail" :src="product.thumbnail" alt />
            </td>
            <td>{{product.name}}</td>
            <td>{{product.category && product.category.name}}</td>
            <td>{{product.currency}} {{product.unitprice | money}}</td>
            <td>{{product.points_to_deduct}}</td>
            <td>{{product.points_to_earn}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin-dashboard",
  created() {
    this.getProducts();
  },
  data() {
    return {
      create_product: false,
      products: null,
      filter: {
        name: "",
        category: "",
        points_to_earn: "",
        points_to_deduct: ""
      },
      product: {
        name: "",
        currency: "",
        unitprice: "",
        points_to_earn: "",
        points_to_deduct: "",
        thumbnail: "",
        category_id: ""
      },
      created_product: null,
      flag_creating_product: false
    };
  },
  computed: {
    filterQuery() {}
  },
  methods: {
    changeThumbnail(meta) {
      this.product.thumbnail = meta.image;
    },
    onChooseCategory(value) {
      this.product.category_id = value;
    },
    changeProductCurrency(value) {
      this.product.currency = value;
    },
    changeProductPrice(value) {
      this.product.unitprice = value;
    },

    getProducts() {
      this.$api.get(`/products`).then(resp => {
        this.products = resp.data.data;
      });
    },
    createProduct() {
      this.flag_creating_product = true;
      this.$api
        .post("/products", this.product)
        .then(resp => {
          this.getProducts();
          this.create_product = false;
        })
        .finally(() => {
          this.flag_creating_product = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.product-thumbnail {
  width: 70px;
  height: 70px;
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.category-input {
  z-index: 1000000000000000;
}
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
  //display: grid;
  //grid-template-columns: 25% 74%;
  //justify-content: space-between;
  width: 100%;
}
.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  margin-top: 40px;
  p {
    font-size: 18px;
    margin-right: 16px;
    color: $charcoal;
  }
  button {
    @include smallbutton;
    background: $lightaccent;
  }
}
.table {
  @include card;
  width: 100%;
  border-radius: 10px;
  height: max-content; //margin-top: 16px;
  table {
    width: 100%;
    tr {
      border-bottom: 1px solid whitesmoke;
      height: 65px;
      cursor: pointer;
      &:hover {
        background: $dashboard-background-color;
      }
    }
    th {
      background: $dashboard-background-color;
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

.form {
  padding: 16px;
  width: 400px;
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
