
import DashboardLayout from '../../../components/layouts/dashboard-layout.vue';
<template>
    <DashboardLayout>

        <template #content>
            <div class="page">
                <div class="page__container">
                    <div class="notifications">
                        <div class="notification" v-for="(notification, index) in notifications">
                            <div class="notification__container">
                                <p class="text">{{notification.notification_text}}</p>
                                <span class="time">{{formatDate(notification.createdAt)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DashboardLayout>
    
</template>

<script>
import moment from 'moment'
import {mapGetters} from 'vuex';

export default {
    created() {
        this.$store.dispatch('dashboard/setActiveTab', 'Notifications')
        this.$store.dispatch('dashboard/setDashboardTitle', 'Notifications')
        this.$store.dispatch('dashboard/fetchNotifications')

    },
    data(){
        return {
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format("MMM DD")
        },
        
    },
    computed: {
        ...mapGetters('dashboard', ['notifications'])
    }
}

</script>
<style lang="scss" scoped>
.page {
    &__container{ 

    }
}

.text {
    font-size: 16px;
    font-weight: 500;
}

.time {
    font-size: 13px;
    font-weight: 300;
}

.notification {
    background-color: white;
    border: 1px solid lightgrey;
    margin-bottom: 2px;
    //border-radius: 20px;
    &__container {
        padding: 16px;
    }
}
</style>