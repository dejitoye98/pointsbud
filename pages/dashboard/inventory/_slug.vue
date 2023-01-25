<template>
  <div class="page">
    <h1>Edit your inventory</h1>
    <p class="page__caption">
      An inventory is a shareable collection of items that contain products for which you're a marketer.
      Create and inventory and share on your social media bio or uploads!
    </p>
    <div class="container">
      <InventoryChoiceModal v-if="add_product" @add="addProduct" @close="add_product=false" />
      <InventoryItemPreviewModal
        edit_mode="true"
        v-if="item_in_view"
        :product="item_in_view"
        :marketer="inventory.details.marketer"
        @close="item_in_view = null"
      />

      <div class="details" v-if="inventory && inventory.details">
        <div class="form-input">
          <input type="text" placeholder="Name" v-model="inventory.details.name" />
        </div>
        <div class="form-input">
          <input type="text" placeholder="Description" v-model="inventory.details.description" />
        </div>

        <button :disabled="changesMade">Save</button>
      </div>
      <div class="form">
        <div class="inventory">
          <div
            class="inventory__item"
            v-for="(item, i) in inventory.items"
            :key="i"
            @click="decideAction(item)"
          >
            <div class="inventory__item__picture" v-if="item.product">
              <img :src="item.product.thumbnail" alt />
            </div>
            <div class="inventory__item__placeholder" v-else>
              <p>Click to add product</p>
            </div>
            <p class="inventyr__item__label"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      inventory: {
        items: [],
        details: null
      },
      item_in_view: null,
      changesMade: false,
      add_product: false
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    addProduct(obj) {
      this.inventory.items[this.add_product].product = obj;

      this.inventory.items.push({});
      this.add_product = null;
    },
    decideAction(obj) {
      try {
        if (obj.product) {
          this.item_in_view = obj.product;
          this.show_modal = true;
        } else {
          this.add_product = this.inventory.items.indexOf(obj);
        }
      } catch (e) {
        console.log(e);
      }
    },
    getItems() {
      this.$api.get(`/inventory/${this.$route.params.slug}`).then(resp => {
        this.inventory.items = resp.data.data.list;
        this.inventory.items.push({});
        this.inventory.details = resp.data.data.details;
      });
    },
    previewItem(item) {
      this.item_in_view = item;
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  h1 {
    color: $faint;
    font-size: 25px;
    margin-bottom: 16px;
  }
  &__caption {
    font-size: 15px;
    color: $faint;
    width: 50%;
    margin-bottom: 16px;
  }
}

.container {
  background: white;
  width: max-content;
  @include card;
}
.details {
  width: 100%;
  padding: 16px;
  @include media("<=t") {
    width: 90%;
    margin: auto;
  }
  h1 {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }
  button {
    @include smallbutton;
  }
}

.empty {
  width: 100%;
  text-align: center;
}
.navbar {
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
}

.form {
  background: white;
  width: 100%;
  @include media("<=t") {
    width: 100%;
  }
}
.footer {
  width: 100%;
  button {
    @include smallbutton;
    width: 100%;
    padding: 16px 8px;
  }
}

.main {
  border: 1.5px solid whitesmoke;
  border-left: 0;
  border-right: 0;
  //ht: 70vh;
  overflow: scroll;
  background: white;
}

.inventory {
  padding: 8px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  justify-content: space-between;

  &__item {
    //border: 3px solid whitesmoke;
    width: 100%;
    height: 200px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: lightgrey;
    cursor: pointer;

    &:hover {
      background: whitesmoke;
      filter: grayscale(1);
    }

    &__placeholder {
      width: 100%;
      text-align: center;
    }

    &__picture {
      width: 100%;
      height: 100%;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}

.form-input {
  @include plain-form-input;
  input {
    background: white;
  }
}
</style>