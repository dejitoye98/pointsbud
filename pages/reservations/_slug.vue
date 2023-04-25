<template>
    <div class="reservations">


        <BaseModal v-if="focused_space">
            <template #body>
                <div class="reserve-modal">
                    <div class="reserve-modal__container">

                    </div>
                </div>
            </template>
        </BaseModal>

        <div class="reservations__container">

            <div class="header">
                <div class="logo">
                    <img :src="business && business.logo" alt="">
                </div>
                <p>Reservations</p>
            </div>










            <div class="reservations__time">
                <p class="reservations__time__header" for="">Choose Date & Time</p>
                <div class="reservations__time__day">



                    <div class="form-input">
                        <!--<DatePicker v-model="chosen.date" />-->

                    </div>
                </div>

                <div class="half">

                    <div class="timepicker" @click="show_time_dropdown.from = !show_time_dropdown.from">
                        {{ chosen.from_time }}
                        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                                stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001"
                                stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>
                    <div class="timepicker__dropdown" v-if="show_time_dropdown.from">
                        <ul>
                            <li @click="chooseTime(time, 'from')" v-for="(time, index) in times" :key="index">{{ time }}
                            </li>
                        </ul>
                    </div>

                    <div class="timepicker" @click="show_time_dropdown.to = !show_time_dropdown.to">
                        {{ chosen.to_time }}
                        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                                stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001"
                                stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>
                    <div class="timepicker__dropdown" v-if="show_time_dropdown.to">
                        <ul>
                            <li @click="chooseTime(time, 'to')" v-for="(time, index) in times" :key="index">{{ time }}
                            </li>
                        </ul>
                    </div>

                </div>

            </div>







            <div class="reservations__spaces">
                <div class="reservations__spaces__container">
                    <div class="reservations__spaces__item" v-for="(space, index) in spaces" :key="index">
                        <div class="reservations__spaces__item__thumbnail">
                            <img :src="space.thumbnail || business.logo" alt="">
                        </div>
                        <div class="reservations__spaces__item__header" v-if="space.category && space.category.name">
                            <!--{{ space.category && space.category.name }}-->
                        </div>
                        <div class="reservations__spaces__item__name">
                            {{ space.name }} ({{ space.category && space.category.name }})
                        </div>

                        <div class="reservations__spaces__item__price">
                            {{ space.currency }} {{ space.unitprice | money }} ({{ space.pricing_measurement }})
                        </div>

                        <div class="reservations__spaces__item__cta">
                            <button @click="chooseSpace(space)"
                                :disabled="!chosen.date && !chosen.from_time">Reserve</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>


<script>

export default {
    components: {
        //  DatePicker
    },
    data() {
        return {
            show_time_dropdown: {
                from: false,
                to: false,
            },
            focused_space: null,
            times: [
                "12:00 AM",
                "1:00 AM",
                "2:00 AM",
                "3:00 AM",
                "4:00 AM",
                "5:00 AM",
                "6:00 AM",
                "7:00 AM",
                "8:00 AM",
                "09:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "1:00 PM",
                "2:00 PM",
                "3:00 PM",
                "4:00 PM",
                "5:00 PM",
                "6:00 PM",
                "7:00 PM",
                "8:00 PM",
                "9:00 PM",
                "10:00 PM",
                "11:00 PM"
            ],
            chosen: {
                date: '',
                from_time: '',
                to_time: ''
            },
            reservations: [],
            business: null,


            spaces: []
        }
    },
    fetch() {
        this.getBusiness().then(resp => {
            this.getSpaces()
        })
    },
    methods: {
        chooseSpace(space) {
            this.focused_space = space
        },
        chooseTime(time, type) {
            if (type === 'from') {
                this.chosen.from_time = time
                this.show_time_dropdown.from = false;
            }
            else {
                this.chosen.to_time = time
                this.show_time_dropdown.to = false;

            }
        },
        getAvailableSpaces() {

            if (this.from_time && this.to_time) {

            }
            else {
                alert('Please enter checkout date')
            }

        },

        getSpaces() {
            this.$api.get(`/spaces?business_id=${this.business.id}`).then(resp => {
                this.spaces = resp.data.data
            })
        },



        async getBusiness() {
            return await this.$api.get('/businesses?slug=' + this.$route.params.slug).then(resp => {
                this.business = resp.data.data
            })

        }
    },

}
</script>


<style lang="scss" scoped>
.form-input {
    &:deep(.mx-datepicker) {
        height: 50px !important;
        width: 100%;
    }

    &:deep(.mx-input-wrapper) {
        height: 50px !important;
    }

    &:deep(.mx-input) {
        border-radius: 50px;
        text-align: center;
        height: 50px !important;
        border: 1px solid whitesmoke;

        &:hover {
            border: 2px solid $lightaccent;
        }

        &:focus {
            border: 2px solid $lightaccent;
        }

        .active {
            background: $lightaccent !important;
        }
    }

    &:deep(.mx-date-row) {
        border: 1px solid black !important;
    }

    &:deep(.cell) {
        font-size: 16px !important;
    }

}

.half {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;


}

.header {
    min-height: 50px;
    width: 100%;
    background-color: $primary;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 16px;

    .logo {
        width: 50px;
        height: 50px;
        border-radius: 50%;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }

    p {
        color: whitesmoke;
        font-size: 14px;
    }
}

.timepicker {
    border: 1px solid whitesmoke;
    width: 50%;
    height: 50px;
    cursor: text;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    font-size: 14px;
    position: relative;
    background: white;


    &:first-of-type {
        margin-right: 8px;
    }

    svg {
        position: absolute;
        right: 5px;

    }

    &:hover {
        border: 2px solid $lightaccent;
    }

    &__dropdown {
        position: absolute;
        margin-top: 1px;
        margin-bottom: 1px;
        -webkit-box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
        box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
        z-index: 2001;
        margin-left: 16px;
        background: white;
        max-height: 500px;
        overflow: scroll;
        width: 90%;
        width: 50% !important;

        ul {
            width: 100%;

            li {
                //height: 30px;
                color: #73879c;
                font-size: 12px;
                line-height: 2;
                cursor: pointer;
                text-align: center;
                padding: 16px;

                &:hover {
                    background: rgba(59, 130, 246, 0.05);
                    //color: white;
                }
            }
        }
    }
}

.reservations {

    &__time {
        display: flex;
        flex-direction: column;
        padding: 32px 16px;

        &__header {
            text-align: center;
            font-size: 14px;
            color: darkgrey;
            margin-bottom: 8px;
        }

        &__day {

            div {
                width: 100%;
            }
        }
    }

    &__spaces {



        &__container {
            padding: 16px;
            display: grid;
            grid-template-columns: 30% 30% 30%;

            justify-content: space-between;

            @include media("<=t") {
                grid-template-columns: 100%;
            }
        }

        &__item {
            background: white;
            border-radius: 15px;
            padding: 16px;
            margin-bottom: 16px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            &__thumbnail {
                width: 50px;
                height: 50px;
                margin-bottom: 8px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border: 50%;

                }
            }

            &__header {
                font-size: 15px;
                background: gold;
                width: fit-content;
                padding: 2px 8px;
                border-radius: 15px;
                margin-bottom: 8px;

            }

            &__name {
                margin-bottom: 8px;
                font-weight: 700;
            }

            &__price {
                margin-bottom: 8px;
            }

            &__cta {
                button {
                    @include smallbutton;
                    padding: 8px 16px;
                    background-color: gold;
                    color: black;
                }
            }
        }
    }
}
</style>