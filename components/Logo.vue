<template>
    <div class="logo" @click="goHome">
        <img src="../static/logo.svg" alt="">
    </div>
</template>

<style lang="scss" scoped>

 .logo{
    //margin-bottom: 40px;
    padding: 0 36px;
    cursor: pointer;

    img {
        object-fit: contain;
        height: auto;
        margin: auto;
        margin-bottom: 50px;
            width: 120px !important;
        margin: 0;
    }
}
</style>

<script>
export default {
    methods: {
        goHome() {
            this.$router.push('/')
        }
    }
}
</script>