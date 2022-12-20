<template>
    <div class="loader" v-if="show">
        <div class="loader__item" id="loader-1"></div>
        <div class="loader__item" id="loader-2"></div>
        <div class="loader__item" id="loader-3"></div>
    </div>
</template>
<script>
export default {
    props: ['show'],
    data() {
        return {
            interval: ''
        }
    },
    watch: {
        show(value) {
            //alert(value)
            if (value === false) {
                clearInterval(this.interval)
            }
        }
    },
    mounted(){
        //alert(this.show)
        this.interval = setInterval(function(){
            // get the last activated
            for (let i = 1;  i <= 3; i++) {
                if (document.getElementById('loader-'+1).classList.contains('activated')){
                    if (document.getElementById('loader-' +i)) {
                        document.getElementById('loader-' +i).classList.remove('activated')
                    }
                }
                else {
                    if (document.getElementById('loader-' +i))  document.getElementById('loader-' +i).classList.add('activated')
                }
            }
            
            
        }, 500)
    }
}
</script>
<style lang="scss" scoped>
.activated{
    background: $primary !important;
}
.loader {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;

    &__item {
        background: $lightaccent;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 7px;
    }
}
</style>