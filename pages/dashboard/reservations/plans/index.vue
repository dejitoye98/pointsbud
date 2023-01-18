<template>
    <div class="container">
        <ReservationsTabs/>

        <template v-if="loading">
            <LoadingState/>
        </template>

        <template v-else>
            <div v-for="(plan, index) in list" :key="index">
                <ReservationPlan :plan="plan"/>
            </div>
        </template>

    </div>
</template>

<script>
export default {
    layout: "dashboard",
    
    data() {
        return {
            list: [],
            loading: true
        }
    },
    created() {
        this.$store.commit('dashboard/setActive', 'Reservations')
        this.$store.commit('dashboard/setDashboardTitle', 'Reservations'); 
        this.getPlans()
    },
    methods: {
        getPlans() {
            this.loading = true
            this.$api.get('/reservations/plans').then(resp=> {
                this.list = resp.data.data;
            }).finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>