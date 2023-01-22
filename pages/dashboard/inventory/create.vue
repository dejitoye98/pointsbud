<template>
  <div class="create">
    <InventoryChoiceModal v-if="show_modal" @add="addProduct" @close="show_modal=false" />
    <ConfirmationModal
      :text="confirmation_text"
      v-if="confirmation_text"
      @onCancel="confirmation_text =''"
      @onExecute="confirmation_text = ''"
    />

    <BaseModal v-if="show_created_modal" @close="show_created_modal=false">
      <template #body>
        <div class="created-modal" @click.stop>
          <div class="created-modal__header">
            <p>Inventory created!</p>
            <p>You can share the link to your inventory and get sales</p>
          </div>
          <div class="form-field" v-if="created_inventory">
            <div class="form-input">
              <label for>Link</label>
              <input disabled type="text" :value="'afflee.com/inventory/'+ created_inventory.slug" />
            </div>

            <svg
              @click="copyLink('link')"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </template>
    </BaseModal>

    <div class="form">
      <div class="form-input">
        <label for>Name of inventory</label>
        <input type="text" v-model="inventory.name" />
      </div>
      <div class="form-input">
        <label for>Description</label>
        <input type="text" v-model="inventory.description" />
      </div>

      <div class="main">
        <div class="inventory">
          <div
            class="inventory__item"
            v-for="(item, i) in inventory.items"
            :key="i"
            @click="show_modal = true; item_in_view = i"
          >
            <template v-if="!item.thumbnail">
              <div class="empty">Click to add a product</div>
            </template>
            <div class="inventory__item__picture" v-else>
              <img :src="item.thumbnail" alt />
            </div>
            <p class="inventyr__item__label"></p>
          </div>
        </div>
      </div>

      <div class="footer">
        <button @click="save">Save Inventory</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
    data(){
        return {
            show_modal: false,
            show_created_modal: false,
            created_inventory: {},
            inventory: {
                items: [{}],
                name: '',
            },
            item_in_view: 1,
            confirmation_text: '',
        }
    },

    methods: {
      copyLink() {
        let text = `afflee.com/inventory/${this.created_inventory.slug}`
        navigator.clipboard.writeText(text);
      },
        addProduct(obj) {
            this.inventory.items[this.item_in_view] = obj;
            
            if (this.inventory.items[this.inventory.items.length - 1].thumbnail) {
                this.inventory.items.push({})
            }
            
        },
        save() {
            if (!this.inventory.name) {
                this.confirmation_text = "If you don't set a name for the inventory, a random name will be assigned to it."
                return;
            }
            const product_ids = this.inventory.items.map(i=> i.id);
            this.$api.post('/inventory/', {
                name: this.inventory.name,
                products: product_ids
            }).then(resp=> {
                this.created_inventory = resp.data.data;
                this.show_created_modal =true;
                this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "Created your inventory " + this.inventory.name});
            }).catch(err=> {
                const error = err.response && err.response.data.data || err
                this.$store.dispatch('dashboard/actionShowErrorToast', {message: error}); // show error
            })
        }
    },
    
}
</script>

<style lang="scss" scoped>

.form-field {
	display: flex;
	align-items: center;
	justify-content: space-between;

	svg {
		cursor: pointer;
	}
}
.form-input {
	@include plain-form-input;
	input {
		color: $primary;
	}
	label {
		color: $charcoal;
	}
	
	width: 95%;
}
.created-modal {
  padding: 16px;
  width: 100%;
  color: $charcoal;
  &__header {
    margin-bottom: 16px;
    p{
      font-size: 14px;
      &:first-of-type {
        //font-weight: bold;
        font-size: 18px;
      }
    }
  }

}
.create {
  background: white;
  padding: 16px 0;
  border-radius: 10px;
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
    width: 50%;
    margin: auto;
    @include media("<=t") {
        width: 95%;
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
    max-height: 70vh;
    overflow: scroll;

}

.inventory {
    padding: 16px 0;
    display: grid;
    grid-template-columns: 32% 32% 32%;
    justify-content: space-between;

    &__item {
        border: 3px solid whitesmoke;
        width: 100%;
        height: 170px;
        margin-bottom: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        color: lightgrey;
        cursor: pointer;

        &:hover {
            background: whitesmoke;
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
    @include plain-form-input
}


</style>
