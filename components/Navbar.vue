<template>
    <div class="navbar">
        <div class="navbar__container">
            <div class="navbar__links" v-if="showForLinks">

                <a href="#">For businesses</a>
                <a href="#">For individuals</a>
            </div>

            <div class="navbar__logo">
                <p>Afflee</p>
            </div>

            <div class="navbar__ctas">
                <button>Signup</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.navbar {
    &__container {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 0px;

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
    width: 100px;
}
    

</style>

<script>
    export default {
        props: ['page'],


        computed: {
            showForLinks() {
                if(['landing'].includes(this.page)) return true;
                return false;
            }
        }
    }

</script>