<template>
    <div class="side">
        <div class="side__container">
            <div class="side__header">
                <div>
                    <p>Afflee</p>
                </div>

            </div>

            <div class="side__body">
                <sidebar-item :text="'Overview'" />
                <sidebar-item :text="'Earnings'" />
                <sidebar-item :text="'Campaigns'" link='/campaigns' />
                <sidebar-item :text="'Settings'" link='/settings' />
            </div>
        </div>
    </div>
</template>


<script>
export default {
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
    height: 100vh;
    width: 250px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;        
    background: white;

    &__container {
        //width: 80%;
        margin: auto;
        padding: 36px 0;
    }

    &__header {
        margin-bottom: 40px;
        padding: 0 36px;
    }

    
}




</style>