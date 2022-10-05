<template>
    <div class="navbar">
        <div class="navbar__container">
            <div class="navbar__links" v-if="showForLinks">

                <a href="#">For businesses</a>
                <a href="#">For individuals</a>
            </div>

            <div class="navbar__logo">
                <Logo/>
            </div>

            <div class="navbar__ctas">
                <button v-if="showAuthButtons">Sign Up</button>
                <button @click="joinCampaign" v-if="showJoinCampaign && !(dontShow && dontShow.includes('join_campaign'))">Join Campaign</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['page', 'dontShow'],


    computed: {
        computedPage() {
            if (!this.page) {
                return "Landing"
            }
        },
        showForLinks() {
            if(['landing'].includes(this.page)) return true;
            return false;
        },
        showAuthButtons() {
            if (['landing'].includes(this.page)) return true;
            return false;
        },
        showJoinCampaign() {
            if (['pub-campaign-details'].includes(this.page)) return true;
            return false;
        }
        
    },
    methods: {
        joinCampaign() {
            this.$emit('onClickJoinCampaign')
        },
    },
}
</script>

<style lang="scss" scoped>
.navbar {
    background: white;
    &__container {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0px;

    }
    &__links {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        display: flex;
        align-items: center;
        color: #000000;

        a {
            margin-right: 30px;

            &:first-child {
                color: $lightaccent;
            }
        }
    }
}
    
button {
    @include largebutton;
    border-radius: 8px;
    width: auto !important;
}
    

</style>

