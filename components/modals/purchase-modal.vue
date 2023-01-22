<template>
  <BaseModal @close="$emit('close', true)">
    <template #body>
      <div class="body" @click.stop>
        <div class="body__header">
          <div class="body__header__container">
            <p class="body__header__title">Order product</p>
            <p class="body__header__caption">{{product.name}}</p>
          </div>
        </div>

        <div class="form">
          <div class="form-input" v-for="(input, i) in form" :key="i">
            <label>{{input.field_name}}</label>
            <input
              :required="input.is_required"
              v-if="input.field_type === 'text'"
              v-model="order_form[input.field_alias]"
              type="text"
            />
            <select
              v-model="order_form[input.field_alias]"
              :required="input.is_required"
              v-else-if="input.field_type === 'multi-choice option'"
              type="text"
            >
              <option v-for="(option, o) in JSON.parse(input.field_options)" :key="o">{{option}}</option>
            </select>

            <template v-else-if="input.field_type === 'one-choice option'">
              <div class="single-choice">
                <label
                  class="checkbox"
                  v-for="(option, o) in JSON.parse(input.field_options)"
                  :key="o"
                >
                  <input type="radio" :value="option" v-model="order_form[input.field_alias]" />
                  {{option}}
                </label>
              </div>
            </template>
          </div>

          <div class="form__footer">
            <button @click="createOrder">Continue</button>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
export default {
	props: ['close', 'form', 'totalPrice', 'product', 'quantity', 'marketer'],
	data() {
		return {
			order_created: false,
			order: null,
			order_form: {},
		}
	},
	mounted(){
		if (this.form) {
			this.form.forEach(field => {
				this.order_form[field.field_alias] = "";
			});
		}
	},
	methods: {
		createOrder(){
			const payload = {
				form: this.order_form,
				product_id: this.product.id,
				amount_paid: this.product.unitprice,
				redir_link: this.$route.query.ref || this.marketer && this.marketer.redir_links && this.marketer.redir_links[0].redir_link,
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
		continuePurchase() {
		//this.createOrder()
		FlutterwaveCheckout({
			public_key:
			process.env.FLW_PUBLIC_KEY ||
			"FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
			tx_ref: `aftx_${Date.now()}`,
			amount: this.totalPrice,
			currency: "NGN",
			payment_options: "card, banktransfer, ussd",
			//redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
			meta: {
			//customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
			//is_business: this.userDetails.business? 1 : 0
			order_id: this.order_id
			},
			narration: `Purchase ${this.product.name}`,
			customer: {
			email: this.order_form.email  || this.order_form.email_address || this.order_form["Email Address"],
			phone_number: this.order_form.phone_number,
			name: this.order_form["Full Name"]
				? this.order_form["Full Name"]
				: this.order_form.first_name + this.order_form.last_name
			},
			customizations: {
			title: "Afflee",
			logo:
				"https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg"
			},
			callback: data => {
			//this.$store.commit('dashboard/setActionFundWallet', false);
			let payload = {
				type: "purchase",
				referrer: this.$route.query.referrer,
				order_id: this.order.id,
				product_id: this.product.id,
				...data
			};
			this.$api.post("/transactions/verify-flw", payload);
			}
		});
		//let payload = {type: 'purchase', order_id: this.order.id, ...{}}

		//this.$api.post('/transactions/verify-flw', payload)
		},
	}
}
</script>

<style lang="scss" scoped>
$primary: #540a18;


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
.form {
	padding: 16px 0px;
	border-bottom: 2px solid whitesmoke;
	width: 90%;
	margin: auto;

	&__footer {
		display: flex;
		justify-content: flex-end;
		button {
			@include smallbutton;
			background: $primary;
		}
	}

}
.form-input {
	@include plain-form-input;
	label{
		color: $charcoal;
		font-size: 14px;
	}
	input {
		background: white;
		border: 2px solid whitesmoke !important;

		&:focus {
			outline: 0;
			border: 0;
		}

	}
}

.body {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 20vh;
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
		color: $charcoal;
		
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
</style>