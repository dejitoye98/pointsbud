<template>
    <div>
        <ListingNotifications :pagination="notifications.page_info" :notifications="notifications.list"/>
    </div>
</template>

<script>
export default {
    layout: 'dashboard',
    created() {
        this.$store.commit('dashboard/setDashboardTitle', "Notifications");
        this.getNotifications();
    },
    data() {
        return {
            loading: true,
            notifications: {
                list: [],
                page_info: ''
            }
        }
    },
    methods: {
        getNotifications() {
            this.$store.dispatch('dashboard/getNotifications', 30)
                .then(resp=> {
                    this.notifications.list = resp.data.data.list
                    this.notifications.page_info = resp.data.data.page_info
                })
        }
    }
}
</script>