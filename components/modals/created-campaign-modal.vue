<template>
    <Modal title="Success" v-if="show"  classes="full-mask half-body" @close="close">

        <div class="center">
            <p>Campaign successfully logged for creation. We will review this and get back to you!</p>
        </div>

        <div class="footer">
            <button @click="done">Ok</button>
        </div>

    </Modal>
    
</template>


<script>
import Modal from '../Modal'
export default {
    components: {
        Modal
    },
    props: ['campaign', 'show'],

    methods: {
       done() {
           this.$emit('close');
           //this.$router.push('/dashboard/campaigns')
       },
       close() {
           this.$emit('close', true)
       }
        
    }
    
}
</script>

<style lang="scss" scoped>
.center {
    padding: 24px;
    color: lightseagreen;
}
.footer{ 
    display: flex;
    justify-content: flex-end;
    button {
        @include editbutton;
    }
}
</style>