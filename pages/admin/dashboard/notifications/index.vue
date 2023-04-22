<template>
    <div class="notifs">
        <div class="notifs__container">
            <div class="notifs__header section-title">
                <h2>Notifications</h2>
            </div>

            <div class="notifs__content">
                <div>

                    <div class="tabs">
                        <div class="tabs__item" @click="changeActiveTab('New')"
                            :class="[activeTab === 'New' ? 'selected' : '']">
                            New
                        </div>
                        <div class="tabs__item" @click="changeActiveTab('All')"
                            :class="[activeTab === 'All' ? 'selected' : '']">
                            All
                        </div>
                    </div>

                    <div class="notifs__items">
                        <div class="notifs__items__item" :class="[notif.seen === 0 ? 'unread' : '']"
                            v-for="(notif, index) in filteredNotifications" :key="index">
                            <div class="notifs__items__item__tag">
                                {{ computedTag(notif.type) }}
                            </div>
                            <p class="notifs__items__item__text" v-html="notif.text"></p>
                            <div class="notifs__items__item__ctas">
                            </div>
                        </div>


                    </div>
                </div>


                <div class="notifs__details">
                    <div class="notifs__details__container"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QrCode from "vue-qr-generator";

export default {
    layout: 'admin-dashboard',
    components: { QrCode },
    async created() {
        await this.getNotifications().then(notifs => {
            if (notifs.filter(n => n.status === 'new').length === 0) {
                this.activeTab = 'All'
            }
        });
    },
    data() {
        return {
            notifications: [],
            activeTab: 'New',
        }
    },
    methods: {
        getNotifications() {
            return this.$api.get('/notifications/admin').then(resp => {
                //this.notifications = resp.data.data;

                return this.notifications = resp.data.data.list;
            })
        },
        computedTag(type) {
            if (type === 'pending-sale') {
                return "New Order"
            }
        },
        changeActiveTab(tab) {
            this.activeTab = tab;
        }
    },

    computed: {
        filteredNotifications() {
            if (this.activeTab === 'New' && this.notifications) {
                return this.notifications.filter(a => a.status === 'new');
            }
            else {
                return this.notifications;
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.unread {
    background: gold !important;
    color: white !important;
}

.notifs {
    padding: 36px;

    &__container {}

    &__content {
        display: grid;

        grid-template-columns: 70% 29%;
        justify-content: space-between;
    }

    &__items {
        margin-top: 16px;
        width: 100%;

        &__item {
            background-color: white;
            width: 100%;

            padding: 16px;
            border-bottom: 1px solid whitesmoke;
            cursor: pointer;

            &:hover {
                background: rgba(245, 245, 245, 0.658);
            }

            &__tag {
                font-size: 13px;
                color: $primary;
                font-weight: 600;
                //background: teal;
                border-radius: 20px;
                width: fit-content;
            }

            &__text {
                font-size: 15px;
                font-weight: 400;
            }

            &__ctas {
                margin-top: 8px;

                button {
                    font-size: 14px;
                    border-radius: 10px;
                    padding: 2px 8px;
                    border: 1px solid whitesmoke;
                    color: $faint;
                    font-weight: 500;

                    &:hover {
                        background: whitesmoke;
                    }
                }
            }
        }



    }

    &__details {
        &__container {}
    }
}

.notifmodal {
    min-width: 600px;

    &__container {
        padding: 16px;
    }

    &__order {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        font-weight: 500;
        width: 100%;


        &__header {
            font-size: 25px;
        }

        &__content {
            display: flex;
            flex-direction: column;
        }

        &__details {
            display: flex;
            justify-content: center;
            flex-direction: row;
            //border: 1px solid lightgrey;
            width: 100%;

            &__item {
                display: flex;
                flex-direction: column;
                padding: 8px 16px;
                align-items: center;
                color: $charcoal;

                p {
                    &:first-child {
                        color: $faint;
                    }
                }
            }
        }
    }

    &__customer {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 2px dashed whitesmoke;
        padding: 16px;
        width: 100%;

        &__name {
            font-size: 25px;
            font-weight: 500;
        }

        &__email {
            color: $charcoal;
        }

        &__details {
            display: flex;
            justify-content: center;
            flex-direction: row;
            //border: 1px solid lightgrey;
            width: 100%;

            &__item {
                display: flex;
                flex-direction: column;
                padding: 8px 16px;
                align-items: center;
                color: $charcoal;

                p {
                    &:first-child {
                        color: $faint;
                    }
                }
            }
        }
    }
}

.tabs {
    display: flex;

    .selected {
        color: teal;
        border-bottom: 3px solid teal;
    }

    &__item {
        cursor: pointer;
        //margin-right: 16px;
        padding: 8px 24px;
        background: white;



    }
}

.section-title {
    color: $charcoal;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;

    h2 {
        font-weight: 500;
        font-size: 20px;
        margin-right: 16px;


    }

    button {
        font-size: 16px;
        font-weight: 700;
        color: $primary;
        letter-spacing: 0.5px;
        @include smallbutton;

    }
}
</style>