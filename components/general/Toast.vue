<template>
    <div class="container" v-if="show">
        
        <div class="toast green" v-if="show && showSuccessToast" >
            {{successMessage}}
        </div>
        <div class="toast red" v-else-if="show && showErrorToast" >
            {{errorMessage}}
        </div>
        <div class="toast normal" v-else>
            {{message}}
        </div>
        
    </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
    props: ['type', 'message'],

    data() {
        return {
            show: false,
        }
    },
    watch: {
        showSuccessToast(value) {
            if (value && value === true) {
                this.show = true;
                setTimeout(() => {
                    this.show = false;
                    this.$store.dispatch('dashboard/actionShowSuccessToast', {show: false, message: ''})
                }, 4000)
            }
        }, 
        showErrorToast(value) {
            
            if (value && value === true) {
                this.show = true;
                setTimeout(() => {
                    this.show = false;
                    this.$store.dispatch('dashboard/actionShowErrorToast', {show: false, message: ''})
                }, 4000)
            }
        }, 
    },
    computed: {
        ...mapGetters("dashboard", ["showErrorToast", "showSuccessToast", "errorMessage", "successMessage"]),

    }
}
</script>
<style lang="scss" scoped>
.container {
    width: 100%;

}

.toast {
    background: lightgrey;
    position: fixed;
    text-align: center;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000000;
    padding: 8px 16px;
    background: black;
    min-height: 40px; 
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
.green {
    background: lightseagreen !important;
    color: white;
}
.red {
    background: red !important;
    color: white;
}
</style>