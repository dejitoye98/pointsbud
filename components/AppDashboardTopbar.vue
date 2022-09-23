<template>
    <div class="el">
        <div class="el__container">
            <div class="lead">
                <div class="back">

                </div>
                <div class="title">
                    <p class="title__text">{{dashboardTitle}}</p>
                </div>

            </div>

            <div class="el__end">
                <button v-if="active === 'Campaigns'" @click="createCampaign">Create new campaign</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.el {
    width: 100%;
     &__container {
         width: 100%;
         display: flex;
         padding: 24px 0;
         justify-content: space-between;
         align-items: center;
         
         
     }
     &__end {
         justify-self: end;
     }

     &__dp {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background: black;
     }

     button {
         @include largebutton;
         //width: 50px;
         font-size: 14px;
         padding: 16px; 
         height: auto !important;
         font-weight: 400;
         width: auto!important;
         color: white;
         border-radius: 20px;
         min-height: auto;
         cursor: pointer;
     }

}



.title {
    padding: 8px 16px;
    &__text {
        font-size: 20px;
        color: $faint;
        font-weight: 300;
        //letter-spacing: 0.10rem;
    }
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
    methods: {
        createCampaign() {
            this.$store.commit('dashboard/setCreateCampaign', true)
        },
    },
    computed: {
        ...mapGetters("dashboard", ["dashboardTitle", 'active']),
    },
}
</script>