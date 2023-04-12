<template>
  <div class="page">


    <BaseModal v-if="create_product" @close="create_product = false">
      <template #header>Create new product</template>
      <template #body>
        <div class="form" @click.stop>
          <div class="form-input">
            <label for>Name</label>
            <input v-model="product.name" type="text" name />
          </div>
          <div class="form-input">
            <label for>Description</label>
            <input v-model="product.description" type="text" name />
          </div>
          <div class>
            <label for>Price</label>
            <Currencymoney @onCurrencyChange="changeProductCurrency" @onPriceChange="changeProductPrice" />
          </div>

          <div class="category-input">
            <label for>Category</label>
            <AddChooseCategory @onChoose="onChooseCategory" />
          </div>

          <div class="form-input">
            <label>Image</label>
            <ImageUpload @onImageUploaded="changeThumbnail" />
          </div>
          <div class="form-input">
            <label for>Percentage of product price to earn as points</label>
            <input v-model="product.points_to_earn_percentage_price" type="number" name />
          </div>

        </div>
      </template>
      <template #footer>
        <button @click.stop="createProduct" :disabled="flag_creating_product">Create</button>
      </template>
    </BaseModal>


    <BaseModal v-if="product_availability.show" @close="product_availability.show = false">
      <template #header>
        Product Availability
      </template>
      <template #footer>
        <button @click="updateProductAvailability">Update</button>
      </template>
      <template #body>
        <div class="av_modal">
          <div class="form-input">
            <label for="">Availability Status</label>
            <select v-model="product_availability.model.availability">
              <option value="available">Available</option>
              <option value="out-of-stock">Out of stock</option>
            </select>
          </div>
          <!-- 
          <div class="form-input" v-if="product_availability.model.availability == 'out-of-stock'">
            <label for="">Out of stock until</label>
            <timepicker :time="product_availability.model.out_of_stock_till"></timepicker>
          </div> -->
        </div>
      </template>
    </BaseModal>
    <div class="section-title">
      <p>Products</p>
      <div>
        <button @click="create_product = true">Create Product</button>
      </div>
    </div>

    <div class="section">
      <div class="products">

        <div class="product" v-for="(product, index) in products" :key="index">
          <div class="product__image">
            <img :src="product.thumbnail" alt="">
          </div>
          <div class="product__name">
            {{ product.name }}
          </div>
          <div class="product__price">
            {{ product.currency }} {{ product.unitprice | money }}
          </div>

          <div style="display: flex">

            <div class="product__points-earn">
              <img src="./../../../../static/coins.png" />
              {{ product.points_to_earn }}

            </div>

            <div class="product__points-deduct">
              <img src="./../../../../static/coins.png" />
              {{ product.points_to_deduct }}

            </div>

          </div>
          <div class="product__footer">
            <button :class="[product.availability === 'available' ? '' : 'product-unavailable']"
              @click="changeProductAvailability(product)">Change Status</button>
          </div>
        </div>

      </div>
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

      <!--<div class="table">
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
                                                                                                                  <td>{{ product.name }}</td>
                                                                                                                  <td>{{ product.category && product.category.name }}</td>
                                                                                                                  <td>{{ product.currency }} {{ product.unitprice | money }}</td>
                                                                                                                  <td>{{ product.points_to_deduct }}</td>
                                                                                                                  <td>{{ product.points_to_earn }}</td>
                                                                                                                </tr>
                                                                                                              </table>
                                                                                                            </div>-->
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin-dashboard",
  created() {
    this.$store.commit('dashboard/setActive', 'Products')
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
        description: "",
        points_to_earn: "",
        points_to_deduct: "",
        thumbnail: "",
        category_id: "",
        points_to_earn_percentage_price: "",
      },
      created_product: null,
      flag_creating_product: false,

      product_availability: {
        show: false,
        focused_product: null,
        model: {
          availability: ''
        }
      }
    };
  },
  computed: {
    filterQuery() { }
  },
  methods: {
    updateProductAvailability() {
      this.$api.put(`/products/${this.product_availability.focused_product.id}/availability`, { ...this.product_availability.model }).then(resp => {
        // change 
        this.$set(this.products.find(product => product.id === this.product_availability.focused_product.id), 'availability', this.product_availability.model.availability);
        this.product_availability.show = false;
      })
    },
    changeProductAvailability(product) {
      this.product_availability.focused_product = product;
      this.product_availability.show = true
    },
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
          this.create_product = true;
        }).catch(err => {
          alert(err?.response?.data?.data)

        })
        .finally(() => {
          this.flag_creating_product = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.av_modal {
  padding: 16px;
  width: 400px;


}

.product-unavailable {
  background: red !important;
}

.product-thumbnail {
  width: 70px;
  height: 70px;
  border-radius: 5px;
  padding: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 8px 0;
  }
}

.category-input {
  z-index: 1000000000000000;
}

.page {
  padding: 16px 36px;
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

.products {
  display: grid;
  grid-template-columns: 23% 23% 23% 23%;
  justify-content: space-between;
  margin-top: 0px;

  .product {
    padding: 24px;
    background: white;
    @include card;
    border-radius: 20px;
    height: max-content;
    cursor: pointer;

    transition: transform 0.2s ease-in-out, box-shadow 0.15s ease-in-out;


    margin-bottom: 50px;

    &:hover {
      transform: scale(1.05);
    }

    &__footer {
      button {
        width: 100%;
        @include smallbutton;

      }
    }

    &__image {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      margin: auto;
      margin-top: -50px;



      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover
      }

    }

    &__name {
      text-align: center;
      font-weight: 600;
      font-size: 15px;
      margin-top: 8px;
      text-transform: capitalize !important;
    }

    &__price {
      text-align: center;
      font-weight: 500;
      font-size: 15px;
      color: $charcoal;
      //margin-top: 8px;
    }

    &__points-earn {
      cursor: pointer;
      margin: auto;
      display: flex;
      align-items: center;
      margin: 8px auto;
      justify-content: center;
      color: lightseagreen;
      font-weight: 600;

      img {
        margin-right: 8px;
        height: 20px;
        width: 20px;
      }
    }

    &__points-deduct {
      cursor: pointer;
      margin: auto;
      display: flex;
      align-items: center;
      margin: 8px auto;
      justify-content: center;
      color: red;
      font-weight: 600;

      img {
        margin-right: 8px;
        height: 20px;
        width: 20px;
      }
    }
  }
}

.section-title {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  margin-top: 40px;

  p {
    font-size: 20px;
    margin-right: 16px;
    color: $charcoal;
    font-weight: 500;
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
  width: 600px;
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
