<template>
    <div class="modal">
        <div class="modal__mask">
            <div class="modal__container">
                <div class="modal__header">
                </div>
                <div class="modal__body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.modal {
    z-index: 1000;
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    //: 0;
    
    
    &__mask {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.242);
    }
}
</style>