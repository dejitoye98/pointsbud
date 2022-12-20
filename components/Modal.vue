<template>
    <div class="modal" :class="[classes? classes: '']">
        <div class="modal__mask" @click.stop="$emit('close')">
            <div class="modal__container" @click.stop  :class="computedStyles" >
                <div class="modal__header" v-if="typeof(header) === 'undefined' || header === true">
                    <div class="modal__header__container">
                        <p class="modal__header__text">{{title}}</p>

                        <svg  @click.stop="$emit('close')" width="16" height="16" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7" stroke="#808080" stroke-width="0.5" stroke-linecap="round"/>
                        <path d="M7 1L1 7" stroke="#808080" stroke-width="0.5" stroke-linecap="round"/>
                        </svg>

                    </div>
                </div>
                <div class="modal__body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'width', 'close', 'header', 'classes'],
    computed: {
        computedStyles() {
            const styles = [];
            if (this.width === 'half' ) {
                styles.push("modal__container--half")
            }else if (this.width === 'quarter') {
                styles.push("modal__container--quarter")
            }
            return styles;
        }
    }
}
</script>
<style lang="scss" scoped>
.sixty-body {
    .modal__container{
        width: 60% !important;
    }
}
.full-mask {
    .modal__mask {
        margin-left: 0 !important;

    }
}

.half-body {
    .modal__container{
        width: 50% !important;
    }
}
.modal {
    z-index: 10000000000000;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    
    
    &__mask {
        width: 100%;
        height: 100%;
        padding: 64px 0;
        position: fixed;
        margin-left: 120px;;
        background-color: rgba(0, 0, 0, 0.612);
        overflow: scroll;

        @include media('<=dashbreak') {
            margin-left: 0 !important;;
        }

    }

    &__header {

        border-bottom: 0.5px solid rgba(211, 211, 211, 0.27);

        &__container {
            width: 95%;
            margin: auto;
            padding: 16px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            svg {
                cursor: pointer;
            }
        }
        &__text {
            color: $faint; 
            font-weight: 500;
            font-size: 18px;
           // text-transform: uppercase;
        }
    }

    &__container {
        width: 80%;
        background: white;
        min-height: auto;
        margin: auto;
        //margin-top: 50px;
        margin-top: 50px;
        box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
        transform: translateY(-2px);
         border-radius: 5px;

         &--half {
             width: 50% !important;
         }

         &--quarter{
             width: 25% !important
         }

    }

    &__body {
        width: 95%;
        margin: auto;
        padding: 16px 0;
    }
}
</style>