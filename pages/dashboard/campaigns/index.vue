<template>
    <div>
        <Modal></Modal>
    </div>
</template>


<script>
export default {
    layout: 'dashboard',

    created() {
        this.$store.commit('dashboard/setActive', 'Campaigns')
        this.$store.commit('dashboard/setDashboardTitle', 'Campaigns')
    }
}
</script>