<template>
    <div class="form">
        <div class="form-input">
            <p class="error">{{error}}</p>
            <label>Amount</label>
            <input type="number" v-model="amount" />
        </div>
        <div style="display: flex;justify-content:flex-end">
            <button class="button" @click="setAmountToFund">Fund</button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            error: '',
            amount: 0
        }
    },
    created() {
       if (!this.userDetails) {
           this.$store.dispatch('auth/getAuthUser')
       } 
    },
    methods: {
        generateTxRef() {

        },
        setAmountToFund() {
            if (!this.amount || this.amount === 1000) {
                this.error = "Amount must be greater than 1000"
                return
            }
            this.error = ''
            this.$store.commit('wallet/setAmountToFund', this.amount)
            // close modal
            FlutterwaveCheckout({
                public_key: process.env.FLW_PUBLIC_KEY ||  "FLWPUBK_TEST-ad1d316f90548fca239af66bd32bd954-X",
                tx_ref: `aftx_${Date.now()}`,
                amount: this.amount,
                currency: "NGN",
                payment_options: "card, banktransfer, ussd",
                //redirect_url: "https://ae83-102-89-45-99.ngrok.io/api/v1/transactions/verify-flw",
                meta: {
                    customer_id: this.userDetails.business ? this.userDetails.business.id : this.userDetails.id,
                    is_business: this.userDetails.business? 1 : 0
                },
                narration: "Wallet Funding",
                customer: {
                    email: this.userDetails.email, 
                    phone_number: this.userDetails.contact_phone_number,
                    name: this.userDetails.name,
                },
                customizations: {
                    title: "Afflee",
                    logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
                },
                callback: (data) => {
                    this.$store.commit('dashboard/setActionFundWallet', false);
                    let payload = {type: 'wallet_funding', business_id: this.userDetails.business.id, ...data}
                    this.$api.post('/transactions/verify-flw', payload)
                }
            });


        },
        
    },
    computed: {
        userDetails() {
            let details = window.localStorage.getItem('afUserDetails');
            if (!details){
                this.$store.dispatch('auth/getAuthUser')

            }
            return details && JSON.parse(details);
            
        }
    }
}
</script>


<style lang="scss" scoped>
.error {
    @include error;
}
.form-input {
    @include plain-form-input;
}
.button {
    @include smallbutton;
    min-height: auto;
    height: auto;
    width: auto;
    padding: 8px 16px;

}
.form {
    width: 100%;
}
</style>