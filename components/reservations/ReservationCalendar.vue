<template>
    <div class="card">
        <div class="card__container">
            <div class="calendar">
                <Calendar
                    :attributes="computedCalendarAttributes"
                    class="custom-calendar max-w-full"
                    disable-page-swipe
                    is-expanded
                >
                    <template v-slot:day-content="{ day, attributes }">
                        <div
                            class="flex flex-col h-full z-10 overflow-hidden day-cell"
                            @click="chooseDay(day)"
                        >
                            <span class="day-label text-sm text-gray-900">{{
                                day.day
                            }}</span>
                            <div
                                class="flex-grow overflow-y-auto overflow-x-auto"
                            >
                                <p
                                    v-for="attr in attributes"
                                    :key="attr.key"
                                    class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                                    :class="attr.customData.class"
                                    @click="chooseAttribute(attr)"
                                >
                                    {{ attr.customData.title }}
                                </p>
                            </div>
                        </div>
                    </template>
                </Calendar>
            </div>

            <div class="details" v-if="dayInFocus">
                <template v-if="!dayInFocus">
                    <div
                        style="
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        "
                    >
                        <p>Select a date on the calender</p>
                    </div>
                </template>
                <template v-else>
                    <div class="details__header">
                        <p v-if="!dayInFocus">Choose a date in the calendar</p>
                        <p v-else>{{ dayInFocus }}</p>
                    </div>
                    <div class="details__tabs">
                        <div
                            class="details__tabs__tab"
                            v-for="(tab, index) in tabs"
                            :key="index"
                            @click="activeTab = tab"
                            :class="[activeTab === tab ? 'active-tab' : '']"
                        >
                            {{ tab }}
                        </div>
                    </div>

                    <div class="details__content">
                        <template v-if="activeTab === 'Event' && dayInFocus">
                            <div class="details__content__form">
                                <div class="form-input">
                                    <label>Event name?</label>
                                    <input
                                        v-model="editingAttribute.event.label"
                                    />
                                </div>
                                <div class="flex-row">
                                    <timepicker
                                        placeholder="From"
                                        :time="editingAttribute.event.from_time"
                                    ></timepicker>
                                    <timepicker
                                        placeholder="To"
                                        :time="editingAttribute.event.to_time"
                                    ></timepicker>
                                </div>

                                <div class="details__content__form__footer">
                                    <button class="btn btn--default">
                                        Delete
                                    </button>
                                    <button
                                        class="btn btn--primary"
                                        @click="save"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </template>
                        <template
                            v-if="activeTab === 'Availability' && dayInFocus"
                        >
                            <div class="details__content__form">
                                <div class="form-input">
                                    <label>What's the occassion?</label>
                                    <input
                                        v-model="
                                            editingAttribute.availability.label
                                        "
                                    />
                                </div>
                                <div class="flex-row">
                                    <timepicker
                                        placeholder="Opening Time"
                                        :time="
                                            editingAttribute.availability
                                                .from_time
                                        "
                                    ></timepicker>
                                    <timepicker
                                        placeholder="Closing Time"
                                        :time="
                                            editingAttribute.availability
                                                .to_time
                                        "
                                    ></timepicker>
                                </div>
                                <div class="all-day">
                                    <label
                                        style="color: darkgrey; font-size: 14px"
                                    >
                                        <input
                                            type="checkbox"
                                            :checked="
                                                editingAttribute.availability
                                                    .all_day ||
                                                editingAttribute.event.all_day
                                            "
                                            :v-model="
                                                editingAttribute.availability
                                                    .all_day
                                            "
                                        />Closed All Day
                                    </label>
                                </div>
                                <div class="details__content__form__footer">
                                    <button class="btn btn--default">
                                        Delete
                                    </button>
                                    <button
                                        class="btn btn--primary"
                                        @click="save"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import moment from "moment";
export default {
    props: ["plan_id"],
    components: {
        Calendar,
    },
    created() {
        this.getOffDays();
        this.getEvents();
    },
    computed: {
        dayInFocus() {
            if (this.focusedDay) {
                return moment(this.focusedDay.date).format("MMM DD, YYYY");
            }
            return "";
        },
        computedEventsData() {
            if (this.events && this.events.length) {
                const array = [];
                this.events.forEach((event, index) => {
                    const obj = {
                        key: index,
                        customData: {
                            type: "event",
                            title: event.label,
                            day: event.day,
                            class: "lightseagreen text-white",
                            from_time: event.from_time,
                            to_time: event.to_time,
                            all_day: event.all_day,
                        },
                        dates: new Date(event.day),
                    };
                    array.push(obj);
                });
                return array;
            }
            return [];
        },
        computedOffTimes() {
            if (this.offTimeData && this.offTimeData.length) {
                const array = [];
                this.offTimeData.forEach((time, index) => {
                    const obj = {
                        key: index,
                        customData: {
                            type: "availability",
                            title: time.label,
                            day: time.day,
                            class: "primary text-white",
                            from_time: time.from_time,
                            to_time: time.to_time,
                            all_day: time.all_day,
                        },
                        dates: new Date(time.day),
                    };
                    array.push(obj);
                });
                return array;
            }
            return [];
        },
        computedCalendarAttributes() {
            return this.computedOffTimes.concat(this.computedEventsData);
        },
    },
    methods: {
        chooseAttribute(attribute) {
            this.chosenAttribute = attribute;
            if (attribute.customData.type === "availability") {
                this.activeTab = "Availability";
                this.editingAttribute.availability.label =
                    attribute.customData.title;
                this.editingAttribute.availability.day =
                    attribute.customData.day;
                this.editingAttribute.availability.all_day =
                    attribute.customData.all_day;
                this.editingAttribute.availability.from_time =
                    attribute.customData.from_time;
                this.editingAttribute.availability.to_time =
                    attribute.customData.to_time;
            } else if (attribute.customData.type === "event") {
                this.activeTab = "Event";
                this.editingAttribute.event.typ;
                this.editingAttribute.event.label = attribute.customData.title;
                this.editingAttribute.event.all_day =
                    attribute.customData.all_day;
                this.editingAttribute.event.day = attribute.customData.day;
                this.editingAttribute.event.from_time =
                    attribute.customData.from_time;
                this.editingAttribute.event.to_time =
                    attribute.customData.to_time;
            }
        },
        save() {
            this.$api
                .post(
                    `/reservations/plans/${this.$route.params.id}/calendar`,
                    this.editingAttribute
                )
                .then((resp) => {
                    if (this.editingAttribute.event) {
                        this.getEvents();
                    } else if (this.editingAttribute.availability) {
                        this.getOffDays();
                    }
                });
        },
        chooseDay(day) {
            this.focusedDay = day;
        },
        getOffDays() {
            this.$api
                .get(`/reservations/plans/${this.$route.params.id}/off-times`)
                .then((resp) => {
                    this.offTimeData = resp.data.data;
                });
        },
        getEvents() {
            this.$api
                .get(`/reservations/plans/${this.$route.params.id}/events`)
                .then((resp) => {
                    this.events = resp.data.data;
                });
        },
    },
    data() {
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        return {
            tabs: ["Event", "Availability", "Reservations"],
            activeTab: "Event",
            focusedDay: "",
            chosenAttribute: {},
            offTimeData: [],
            events: [],
            editingAttribute: {
                event: {},
                availability: {},
            },
            attributes: [
                {
                    key: 1,
                    customData: {
                        title: "Valentine Day",
                        class: "primary text-white",
                    },
                    dates: new Date("2023-02-14"),
                },
                {
                    key: 2,
                    customData: {
                        title: "Monday Night Jazz",
                        class: "lightseagreen text-white",
                    },
                    dates: new Date(year, month, 2),
                },
            ],
        };
    },
};
</script>
<style>
.lightseagreen {
    background: lightseagreen;
}
.primary {
    background: #de5c6e;
}
</style>

<style lang="scss" scoped>
.btn {
    &--default {
        margin-right: 16px !important;
        border: 1px solid lightgray !important;
    }
}

.all-day {
    margin-top: 8px;
    input {
        margin-right: 8px;
    }
}
.active-tab {
    background: white !important;

    //color: black !important;
    font-weight: 400;
}
.flex-row {
    display: grid;
    grid-template-columns: 45% 45%;
    justify-content: space-between;
}
.card {
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    background: white;
    width: 100%;
    //min-height: 200px;
    border-radius: 10px;
    padding: 16px;

    &__container {
        display: grid;
        grid-template-columns: 45% 45%;
        justify-content: space-between;
    }
}
.calendar {
    width: 100%;
}

.details {
    //background: whitesmoke;
    border: 2px solid whitesmoke;
    //padding: 16px;
    &__tabs {
        display: grid;
        grid-template-columns: 33.3% 33.3% 33.3%;
        justify-content: space-between;
        &__tab {
            background: #f8fafc;
            padding: 16px;
            text-align: center;
            cursor: pointer;
            color: $charcoal;
            width: 100%;
            &:hover {
                color: black;
                background: #f1f5f8;
            }
        }
    }
    &__header {
        background: #f1f5f8;
        border-bottom: rgba(211, 211, 211, 0.733) 0.5px solid;
        padding: 8px 0;
        color: $charcoal;
        font-size: 18px;
        text-align: center;
    }
    &__content {
        padding: 60px;

        &__form {
            &__footer {
                display: flex;
                justify-content: flex-end;
                margin-top: 20px;

                button {
                    @include smallbutton;
                    &:first-of-type {
                        @include editbutton;
                    }
                }
            }
        }
    }
}
.form-input {
    @include plain-form-input;
    background: white;
}
</style>

<style lang="postcss" scoped>
::-webkit-scrollbar {
    width: 0px;
}
::-webkit-scrollbar-track {
    display: none;
}

/deep/.custom-calendar {
    border: 0.5px solid whitesmoke !important;
}
/deep/ .custom-calendar.vc-container {
    --day-border: 1px solid whitesmoke;
    --day-border-highlight: 1px solid whitesmoke;
    --day-width: 90px;
    --day-height: 90px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid whitesmoke;
    border-radius: 0;
    border: 0;
    width: 100%;

    & .day-cell {
        cursor: pointer;
        &:hover {
            background: $lightaccent;
        }
    }
    & .vc-pane {
        min-width: auto !important;
    }
    & .vc-header {
        background-color: #f1f5f8;
        padding: 10px 0;
    }
    & .vc-weeks {
        padding: 0;
    }
    & .vc-weekday {
        background-color: var(--weekday-bg);
        border-bottom: var(--weekday-border);
        border-top: var(--weekday-border);
        padding: 5px 0;
    }
    & .vc-day {
        padding: 0 5px 3px 5px;
        text-align: left;
        height: var(--day-height);
        min-width: var(--day-width);
        background-color: white;
        &.weekday-1,
        &.weekday-7 {
            background-color: #f8fafc;
        }
        &:not(.on-bottom) {
            border-bottom: var(--day-border);
            &.weekday-1 {
                border-bottom: var(--day-border-highlight);
            }
        }
        &:not(.on-right) {
            border-right: var(--day-border);
        }
    }
    & .vc-day-dots {
        margin-bottom: 5px;
    }
}
</style>
