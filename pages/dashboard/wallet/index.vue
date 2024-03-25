
import DashboardLayout from '../../../components/layouts/dashboard-layout.vue';
<template>
    <DashboardLayout>
        <template #content>

            <div class="page">
                <div class="page__container">
                    <div class="overview flex gap-8 space-between">
        
                        <div class="balance">
                            <div class="balance__container">
                                <div>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z" fill="#FF9017"/>
                                        <g clip-path="url(#clip0_718_33700)">
                                        <path d="M27.1412 15.7141H22.1412C21.0045 15.7141 19.9145 16.1657 19.1107 16.9694C18.307 17.7731 17.8555 18.8632 17.8555 19.9999C17.8555 21.1365 18.307 22.2266 19.1107 23.0303C19.9145 23.834 21.0045 24.2856 22.1412 24.2856H27.1412V25.7141C27.1412 25.9036 27.0659 26.0853 26.932 26.2192C26.798 26.3532 26.6163 26.4284 26.4269 26.4284H13.5698C13.3803 26.4284 13.1986 26.3532 13.0647 26.2192C12.9307 26.0853 12.8555 25.9036 12.8555 25.7141V14.2856C12.8555 14.0961 12.9307 13.9145 13.0647 13.7805C13.1986 13.6465 13.3803 13.5713 13.5698 13.5713H26.4269C26.6163 13.5713 26.798 13.6465 26.932 13.7805C27.0659 13.9145 27.1412 14.0961 27.1412 14.2856V15.7141ZM22.1412 17.1427H27.8555V22.857H22.1412C21.3834 22.857 20.6567 22.556 20.1209 22.0202C19.5851 21.4843 19.284 20.7576 19.284 19.9999C19.284 19.2421 19.5851 18.5154 20.1209 17.9796C20.6567 17.4437 21.3834 17.1427 22.1412 17.1427ZM22.1412 19.2856V20.7141H24.284V19.2856H22.1412Z" fill="white"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_718_33700">
                                        <rect width="17.1429" height="17.1429" fill="white" transform="translate(11.4277 11.4287)"/>
                                        </clipPath>
                                        </defs>
                                        </svg>
                                        
                                </div>
        
                                <div class="details">
                                    <p>Available Balance</p>
                                    <p class="amount" v-if="wallet && wallet.available_balance">{{wallet.currency}} {{wallet.available_balance | money}}</p>
                                    <p class="amount" v-else-if="wallet">{{wallet.currency}} 0</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button class="withdraw-btn" :disabled="!wallet?.available_balance">Withdraw</button>
                        </div>
        
                        <div class="card" style="display: none;">
                            <div class="card__container">
                                <div>
                                    <svg width="47" height="46" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <ellipse cx="23.4509" cy="22.6778" rx="22.7516" ry="22.6778" fill="#E4F8FB"/>
                                        <path d="M28.8275 18.1426H15.5902C14.6764 18.1426 13.9355 18.881 13.9355 19.7919V29.6876C13.9355 30.5985 14.6764 31.3369 15.5902 31.3369H22.6225C22.851 31.3369 23.0362 31.1523 23.0362 30.9246V27.2137C23.0362 26.3028 23.777 25.5644 24.6909 25.5644H30.0685C30.297 25.5644 30.4822 25.3798 30.4822 25.1521V19.7919C30.4822 18.881 29.7414 18.1426 28.8275 18.1426Z" fill="#51D5EC"/>
                                        <path d="M24.6914 28.0385C24.6914 27.5831 25.0618 27.2139 25.5187 27.2139H31.3101C31.767 27.2139 32.1374 27.5831 32.1374 28.0385V32.1617C32.1374 32.6172 31.767 32.9864 31.3101 32.9864H25.5187C25.0618 32.9864 24.6914 32.6172 24.6914 32.1617V28.0385Z" fill="#51D5EC"/>
                                        </svg>
                                        
                                        
                                </div>
        
                                <div class="details">
                                    <p>Next Payout Date</p>
                                    <p class="date">Dec 31, 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="transactions">
                        <div class="transactions__header">
                            Wallet Transactions
                        </div>
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>

                            <tr v-if="wallet_transactions.length" v-for="(transaction, index) in wallet_transactions">
                                <t>{{transaction.createdAt}}</t>
                                <t>{{transaction.amount}}</t>
                                <t>{{transaction.debit_or_credit}}</t>
                                <t>{{transaction.status}}</t>
                            </tr>

                            <template v-else>
                                <div class="flex-center-y flex-center-x">
                                    No records found
                                </div>
                            </template>
                        </table>
                    </div>
                </div>
            </div>

        </template>
    </DashboardLayout>
</template>

<script>
export default {
    data() {
        return {
            wallet: null,
            payout_dates: [],
            wallet_transactions: [],
        }
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Wallet' )
        this.$store.commit('dashboard/setActiveTab', 'Wallet' )
        this.getWallet()
        this.getNextPayout()
    },
    methods: {
        getWallet() {
            this.$api.get('/wallets').then(resp=> {
                this.wallet =resp.data.data;
            })
        },
        getNextPayout(){
            this.$api.get('/payouts/dates').then(resp=> {
                this.payout_dates = resp.data.data
            })
        },
        getWalletTransactions() {
            this.$api.get('/wallets/transactions').then(resp=> {
                this.wallet_transactions = resp.data.data.items
            })
        }
    }
}

</script>


<style lang="scss" scoped>
* {
    font-family: "Open Sans", sans-serif;
}


.withdraw-btn {
    @include normalbutton;
    border-radius: 5px;

    &:disabled {
        background-color: lightgrey !important;
    }
}


table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-family: Poppins;
    //padding: 24px;
}

th, td {
    //border: 1px solid #ddd;
    //padding: 8px;
    font-size: 15px;

}

td {
    padding: 16px 24px;
    font-weight: 400;
    font-size: 15px;


}

th {
    //background-color: #f2f2f2;
    color: black;
    color: #000;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
min-width: 100px !important;
height: 60px;
background-color: #F0F1F3;

padding: 16px 24px;
color: #525f7f;
text-transform: uppercase;
//background-color: #f5f9fc;


}


tr {
    line-height: 40px !important;
    padding: 16px;
}
tr:nth-child(even) {
    //background-color: #f9f9f9;
}

tr:hover {
    //background-color: #e8e8e8;
}


.page {
    width: 100%;
    &__container {
        width: 100%;
    }
}

.balance, .card {
    background-color: $primary;
    color: white;
   // max-width: 300px;
     width: 45%;
    border-radius: 20px;
    &__container {
        //padding: 16px;
        padding:  32px;
        display: flex;
        gap: 10px;
    }


    .details {
        p {
            &:first-of-type {
                font-size: 13px;
                
            }
            &:last-of-type {
                font-size: 20px;
            }
        }
    }

    
}

.card {
    background-color: white;
    color: black;
}

.transactions {
    margin-top: 50px;

    &__header {
        font-size: 18px;
        font-weight: 500;
        line-height: 36px;
    }
}
</style>