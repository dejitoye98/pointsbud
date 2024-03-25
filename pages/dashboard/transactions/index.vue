<template>
    <DashboardLayout>
        <template #content>
            <div class="transactions">
                <div class="transactions__container">
                    
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Debit/Credit</th>
                            <th>Naration</th>
                            <th>Status</th>

                        </tr>

                        <tr v-for="(transaction, index) in transactions">
                            <td>
                                {{ formatDate(transaction.createdAt)  }}
                            </td>

                            <td>{{transaction.amount}}</td>
                            <td>{{ transaction.currency  }} {{transaction.debit_or_credit}}</td>
                            <td>{{transaction.narration}}</td>
                            <td>
                                <span class="tag">
                                    {{transaction.status}}
                                </span>
                               </td>

                        </tr>
                    </table>
                    
                </div>
            </div>
        </template>
    </DashboardLayout>
</template>


<script>
import moment from 'moment';
import {mapGetters} from 'vuex';

export default {
    data() {
        return{
            transactions: [],
            page_meta: null,
        }
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Transactions' )
        this.$store.commit('dashboard/setActiveTab', 'Transactions' );
        this.getTransactions()
    },
    methods: {
        getTransactions() {
            this.$api.get('/transactions').then(resp=> {
                this.transactions = resp.data.data.items;
                this.page_meta = resp.data.data.meta;
            })
        },
        formatDate(date) {
            return moment(date).format("MMM DD, YYYY").toString()
        }
    }
}
</script>

<style lang="scss" scoped>

* {
    font-family: 'Open Sans', sans-serif;

}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-family: "Open Sans" sans-serif;
    background-color: white;
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

.tag {
    background-color: #E7F4EE;
    padding: 2px 16px;
    box-sizing: content-box;
    color: #0D894F;
    border-radius: 100px;

    &--failed {
        background-color: rgba(255, 0, 0, 0.451);
        color: red;
    }
}
</style>