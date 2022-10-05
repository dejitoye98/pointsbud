<template>
    <div class="wallet">
        <div class="wallet__overview">
            <div class="panel">
                <div class="panel__item">
                    <p>{{userWallet && userWallet.currency}} {{userWallet && Intl.NumberFormat('en-US').format(userWallet.available_balance)}}</p>
                    <p>Available Balance</p>
                </div>
                <div class="panel__item">
                    <p>N 1,000</p>
                    <p>Earned today</p>
                </div>
                <div class="panel__item">
                    <p>N 5,000</p>
                    <p>Earned this week</p>
                </div>
            </div>
            <div class="wallet__header">
               <!-- <button  @click="initiateFundWallet">Fund Wallet</button>-->
               <a>Fund Wallet</a>
            </div>
        </div>

        <div class="section">
            <p class="section__title">Transactions</p>
            <Listing :pagination="transactions_page_info" item_link="/dashboard/transactions/:id" :records="transactions" :labels="transaction_listing_labels"/>
        </div>

        <Modal title='Fund Wallet' width="half" v-if="actionFundWallet" @close="closeFundWalletModal">
           <FormFundWallet />
       </Modal>
    </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
    layout: 'dashboard',

    created() {
        this.$store.commit('dashboard/setActive', 'Wallet')
        this.$store.commit('dashboard/setDashboardTitle', 'Wallet')
        this.getWallets();
        this.getTransactions()
    },

    computed: {
        ...mapGetters('dashboard', ['actionFundWallet'])
    },


    data() {
        return {
            transactions: [{id: 1}],
            transactions_page_info:{},
            transaction_listing_labels: {
                'Currency' : {property:'currency', type: 'text'},
                'Amount': {
                    property: 'amount',
                    type: 'money'
                },
                'Reference': {property: 'tx_ref', type: 'text'},
                'Status': {property: 'status', type: 'text'},
                'Payment Type': {property: 'payment_type', type: 'text'},
            },
            wallets: [],


            loading: true,
            error: true,
        }
    },
    methods: {
        getWallets() {

            this.$api.get('/wallets')
                .then(resp=> {
                    this.loading = false;
                    this.wallets = resp.data.data;
                }).catch(err=> {
                    this.loading = false;
                    this.error = true
                
                })
        },
        getTransactions() {
            this.$api.get('/transactions')
                .then(resp => {
                    this.transactions = resp.data.data.list;
                    this.transactions_page_info = resp.data.data.page_info
                })
        },
        initiateFundWallet() {
            this.$store.commit('dashboard/setActionFundWallet', true);
        },
        closeFundWalletModal() {
            this.$store.commit('dashboard/setActionFundWallet', false);
        }
    },
    computed: {
        userWallet() {
            const wallet = this.wallets.find(a => a.currency === "NGN")
            return wallet;
        }
    },
}
</script>

<style lang="scss" scoped>
.wallet {

    margin-top:  50px;
    &__header {
        display: flex;
        margin-top: 10px; 
        justify-content: flex-end;

        a {
            color: $primary;
            font-size: 15px;
            font-weight: 500;
            text-decoration: underline;
        }

        button {
            @include largebutton;
            background: #DE5C6E;
                border: 2px solid #DE5C6E;
                border-radius: 10px;
                box-sizing: border-box;
                color: #FFFFFF;
                cursor: pointer;
                display: inline-block;
                font-size: 16px;
                font-weight: 500;
                line-height: normal;
                margin: 0;
                min-height: auto;
                min-width: auto;
                outline: none;
                padding: 8px 16px;
                text-align: center;
                text-decoration: none;
                transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
                -moz-user-select: none;
                user-select: none;
                -webkit-user-select: none;
                touch-action: manipulation;
                width: auto;
                will-change: transform;
                margin-bottom: 8px;
                height: auto;
                margin-right: 20px;
                font-size: 14px;
                padding: 8px;
                height: auto !important;
                font-weight: 400;
                width: auto !important;
                color: white;
                border-radius: 5px;
                min-height: auto;
                cursor: pointer;
                margin-bottom: 0;
            
        }
    }

}

.section {
    margin-top: 50px;
    &__title {
        font-size: 16px !important; 
        font-weight: 400 !important;
        color: grey !important;
        margin: 8px 0;
    }
}

.panel {
    display: flex;
    width: 100%;
    background: white;
    height: auto;
    justify-content: space-between;
    border-radius: 10px;
    width: 100%;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
     border: 0.5px solid rgba(211, 211, 211, 0.442);
    background: white;

    @include media("<=t") {
        
    }
    
    &__item {
        border-right: 0.5px solid rgba(211, 211, 211, 0.442);
        height: 100px;
        padding: 16px;
        width: 30%;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @include media("<=t") {
            padding: 8px;
            width: 100%;
        }

        p {
            &:first-of-type {
                font-size: 30px;
                color: black;
                @include media('<=t') {
                    font-size: 24px;
                }
            }
            color: grey;
        }
    }
    &:last-of-type {
        border-right: none;
    }
}
</style>