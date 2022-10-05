<template>
    <div class="transaction">
        <div class="panel">
            <div class="panel__item">
                <p>Amount</p>
                <p>N3000</p>
            </div>
            <div class="panel__item">
                <p>Status</p>
                <p>Ongoing</p>
            </div>
            <div class="panel__item">
                <p>Initiation Date</p>
                <p>Sep 20, 2022</p>
            </div>
            <div class="panel__item">
                <p>Arrival Date</p>
                <p>Sep 29, 2022</p>
            </div>
            <div class="panel__item">
                <p>Reference</p>
                <p>Earned this week</p>
            </div>
            <div class="panel__item">
                <p>N 5,000</p>
                <p>Earned this week</p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    layout: 'dashboard',
    data() {
        return {
            transaction_id: this.$route.params.id
        }
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', `Transaction - ${this.transaction_id}`)
        this.$store.commit('dashboard/setActive', 'Earnings')
        //this.getCampaign()
    },
}

</script>

<style lang="scss" scoped>

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
    flex-wrap: wrap;


    @include media("<=t") {
        
    }
    
    &__item {
        border-right: 0.5px solid rgba(211, 211, 211, 0.442);
        height: 100px;
        padding: 16px;
        width: 29%;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @include media("<=t") {
            padding: 8px;
            width: 100%;
            text-align: center;
            border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);
        }

        p {
            &:first-of-type {
                font-size: 25px;
                color: grey;
                @include media('<=t') {
                    font-size: 20px;
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