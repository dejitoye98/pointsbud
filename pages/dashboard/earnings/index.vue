<template>
    <div class="earnings">
        <div class="earnings__overvieww">
            <div class="panel">
                <div class="panel__item">
                    <p>N3,000</p>
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
        </div>

        <div class="section">
            <p class="section__title">Transactions</p>
            <Listing item_link="/dashboard/transactions/:id" :show_pagination="false" :records="transactions" :labels="transaction_listing_labels"/>
        </div>
    </div>
</template>


<script>
export default {
    layout: 'dashboard',

    created() {
        this.$store.commit('dashboard/setActive', 'Earnings')
        this.$store.commit('dashboard/setDashboardTitle', 'Earnings')
    },

    data() {
        return {
            transactions: [{id: 1}],
            transaction_listing_labels: {
                'Id': {
                    property: 'id',
                    type: 'text'
                },
                'Budget': {property: 'budget', type: 'money'},
                'Budget Left' : {property:'budget_left', type: 'money'},
                'Ends At': {property: 'ends_at', type: 'date'}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.earnings {

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