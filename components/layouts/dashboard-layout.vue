
import Topbar from '../admin/topbar.vue';
<template>
    <div class="main">


        
        <div class="main__sidebar">
            <Sidebar></Sidebar>
        </div>
        
        <div class="main__content">
            <div class="main__header">
                <topbar></topbar>
            </div>

            <div class="main__content__content">
                <div style="padding: 16px 0;">
                    <p class="page-title">{{active_tab}}</p>
                    
                    <div class="history">
                        
                    </div>
                </div>
                <slot name="content">
                    
                </slot>
                    
            </div>
        </div>

        <div>
        
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    created() {
        this.getSelf()
    },
    computed: {
        ...mapGetters('dashboard', ['active_tab'])
    },
    methods: {
        getSelf() {
            this.$api.get('/auth/self').then(resp=> {
                const userDetails = window.localStorage.setItem('userDetails', JSON.stringify(resp.data.data))
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.main{
    display: flex;
    background-color: #FAFAFA;
    width: 100vw;
    max-width: 100vw;
    //max-height: 100vh;
    overflow: hidden;

    &__content {
        width: 100%;
        &__content {
            width: 100%;
            padding: 24px;
            overflow: scroll;
            height: max-content;

            @include media("<=t") {
                padding: 16px;
            }
        }
    }

    &__sidebar{
        //height: max-content;
    }
}

.page-title {
    color: #16232D;
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;

    @include media("<=t") {
        display: none;
    }
}

</style>