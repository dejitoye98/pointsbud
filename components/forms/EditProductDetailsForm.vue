<template>
  <div v-if="show">
    <BaseModal @close="close">
      <template #body>
        <div class="body__header" @click.stop>
          <h2>Edit Product</h2>
        </div>
        <div class="form" @click.stop>
          <div class="form__container">
            <div class="form-input">
              <label for>
                Product Name
                <span class="red">*</span>
              </label>
              <input
                type="text"
                placeholder="Afflee's marketing software"
                v-model="local_product.name"
              />
            </div>
            <div class="form-input">
              <label for>
                Product Description
                <span class="red">*</span>
              </label>
              <textarea type="text" placeholder v-model="local_product.description"></textarea>
            </div>
            <div class="form-input">
              <label for>Advert note</label>
              <textarea
                placeholder="This is the text that marketers will use in advertising this link to their audience"
                v-model="local_product.advert_note"
              ></textarea>
            </div>

            <div class="form-input">
              <label for>
                Quantity Available
                <span class="red">*</span>
              </label>
              <input type="number" v-model="local_product.qty" />
            </div>

            <div class="form-input">
              <label for>Quantity Per Unit</label>
              <input type="number" value="1" v-model="local_product.qty_per_unit" />
            </div>

            <div class="half">
              <div class="form-input">
                <span class="error">{{errors.budget}}</span>
                <label for>Price Per Unit</label>
                <!--<input  v-model="campaign.budget" type="number"-->
                <div style="width: 98%; height:50px; border-radius:4px;">
                  <CurrencyMoneyInput @onChange="setPricePerUnit" :classes="[plain-form-input]" />
                </div>
              </div>

              <div class="form-input">
                <label for>Discount (%)</label>
                <input type="number" v-model="local_product.discount" />
              </div>
            </div>

            <div class="half">
              <div class="form-input">
                <label for>
                  Marketer Commission Amount
                  <span class="red">*</span>
                </label>
                <!--<input  v-model="campaign.budget" type="number"-->
                <div style="width: 98%; height:50px; border-radius:4px;        ">
                  <input type="number" v-model="local_product.marketer_commission" />
                </div>
              </div>
              <div class="form-input">
                <label for>Market Commission Type</label>
                <select v-model="local_product.marketer_commission_type">
                  <option value="flat">Flat</option>
                  <option value="percent">Percent</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form__footer">
            <button @click="edit">Edit</button>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>


<script>
import Modal from "../Modal";
import CurrencyMoneyInput from "../inputs/CurrencyMoneyInput";
export default {
  props: ["product", "show"],
  components: {
    CurrencyMoneyInput
  },
  mounted() {
    this.local_product = JSON.parse(JSON.stringify(this.product));
  },
  data() {
    return {
      errors: {},
      local_product: {},
      loading: false
    };
  },
  watch: {
    product() {
      this.local_product = JSON.parse(JSON.stringify(this.product));
    }
  },
  methods: {
    setPricePerUnit(val) {
      //remember
      this.local_product.unitprice = val;
    },
    close() {
      this.$emit("close");
    },
    edit() {
      this.loading = true;
      this.$api
        .put("/products/" + this.product.id, this.local_product)
        .then(resp => {
          this.loading = false;
          this.$store.dispatch("dashboard/actionShowSuccessToast", {
            message: "Successfully updated the product"
          });
          this.close();
        })
        .catch(err => {
          this.loading = false;

          this.$store.dispatch("dashboard/actionShowErrorToast", {
            message: (err.response && err.response.data.data) || err
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.body {
  &__header {
    border-bottom: 1px solid whitesmoke;
    padding: 16px;
  }
}
.half {
  display: flex;
  justify-content: space-between;
  width: 100% !important;
  .form-input {
    width: 100% !important;

    input,
    select,
    textarea {
      width: 98% !important;
    }

    input[type="radio"] {
      width: 50px !important;
      height: 50px;
    }
  }
}

.form-input {
  @include plain-form-input;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  &:deep(.mx-datepicker) {
    height: 50px !important;
    width: 98%;
  }
  &:deep(.mx-input-wrapper) {
    height: 50px !important;
  }
  &:deep(.mx-input) {
    height: 50px !important;
  }

  label {
    font-size: 15px;
    color: $charcoal;
    font-weight: 400;
    margin-bottom: 5px;
  }

  input,
  select,
  textarea {
  }

  textarea {
    height: 200px;
  }
}

.form {
  padding: 16px;
  &__footer {
    display: flex;
    justify-content: flex-end;

    button {
      @include smallbutton;
      width: auto;
      height: auto;
      min-height: auto;
      padding: 8px 24px !important;
    }
  }
}
</style>