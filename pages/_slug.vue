<template>

    <div class="page" v-if="false">
        <div class="page__container">

            <div class="navbar">
                <div class="navbar__container contain flex flex-center-x">

                    <div>
                        <Logo></Logo>
                    </div>

                </div>
            </div>
            
            
            <div class="flex-center-x padding-16 flex-center-y gap-1" style="color: #00FF7F;">
                <div class="" style="background: #00FF7F;height: 10px; width:10px; border-radius: 100%"></div>
                
                2 active</div>

            <div class="list contain">

                <NewPreorderItem v-for="(item, index) in items" :item="item"></NewPreorderItem>
            
            </div>
            
        </div>
    </div>

</template>


<script>
import NewPreorderItem from '../components/NewPreorderItem.vue';

export default {
    data() {
        return {
            items: []
        };
    },
    async fetch() {
        this.$api.get('/flash/items').then(resp => {
            this.items = resp.data.data;
        });
    },
    components: { NewPreorderItem }
}
</script>
<style lang="scss" scoped>
* {
    font-family: "Open Sans", sans-serif;
}
.page {
    background-color: #2B2D30;
    //background-color: whitesmoke;
    min-height: 100vh;
}

.list {
    display: grid;
    grid-template-columns: 100%;
    //justify-content: space-between;
    padding: 36px;
    gap: 10px;
    @include media("<=t") {
        padding: 16px;
    }

}

.contain {
    width: 80%;
    margin: auto;
    padding: 16px;
    @include media("<=t") {
        width: 100%;
    }
}

.navbar {
    width: 100%;
    background-color: #5353532d;
    //background-color: white;
   // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

}
.strikethrough {
    text-decoration: line-through;
    color: rgb(165, 165, 165);

}


.left {
    font-size: 15px;
   //text-align: center;
    color: grey;
    margin-top: 20px;
}

</style>