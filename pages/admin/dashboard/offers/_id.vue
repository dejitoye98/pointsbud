<template>
    <div class="offer">
        <div class="offer__container">
            <div class="offer__header">

                <div class="offer__details" v-if="offer">
                    <div class="offer__details__header">{{ offer.offer }}</div>
                    <p class="offer__details__title"> {{ offer.title }}</p>
                    <div class="offer__details__creds">
                        <div class="offer__details__creds__item">
                            <p>Frequency</p>
                            <p>{{ offer.frequency }}</p>
                        </div>
                        <div class="offer__details__creds__item">
                            <p>Description</p>
                            <p>{{ offer.description }}</p>
                        </div>


                        <div class="offer__details__creds__item">
                            <p>Start Date</p>
                            <p>{{ formatDate(offer.start_date) }}</p>
                        </div>
                        <div class="offer__details__creds__item">
                            <p>End Date</p>
                            <p>{{ formatDate(offer.end_date) || 'N/A' }}</p>
                        </div>
                        <div class="offer__details__creds__item">
                            <p>Eligibility Criterion</p>
                            <p>{{ offer.eligibility_criterion }}</p>
                        </div>

                        <div class="offer__details__creds__item">
                            <p>Eligiblity Value</p>
                            <p>{{ offer.eligibility_criterion_value }}</p>

                        </div>
                    </div>
                </div>
                <div class="offer__details" v-if="offer">
                    <p class="offer__details__title" style="text-align: center;">Customer Insights</p>
                    <GChart type="PieChart" :data="conversionChart.chartData" :options="conversionChart.chartOptions" />
                </div>




            </div>


            <div class="section">
                <p class="section-title">Email Schedule</p>

                <div class="schedule">
                    <div class="schedule__container">
                        <div class="schedule__left">

                            <div class="form-group schedule-group" id="all">
                                <div class="form-group__half">
                                    <div class="schedule__category">
                                        <div class="form-input">
                                            <label for="">Target</label>
                                            <input type="text" value="All Customers" disabled>
                                        </div>

                                    </div>
                                    <div class="form-input">
                                        <label for="">Frequency</label>
                                        <select>
                                            <option value="daily">Daily</option>
                                            <option value="daily" selected>Weekly</option>
                                            <option value="daily">Bi-Weekly</option>
                                            <option value="daily">Monthly</option>
                                            <option value="daily">Custom</option>
                                        </select>
                                    </div>


                                </div>
                                <div class="form-group__footer">
                                </div>
                                <div class="form-group__footer">
                                    <button @click="changeScheduleTargetView('All customers', 'calendar')">See
                                        schedule</button>
                                    <button @click="changeScheduleTargetView('All customers', 'message')">Create
                                        Message</button>
                                </div>

                            </div>
                            <div class="form-group schedule-group" id="eligible">

                                <div class="form-group__half">
                                    <div class="schedule__category">
                                        <div class="form-input">
                                            <label for="">Target</label>
                                            <input type="text" value="Eligible Customers" disabled>
                                        </div>

                                    </div>
                                    <div class="form-input">
                                        <label for="">Frequency</label>
                                        <select>
                                            <option value="daily">Daily</option>
                                            <option value="daily" selected>Weekly</option>
                                            <option value="daily">Bi-Weekly</option>
                                            <option value="daily">Monthly</option>
                                            <option value="daily">Custom</option>
                                        </select>
                                    </div>

                                    <div class="form-group__footer">
                                    </div>
                                    <div class="form-group__footer">
                                        <button @click="changeScheduleTargetView('Eligible customers', 'calendar')">See
                                            schedule</button>

                                        <button @click="changeScheduleTargetView('Eligible customers', 'message')">Create
                                            Message</button>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group schedule-group" :id="custom.target || Date.now()"
                                v-for="(custom, index) in customTargetSchedules" :key="index">

                                <div class="form-group__half">
                                    <div class="schedule__category">
                                        <div class="form-input">
                                            <label for="">Target</label>
                                            <input type="text" :value="custom.target">
                                        </div>

                                    </div>
                                    <div class="form-input">
                                        <label for="">Frequency</label>
                                        <select v-model="custom.frequency">
                                            <option value="daily">Daily</option>
                                            <option value="daily" selected>Weekly</option>
                                            <option value="daily">Bi-Weekly</option>
                                            <option value="daily">Monthly</option>
                                            <option value="daily">Custom</option>
                                        </select>
                                    </div>

                                    <div class="form-group__footer">
                                    </div>
                                    <div class="form-group__footer">
                                        <button @click="changeScheduleTargetView(custom.target, 'calendar')">See
                                            schedule</button>

                                        <button @click="changeScheduleTargetView(custom.target, 'message')">Create
                                            Message</button>
                                    </div>
                                </div>
                            </div>

                            <button class="form-group__create-custombtn" @click="addCustomTargetSchedule"> + Create
                                Target</button>



                        </div>
                        <div class="schedule__right">
                            <div class="" v-if="scheduleTargetView.view === 'calendar'">
                                <p class="schedule__right__title">Email schedule for target: {{ scheduleTargetView.target }}
                                </p>

                                <Calendar></Calendar>

                            </div>
                            <div class="" v-if="scheduleTargetView.view === 'message'">
                                <div class="form-input">
                                    <label for="">Message for group: {{ scheduleTargetView.target }}</label>
                                    <textarea></textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="section">
                <p class="section-title">Email Campaign Logs</p>

                <div class="table">
                    <BaseTable>
                        <template #header>
                            <th></th>
                            <th>Log ID</th>
                            <th>Target</th>
                            <th>Emails Sent</th>
                            <th>Delivered</th>
                            <th>Converted</th>
                            <th>Run At</th>
                            <th></th>
                        </template>
                        <template #data>
                            <tr>
                                <td>
                                    <!-- <Avatar :name="customer.name"></Avatar> -->
                                </td>
                                <td>#23b31423</td>
                                <td>All customers</td>
                                <td>532</td>
                                <td>531</td>
                                <td>443</td>
                                <td>Jan 24, 2023</td>
                                <td><button>View insights</button></td>
                            </tr>
                            <tr>
                                <td>
                                    <!-- <Avatar :name="customer.name"></Avatar> -->
                                </td>
                                <td>#43b31t25</td>
                                <td>Eligible customers</td>
                                <td>532</td>
                                <td>531</td>
                                <td>443</td>
                                <td>Jan 24, 2023</td>
                                <td><button>View insights</button></td>
                            </tr>
                        </template>
                    </BaseTable>
                </div>
            </div>
            <div class="section">
                <p class="section-title">Offer Runs List</p>

                <div class="table">
                    <BaseTable>
                        <template #header>
                            <th></th>
                            <th>Run Started</th>
                            <th>Run Ended </th>
                            <th>Sales Value</th>
                            <th>Eligible Customers</th>
                            <th>Converted Customers</th>
                            <th></th>
                        </template>
                        <template #data>
                            <tr>
                                <td>
                                    <!-- <Avatar :name="customer.name"></Avatar> -->
                                </td>
                                <td>Jan 02, 2023</td>
                                <td>Jan 23, 2023</td>
                                <td>NGN 20,000</td>
                                <td>40</td>
                                <td>23</td>
                                <td><button>View insights</button></td>
                            </tr>
                        </template>
                    </BaseTable>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import moment from "moment"
import { GChart } from 'vue-google-charts/legacy';
import { Calendar, DatePicker } from "v-calendar";
import BaseTable from "../../../../components/tables/base-table.vue";


export default {
    layout: 'admin-dashboard',
    components: {
        GChart,
        Calendar,
        BaseTable
    },
    data() {
        return {
            offer: null,
            conversionChart: {
                chartData: [
                    ['Categories', 'Count'],
                    ['Eligible', 1000],
                    ['Ineligibile', 1170],
                    ['Converted', 550],
                ],
                chartOptions: {
                    chart: {
                        title: 'Company Performance',
                        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                    },
                    width: '100%',
                    height: '400', pieHole: 0.4,
                    legend: 'none'


                }
            },
            customTargetSchedules: [],
            scheduleTargetView: {
                target: 'All customers',
                view: 'calendar'
            }
        }
    },
    created() {
        this.getOffer()
    },
    methods: {
        addCustomTargetSchedule() {
            this.customTargetSchedules.push({
                target: "",
                meessage: "",
                frequency: "",
            })
        },
        changeScheduleTargetView(target, view) {
            this.scheduleTargetView.target = target;
            this.scheduleTargetView.view = view;

            let id;

            switch (target) {
                case "All customers":
                    id = 'all';
                    break;
                case "Eligible customers":
                    id = 'eligible';
                    break;
                default:
                    id = target
                    break;
            }

            const allScheduleElements = document.getElementsByClassName('schedule-group');
            for (let i = 0; i < allScheduleElements.length; i++) {
                const el = allScheduleElements[i];
                if (el.id !== id)
                    el.classList.remove('selected-schedule')
                else el.classList.add('selected-schedule')

            }


        },


        formatDate(date) {
            if (date) {

                return moment(date).format('MMM DD, YYYY').toString()
            }
            return null
        },
        getOffer() {
            this.$api.get('/offers/' + this.$route.params.id).then(resp => {
                this.offer = resp.data.data;
            }).catch(err => {
                console.log(err)
            })
        },
    },
}

</script>

<style lang="scss" scoped>
.section {
    margin: 64px 0;

    &-title {
        font-size: 20px;
        font-weight: 700;
        color: $faint;
        margin-bottom: 8px;
        padding: 0 16px;
    }
}

.schedule {
    @include card;
    min-height: 400px;
    justify-content: space-between;
    border-radius: 10px;

    &__container {
        padding: 16px;
        display: grid;
        grid-template-columns: 48% 48%;
        justify-content: space-between;
    }

    .form-input {
        @include plain-form-input;
        width: 100%;

        input,
        select,
        textarea {
            border-radius: 5px;
        }


    }

    &__left {}

    &__right {
        &:deep(.vc-container) {
            width: 100% !important;
            border: 0.5px solid rgba(226, 232, 240);

        }

        &__title {
            font-size: 15px;
            font-weight: 500;
            color: $charcoal;
            margin-bottom: 8px;
        }
    }
}


.form-group {
    border: 0.5px solid rgba(226, 232, 240);
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 5px;


    &__half {
        display: grid;
        grid-template-columns: 48% 48%;
        justify-content: space-between;
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        width: 100%;


        button {
            font-size: 15px;
            font-weight: 400px;
            @include smallbutton;
            padding: 8px 10px;
            font-size: 15px;
            background: transparent;
            color: $charcoal;

            &:first-of-type {
                margin-right: 8px;
            }

            &:hover {
                background-color: lightblue;
                color: $charcoal;
            }


        }
    }

    &__create-custombtn {
        // @include smallbutton;
        background-color: transparent;
        color: $primary;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 13px;
    }
}


.table {
    width: 100%;
    //margin-top: 64px;

    &__header {
        padding: 16px 16px;
    }


    table {
        width: 100%;
        border-radius: 15px;


        tr {
            border-bottom: 1px solid whitesmoke;
            height: 65px;
            cursor: pointer;

            &:hover {
                // background: $dashboard-background-color;
            }
        }

        th {
            background: white;
            color: $faint;
            text-align: left;
            padding: 0 16px;
            font-weight: 500;
            font-size: 14px;

            tr {
                &:hover {
                    background: inherit;
                }
            }
        }

        td {
            text-align: left;
            color: $faint;
            font-size: 14px;
            padding: 0 16px;

            button {
                border: 1px solid rgb(228, 225, 225);
                padding: 6px 10px;
                border-radius: 50px;
                color: $faint;
                //transition: font-weight ease-in 1s;

                &:hover {
                    //font-weight: 500;
                    background-color: $primary;
                    color: white;
                    border: 1px solid $primary;

                }
            }

            //font-weight: 500;
        }
    }
}

.offer {

    &__container {
        padding: 36px;

    }

    &__header {
        display: grid;
        grid-template-columns: 48% 48%;
        justify-content: space-between
    }

    &__details {
        @include card;
        border-radius: 10px;
        padding: 24px;
        height: max-content;

        &__header {
            background: rgba(255, 166, 0, 0.107);
            font-size: 14px;
            font-weight: 600;
            color: orange;
            width: max-content;
            padding: 2px 10px;
            border-radius: 10px;
            margin-bottom: 8px;
        }

        &__title {
            font-size: 20px;
            font-weight: 700;
            color: $charcoal;
        }

        &__creds {
            display: grid;
            grid-template-columns: 30% 30% 30%;
            justify-content: space-between;

            &__item {
                margin-bottom: 8px;
                margin-top: 8px;

                p {
                    color: $faint;
                    font-size: 14px;

                    &:last-of-type {
                        font-weight: 500;
                    }

                    &:first-of-type {
                        color: black;
                        font-weight: 600;
                    }
                }
            }
        }

    }
}

.selected-schedule {
    background: rgb(46, 134, 134);
    color: white !important;

    label {
        color: white !important;
    }

    button {
        background: white;
        color: $charcoal;
    }
}
</style>