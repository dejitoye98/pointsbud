<template>
    <div class="layout" style="height:100% !important">
        <div class="sidebar">
        <Toast/>

            <AppSidebar :context="userContext"/>
        </div>
        <div class="main-container">

            <AppDashboardTopbar :context="userContext"/>
            <main class="body">
                <div class="body__container">
                    <Nuxt/>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import Toast from '../components/general/Toast';

export default {
    components: {
        Toast
    },
    methods: {
        getAuthUser() {
            this.$api.get('/users/self').then(resp=> {
                window.localStorage.setItem('afUserDetails', JSON.stringify(resp.data.data))
            })
        },
        getNotifications() {
            this.$store.dispatch('dashboard/getNotifications', 10)
        },
        getUpdateCounts() {
            this.$store.dispatch('updates/getUpdates')

        }
    },
    computed: {
        
        userContext() {
            return window.localStorage.getItem('afContext')
        }
    },

    beforeCreate() {
        this.$cookies.set("aff-token", window.localStorage.getItem("aff-token"))
    },
    created() {
        this.getAuthUser()
        this.getNotifications();
        this.getUpdateCounts();
    },
}
</script>


<style lang="scss" scoped>

* {
	font-family: "Quicksand", sans-serif;
}
.main-container {
    z-index: 0;
    width: 100%;
    //height: 100%;
    min-height: 100vh;
    margin-left: 200px;

    @include media('<=dashbreak') {
        margin-left: 0;
    }
}
.layout {
    display: flex;
    background: $dashboard-background-color;
    height: 100vh !important;
    width: 100vw;
}

.sidebar {
    z-index: 20
}
.body {
   // background:lightblue;
   width: 100%;
   height: 100%;
   //position: relative;
   padding: 36px 24px;

   &__container {
       height: 100%;
   }
}
</style>