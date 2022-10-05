<template>
    <div class="panel">
        <div class="panel__header">
           <p> {{title || "Panel"}}</p>
           <button v-if="typeof(show_execute_button) === 'undefined' || show_execute_button === true" :disabled="disable_execute_button" @click="save">Save</button>
        </div>
        <div class="panel__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'show_execute_button', 'disable_execute_button'],
    watch: {
        disable_execute_button(value){
            
        }
    },
    methods: {
        save() {
            this.$emit('onExecute')
        }
    }
}
</script>
<style lang="scss" scoped>
.panel {
    width: 100%;
    margin-bottom: 16px;

    &__header {
        padding: 18px;
        font-weight: 400;
        background: #fafafa;
        //box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);

        border-bottom: 1.5px solid rgba(211, 211, 211, 0.442);
        color: black;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            @include smallbutton;
            font-weight: 400;
            font-size: 15px;
        }
    }

    &__body {
        padding: 16px;
        background: white;
        box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
        width: 100%;
        border: 0.5px solid rgba(211, 211, 211, 0.442);
    }
}
</style>