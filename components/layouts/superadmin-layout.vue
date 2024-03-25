
import Topbar from '../admin/topbar.vue';
<template>
    <div class="main">
        <div class="topbar">

            <div class="topbar__container">

                <div @click="$router.push(tab.url)" class="topbar__item" v-for="(tab, index) in tabs">
                    {{tab.name}}
                </div>
            </div>

        </div>

        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            tabs: [{
                name: 'Properties',
                url: '/superadmin/dashboard/properties'
            }, {
                name: 'Settings',
                url: '/superadmin/dashboard/settings'
            }]
        }
    },
    created() {
        this.getSelf()
    },
    computed: {
        ...mapGetters('superadmin', ['active_tab'])
    },
    methods: {
        
        getSelf() {
            this.$api.get('/superadmin/auth/self').then(resp=> {
                const userDetails = window.localStorage.setItem('userDetails', JSON.stringify(resp.data.data))
            })
        }
    }
}
</script>


<style lang="scss" scoped>

* {
    font-family: "Open Sans", sans-serif;
}
.main {
    background-color: whitesmoke;
    width: 100%;
    min-height: 100vh;
}
.topbar{

    background-color: white;


    &__container {
        padding: 24px;
        display: flex;
        gap: 16px;
        justify-content: center;

    }

    &__item{
        cursor: pointer;
    }
    
}
</style>