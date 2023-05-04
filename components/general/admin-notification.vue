<template>
    <div class="notification">

        <NewOrderNotificationModal :socket="socket" @close="closeDetail" v-if="focused_order_id" :id="focused_order_id">

        </NewOrderNotificationModal>
        <div class="notification__container">
            <div class="notification__header">
                <div>

                    <div class="notification__tag">
                        {{ notification.type === 'pending-sale' ? "New Order" : '' }}

                    </div>
                    <div class="notification__tag" v-if="notification.space_id || notification.space_type">
                        <b style="font-size: 16px;"> {{ notification.space_type + ' ' + notification.space_id }}</b>

                    </div>
                </div>
                <svg @click="close" style="cursor: pointer;" width="16" height="16" viewBox="0 0 8 8" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7 7" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                    <path d="M7 1L1 7" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                </svg>
            </div>
            <p class="notification__text" v-html="notification.text">
            </p>

            <p class="notification__time">{{ computedMinsAgo }}</p>

            <div class="notification__ctas">
                <button @click="view">View order details</button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {

    props: ['notification', 'socket'],
    data() {
        return {
            focused_order_id: null,
        }
    },

    computed: {
        computedMinsAgo() {
            if (this.notification.createdAt) {

                return Math.abs(moment(this.notification.createdAt).diff(moment(), 'minutes')) + " mins ago"
            }
            return ''
        }
    },
    methods: {
        closeDetail() {
            this.focused_order_id = null
            this.close()
        },
        close() {
            this.$emit('close', this.notification.id)
        },
        view() {
            if (this.notification.type === 'pending-sale') {
                this.focused_order_id = this.notification.model_id
            }
        }

    },
    created() {
    },
}
</script>

<style lang="scss" scoped>
.notification {
    @include card;
    width: 500px;
    border-radius: 5px;
    height: max-content;
    padding: 8px 0;
    margin-bottom: 8px;
    background: linear-gradient(to bottom right, #2c2e3e, #2e2d3c, #2d2c37);
    color: white !important;

    &__header {
        display: flex;
        justify-content: space-between;
    }

    &__tag {
        background: gold;
        margin-bottom: 8px;
        // color: orangered;
        padding: 2px 8px;
        width: max-content;
        border-radius: 50px;
        font-size: 14px;
        color: black;
    }

    &__container {
        padding: 16px;
    }

    &__text {
        font-size: 15px;
    }

    &__time {
        font-size: 13px;
        color: white !important;
        margin: 8px 0;
    }

    &__ctas {
        button {
            @include smallbutton;
            padding: 8px;
            background: transparent;
            border-radius: 10px;
            margin-top: 10px;
            font-size: 14px;
            border: 2px solid gold;
            color: white;
            max-height: max-content;

            background: gold;
            color: black;

            &:hover {
                filter: brightness(1px);
            }
        }
    }
}
</style>