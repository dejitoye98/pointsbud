<template>
  <BaseModal customClass="ninety" @close="$emit('close', true)">
    <template #body>
      <div class="body" @click.stop>
        <div class="filter">
          <div class="filter__container">
            <select v-model="filter.selected">
              <option value="category">Category</option>
              <option value="campaign">Campaign</option>
              <option value="business">Business</option>
            </select>
            <input type="text" v-model="filter.value" :placeholder="filter.selected + ' name'" />
          </div>
          <div class="filter__button">
            <button>Search</button>
          </div>
        </div>

        <template v-if="loading">
          <div class="loading">Loading...</div>
        </template>

        <template v-else>
          <div class="items">
            <div class="item" v-for="(campaign, index) in campaigns" :key="index">
              <div class="item__header">{{campaign.campaign.title}}</div>
              <div class="item__body">
                <div
                  class="item__body__item"
                  v-for="(product, pindex) in campaign.campaign.products"
                  :key="pindex"
                  @click="addProduct(product)"
                >
                  <img :src="product.thumbnail" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </BaseModal>
</template>

<script>
export default {
	props: ['close', 'form', 'totalPrice', 'product', 'quantity'],
	data() {
		return {
			loading: true,
						filter: {
							selected: 'category',
							value: '',  
						},
			order: null,
						order_form: {},
						campaigns: []
		}
	},
	mounted(){
		if (this.form) {
			this.form.forEach(field => {
				this.order_form[field.field_alias] = "";
			});
		}
		},
		created() {
			this.getAddable();
		},
	methods: {
				getAddable() {
					this.loading  =true;
					this.$api.get(`/inventory/addable`).then(resp=> {
							this.campaigns = resp.data.data;
					}).catch(err=> {

					}).finally(() => {
						this.loading = false;
					})
				},
				addProduct(product) {
						this.$emit('add', product);
						this.$emit('close', true)
				},
				campaignHasProduct(campaign) {
				},
		createOrder(){
			const payload = {
				form: this.order_form,
				product_id: this.product.id,
				amount_paid: this.product.unitprice,
				redir_link: this.$route.query.ref,
				referrer: this.$route.query.referrer,
				qty: this.quantity,
			};
			this.$api
			.post(`/products/${this.product.id}/order`, payload)
			.then(resp => {
				this.order_created = true;
				this.show_modal = false;
				this.order = resp.data.data;

				this.continuePurchase();
			});
		},
		populateFormDetails() {
			if (this.product && this.product.order_forms) {
				this.product.order_forms.forEach(field => {
				this.form[field.field_alias] = "";
				});
			}
			},
		
	}
}
</script>

<style lang="scss" scoped>

.loading {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: $faint;
	margin-top: 16px;
}
.single-choice {
	display: grid;
	grid-template-columns: 20% 20% 20% 20%;
}
.chosen-fill {
	background: $primary;
	border: 1.8px solid $primary;
	color: white;
}
.checkbox{
	position: relative;
	width:75px;
	height: 40px;
	border: 1.8px solid $charcoal;
	border-radius: 5px;
	padding: 8px 16px;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	cursor: pointer;
	font-size: 16px;
	font-weight: 600;

	&:hover {
		background: $primary;
		border: 2px solid $primary;
		color: white;

		
	}
	
	
	input {
		position: absolute;
		width: 100%;
		height: 100%;
		top:0;
		left: 0;
		visibility: hidden;
	}
}
.filter {
		width: 100%;
		padding: 16px;
		//margin: auto !important;

		border: 1px solid whitesmoke;

		&__container {
				display: grid;
				grid-template-columns: 49% 49%;
				justify-content: space-between;

		}

		&__button {
				display: flex;
				justify-content: flex-end;
		}



		button {
				@include smallbutton;
				width: 20%;
				margin: auto !important;
				@include media("<=t") {
					width: 100%;
				}

		}

		input, select {
				margin-bottom: 8px;
				border: 1.5px solid lightgrey;
				transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
				border-radius: 5px;
				padding: 8px;
				font-size: 14px;
				color: $charcoal;
				font-weight: 400;
				appearance: none;
				widtH: 100%;

				&:active {
					 
				}


		}
}

.body {
	min-height: 200px;
	display: flex;
	flex-direction: column;
	margin-top: 10vh;
	width: 100%;
	&__text {
	text-align: center;
	font-size: 15px;
	}
	&__implication {
	font-size: 14px;
	text-align: center;
	}

	&__header {
	font-size: 18px;
	font-weight: 400;
	border-bottom: 0.5px solid rgba(211, 211, 211, 0.27);

	&__container {
		width: 90%;
		margin: auto;
		padding: 16px 0;

	}

	&__caption {
		font-size: 15px;
		
	}
	}
}
.footer {
	&__container {
	display: flex;
	justify-content: flex-end;
	padding: 16px;

	button {
		@include smallbutton;
		&:first-of-type {
		background: white;
		margin-right: 8px;
		color: rgb(27, 31, 35);
		}
	}
	}
}

.items {
		padding-bottom: 16px;
		.item {
			&__header {
					background: $dashboard-background-color;
					padding: 16px;
					font-size: 14px;
					font-weight: 500;
			}

			&__body {
					display: grid;
					grid-template-columns: 33.3% 33.3% 33.3%;
					justify-content: space-between;
					padding: 0 8px;

					&__item {
							border: 1px solid whitesmoke;
							cursor: pointer;

					}
			}
		}
}

</style>    
