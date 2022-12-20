<template>
    <div class="wallet">
        <div class="wallet__overview">
            <div class="earnings__overvieww">
                <div class="currencies">
                    <div class="currencies__item" :class="[currency === 'NGN' ? 'selected' : '']" @click="switchCurrency('NGN')">NGN</div>
                    <div class="currencies__item"  :class="[currency === 'GHS' ? 'selected' : '']" @click="switchCurrency('GHS')">GHS</div>
                    <div class="currencies__item"  :class="[currency === 'KES' ? 'selected' : '']" @click="switchCurrency('KES')">KES</div>
                    <div class="currencies__item"  :class="[currency === 'USD' ? 'selected' : '']" @click="switchCurrency('USD')">USD</div>
                </div>
            </div>
            <div class="panel" v-if="loading">
                <LoadingState/>
            </div>
            <div class="panel" v-else>
                <div class="panel__item">
                    <p>{{userWallet && userWallet.currency || currency}} {{userWallet && Intl.NumberFormat('en-US').format(userWallet.available_balance) || 0}}</p>
                    <p>Available Balance</p>
                </div>
                <div class="panel__item">
                    <p>{{userWallet && userWallet.currency || currency}} {{userWallet && Intl.NumberFormat('en-US').format(userWallet.witheld_balance) || 0}}</p>
                    <p>Witheld balance</p>
                </div>
                
            </div>
            
            <div class="wallet__header" v-if="userContext === 'business'">
               <!-- <button  @click="initiateFundWallet">Fund Wallet</button>-->
               <button @click="initiateFundWallet">Fund</button>
               <button>Withdraw</button>
            </div>
        </div>

        <div class="section">
            <p class="section__title">Transactions</p>
            <Listing @onPaginationReload="getTransactions" :pagination="transactions_page_info" item_link="/dashboard/transactions/:id" :records="transactions" :labels="transaction_listing_labels" />
        </div>

        <Modal title='Fund Wallet' width="half" v-if="actionFundWallet" @close="closeFundWalletModal">
           <FormFundWallet />
       </Modal>
        
    </div>
</template>


<script>
import { mapGetters } from "vuex";
import LoadingState from '../../../components/states/LoadingState'


export default {
    layout: 'dashboard',
    components: {LoadingState},


    created() {
        this.$store.commit('dashboard/setActive', 'Wallet')
        this.$store.commit('dashboard/setDashboardTitle', 'Wallet')
        this.getWallets();
        this.getTransactions()
    },

    


    data() {
        return {
            currency: "NGN",
            transactions: [{id: 1}],
            transactions_page_info:{},
            transaction_listing_labels: {
                //'Currency' : {property:'currency', type: 'text'},
                "D/C": {
                    property: "debit_or_credit",
                    type: "debit_or_credit"
                },
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
        switchCurrency(currency) {
            this.currency = currency
            
        },
        getWallets() {
            this.loading = true
            this.$api.get('/wallets')
                .then(resp=> {
                    this.loading = false;
                    this.wallets = resp.data.data;
                }).catch(err=> {
                    this.loading = false;
                    this.error = true
                
                })
        },
        getTransactions(page) {
            let url = `/transactions/`
            if (page) url += `?page=${page}`
            this.$api.get(url)
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
        ...mapGetters('dashboard', ["actionFundWallet", "actionWithdrawWallet"]),
        userWallet() {
            const wallet = this.wallets.find(a => a.currency === this.currency)
            return wallet;
        },
        userContext() {
            return window.localStorage.getItem('afContext')
        }
    },
}
</script>

<style lang="scss" scoped>
.earnings {
    

}
.currencies {
    display: flex;
    &__item {
        margin-right: 8px;
        cursor: pointer;
    }
}

.selected {
    color: $primary;
}
.wallet {

    margin-top:  50px;
    &__header {
        display: flex;
        margin-top: 10px; 
        justify-content: flex-end;

        a {
            //@include editbutton;
            color: $primary;
            font-size: 15px;
            font-weight: 500;
            text-decoration: underline;
        }

        button {
            @include editbutton;
            
            background: white;
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
        width: 50%;
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