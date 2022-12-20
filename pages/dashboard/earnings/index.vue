<template>
    <div class="earnings">
        <div class="earnings__overvieww">
            <div class="currencies">
                <div class="currencies__item" :class="[earnings_currency === 'NGN' ? 'selected' : '']" @click="switchCurrency('NGN')">NGN</div>
                <div class="currencies__item"  :class="[earnings_currency === 'GHS' ? 'selected' : '']" @click="switchCurrency('GHS')">GHS</div>
                <div class="currencies__item"  :class="[earnings_currency === 'KES' ? 'selected' : '']" @click="switchCurrency('KES')">KES</div>
                <div class="currencies__item"  :class="[earnings_currency === 'USD' ? 'selected' : '']" @click="switchCurrency('USD')">USD</div>
            </div>
            <div class="panel" v-if="loading">
                <LoadingState/>
            </div>
            <div class="panel" v-else>
                <div class="panel__item">
                    <p>{{earnings_currency}} {{ wallet && wallet[0] ? formatMoney(wallet[0].available_balance) : 0}}</p>
                    <p>Available Balance</p>
                </div>
                <div class="panel__item">
                    <p>{{earnings_currency}} {{earnings_stats.today_earnings && formatMoney(earnings_stats.today_earnings.total) || 0}}</p>
                    <p>Earned today</p>
                </div>
                <div class="panel__item">
                    <p>{{earnings_currency}} {{earnings_stats.week_earnings && formatMoney(earnings_stats.week_earnings.total) || 0}}</p>
                    <p>Earned this week</p>
                </div>
            </div>
        </div>

        <div class="section">
            <p class="section__title">Earnings History</p>
            <Listing item_link="/dashboard/transactions/:id" :show_pagination="true" :pagination="earnings_page_info" :records="earnings" :labels="earnings_history_labels"/>
        </div>
    </div>
</template>


<script>
import LoadingState from '../../../components/states/LoadingState'
export default {
    layout: 'dashboard',
    components: {LoadingState},

    created() {
        this.$store.commit('dashboard/setActive', 'Earnings')
        this.$store.commit('dashboard/setDashboardTitle', 'Earnings');
        
        this.getEarnings();
        this.getWallet();
        this.getEarningsStats()
    },
    methods: {
        formatMoney(value) {
            return Intl.NumberFormat('en-US').format(value)

        },
        switchCurrency(currency) {
            this.earnings_currency = currency
            this.getWallet();
            this.getEarningsStats();
        },
        getWallet() {
            this.loading = true;
            this.$api.get('/wallets?currency=' + this.earnings_currency)
                .then(resp=> {
                    this.loading = false;
                    this.wallet = resp.data.data;
                }).catch(err=> {
                    this.loading = false;
                
                })
        },
        getEarningsStats() {
            //this.loading = true;
            this.$api.get('/earnings/stats?currency=' + this.earnings_currency).then(resp=> {
                this.earnings_stats = resp.data.data;
               // this.loading = false;
            }).catch(err=> {
                //this.loading = false;
            })
        },
        getEarnings() {
            this.$api.get('/earnings?currency=' + this.earnings_currency).then(resp=> {
                this.earnings = resp.data.data.list;
                this.earnings_page_info = resp.data.data.page_info;
               // this.loading = false;
            }).catch(err=> {
                //this.loading = false;
            })
        }
    },
    data() {
        return {
            wallet: {},
            loading: true,
            earnings: [],
            earnings_currency: "NGN",
            earnings_stats: {},
            earnings_history_labels: {
                'Amount Earned': {
                    prefix_property: 'currency',                    
                    property: 'amount_earned',
                    type: 'money'
                },
                'From Business': { property: 'business.name', type: 'text'},
               // 'Balance Before': { prefix_property: 'currency', property: 'balance_before', type: 'money'},
               // 'Balance After' : {prefix_property: 'currency', property:'balance_after', type: 'money'},
                'Date': {property: 'createdAt', type: 'date'}
            },
            earnings_page_info: {},
        }
    }
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
    box-sizing: border-box;

    @include media("<=t") {
        
    }
    
    &__item {
        box-sizing: border-box;
        border-right: 0.5px solid rgba(211, 211, 211, 0.442);
        height: 100px;
        padding: 16px;
        width: 30%;
        min-height: 200px;
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