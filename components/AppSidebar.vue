<template>
    <div class="side">
        <div class="side__container">
            <div class="side__header">
                <div>

                    <img src="../static/logo.svg" alt="">
                    
                </div>

            </div>

            <div class="side__body">
                <sidebar-item :text="'Overview'" link='/overview'/>
                <sidebar-item :text="'Campaigns'" link='/campaigns' />
                <sidebar-item v-if="context==='marketer'" :text="'Earnings'"  link="/earnings"/>
                <sidebar-item :text="'Wallet'" link='/wallet' />
                <sidebar-item :text="'Settings'" link='/settings' />
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: ['context'],
    data() {
        return {
           // active: 'Overview'
        }
    },
    methods: {
        setActive(name) {
            this.active = name;
        }
    }
}
</script>
<style lang="scss" scoped>
.side {
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    position: fixed;
    height: 100%;
    width: 250px;
    //box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;        
    background: white;
    z-index: 20;

    @include media("<=t") {
        display: none;
    }
    &__container {
        //width: 80%;
        margin: auto;
        padding: 36px 0;
    }

    &__header {
        margin-bottom: 40px;
        padding: 0 36px;

        img {
            object-fit: contain;
            height: auto;
            margin: auto;
            margin-bottom: 50px;
                width: 120px !important;
            margin: 0;
        }
    }

    
}




</style>