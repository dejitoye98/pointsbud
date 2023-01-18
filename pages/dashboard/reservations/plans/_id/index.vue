<template>
    <div class="plan">
        <div class="plan__container">

            <template v-if="!plan">
                <LoadingState></LoadingState>
            </template>

            <template v-else>

                <ReservationPlansTabs v-if="plan" :params="{id: plan.id }"/>
                <div class="section">
                    <div class="section__header">

                        <h3 class="section-title">Details</h3>
                        <button>Edit</button>
                    </div>
                    <div class="card card--details" v-if="plan">
                        <div>
                            <label>Name</label>
                            <p>{{plan.name}}</p>
                        </div>
                        <div>
                            <label>Type</label>
                            <p>{{plan.type || "N/A"}}</p>
                        </div>
                        <div>
                            <label>Public URL</label>
                            <a>afflee.com/reservations/{{plan.slug}}</a>
                        </div>
                        <div>
                            <label>Marketer Commission</label>
                            <p>{{marketerCommission}}</p>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="section__header">

                        <h3 class="section-title">Availability Times</h3>
                        <button @click="saveAvailability">Save</button>
                    </div>
                    <div class="card card--availability-times">
                        <div class="days">
                            <div @click="focusAvailableDay(day)" class="day-tag" :style="{background: day.available === 1 ? 'lightseagreen' : '', color: day.available ? 'white' : ''}" 
                                v-for="(day, index) in av_days" :key="index">
                                    {{day.day}}
                                    <svg v-if="day.available"
                                        style="cursor:pointer"
                                        @click.stop="day.available ? day.available=0 : (()=>{})"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 8 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path d="M1 1L7 7"  v-if="!day.available"  stroke="#808080" stroke-width="1" stroke-linecap="round" />
                                        <path d="M7 1L1 7" v-if="!day.available" stroke="#808080" stroke-width="1" stroke-linecap="round" />
                                        <path d="M1 1L7 7"  v-if="day.available"  stroke="white" stroke-width="1" stroke-linecap="round" />
                                        <path d="M7 1L1 7" v-if="day.available" stroke="white" stroke-width="1" stroke-linecap="round" />
                                    </svg>
                            </div>
                            
                        </div>

                        <div v-if="Object.keys(av_focused_day).length > 0">
                            <div style="display: flex; justify-content: center">
                                <p class="day-tag" style="background: lightseagreen; color: white;
                                    margin-bottom: 16px; color:white; text-align: center !important; padding: 8px">{{av_focused_day.day}}</p>
                            </div>
                            <div class="times">
                                <timepicker placeholder="Opening Hour"
                                type="opening"
                                :day="av_focused_day.day"
                                :time="av_focused_day.opening_time"
                                @onTimeChanged="onStartTimeChanged"
                                >
                                </timepicker>
                                <timepicker placeholder="Closing Hour"
                                    type="closing"
                                    :day="av_focused_day.day"
                                    :time="av_focused_day.closing_time"
                                    @onTimeChanged="onEndTimeChanged"

                                    >
                                </timepicker>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="section">
                    <div class="section__header">

                        <h3 class="section-title">Calendar</h3>
                    </div>
                    <ReservationCalendar/>
                </div>
            </template>
            
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    layout: 'dashboard',
    created() {
        this.$store.commit('dashboard/setActive', 'Reservations')
        this.$store.commit('dashboard/setDashboardTitle', 'Reservation Plan');  
        this.getPlan()
        this.getReservations();  
        this.getAvailability();
        
    },
    data() {
        return {
            plan: null,
            loading: true,
            av_focused_day: {},
            av_days: [
                {
                    day: "Sunday",
                    available: 0,
                    opening_time: "",
                    closing_time: ""
                },
                {
                    day: "Monday",
                    available: 0,
                    opening_time: "",
                    closing_time: ""
                },
                {
                    day: "Tuesday",
                    available: 0,
                    opening_time: "",
                    closing_time: ""
                },
                {
                    day: "Wednesday",
                    available: 0,
                    opening_time: "",
                    closing_time: ""
                },
                {
                    day: "Thursday",
                    available: 0,
                    opening_time: "",
                    closing_time: ""
                },
                {
                    day: "Friday",
                    available: 0,
                    opening_time: "",
                    closing_time: ""
                },
                {
                    day: "Saturday",
                    available: 0,
                    opening_time: "",
                    closing_time: ""
                },
            ]
        }
    },
    computed: {
        marketerCommission() {
            if (this.plan) {
                if (this.plan.pay_per_sale_type) {
                    if (this.plan.pay_per_sale_type === 'percent') {
                        return this.plan.pay_per_sale + '%';
                    }
                    else {
                        return this.plan.pay_per_sale_currency + ` ${this.plan.pay_per_sale}`
                    }
                }
            }
        }
    },
    methods: {
        saveAvailability() {
            this.$api.post(`/reservations/plans/${this.$route.params.id}/availability`, {items:this.av_days}).then(resp=>{

            }).catch(err=> {

            })
        },
        onStartTimeChanged(meta) {
            this.av_days.find(r => r.day === meta.day).opening_time = meta.time

        },
        onEndTimeChanged(meta) {
            this.av_days.find(r => r.day === meta.day).closing_time = meta.time

        },
        focusAvailableDay(day) {
            if (!day.available) {
                day.available = 1;
            }
            this.av_focused_day = day;

            
        },
        formatDate(date) {
            return moment(date).format("DD MMM, yyyy");
        },
        formatMoney(momey) {
            if (momey) {
                return Intl.NumberFormat('en-US').format(momey)
            }
            return momey
        },
        getReservations() {
            this.loading = true;
            this.$api.get(`/reservations/self`).then(resp=> {
                this.reservations = resp.data.data.list;
                console.log(this.reservations)
            }).catch(err=> {
                
            }).finally(() => {
                this.loading = false;
            })
        },
        getAvailability() {
            this.$api.get(`/reservations/plans/${this.$route.params.id}/availability`).then(resp=> {
                const list = resp.data.data;
                list.forEach(item=> {
                    const model = this.av_days.find(i => i.day === item.day);
                    const index = this.av_days.indexOf(model);
                    this.$set(this.av_days, index, item);
                    this.av_days[index] = item;
                    this.av_days[index].available = item.available ? 1 : 0;
                    
                })
            })
        },
        getPlan() {
            this.$api.get(`/reservations/plans/${this.$route.params.id}/my-plans`).then(resp=> {
                this.plan = resp.data.data;
                this.$store.commit('reservations/setSpaces', this.plan.reservation_spaces)
            }).catch(err=> {

            })
        },
    }
}
</script>

<style lang="scss" scoped>
.day-tag {
    cursor: pointer;
    border-radius: 20px;
    background: #f8fafc;
    color: black;
    font-size: 14px;
    padding: 8px 8px;
    font-weight: 400;
    margin-bottom: 16px;
    margin-right: 16px;
    display:flex;
    justify: space-between;
    align-items: center;
    svg {
        margin-left: 8px;
        height: 10px;
        width: 10px;
        stroke: white;
    }

}
.plan {
    &__container {
        padding: 25px 0;
    }
}
.section {
    padding: 15px 0;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        button {
            @include editbutton;
        }
    }
    &-title {
        color: darkgrey;
        font-size: 18px;
        margin-bottom: 8px;
    }

}
.card {
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    background: white;
    width: 100%;
    //min-height: 200px;
    border-radius: 5px;
    padding: 16px;

    &--availability-times {
        display: grid;
        grid-template-columns: 49% 49%;
        justify-content: space-between;

        .days {
            display: flex;
            flex-wrap: wrap;
            border-right: 1px solid whitesmoke;
        }

        .times {
            display: grid;
            //align-items: center;
            grid-template-columns: 49% 49%;
            justify-content: space-between;
        }
    }
    &--details {
        display: grid;
        justify-content: space-between;
        grid-template-columns: 20% 20% 20% 20% 20%;

        div {
            label {
                color: $charcoal;
            }
            p {
                color: black;
            }
            a {
                color: $darkaccent;
                display:block;
            }
        }
    }
}

</style>




























$breakpoint-alpha: 480px; // adjust to your needs

.table {
  margin: 1em 0;
  min-width: 100%; // adjust to your needs
  //color: lightgrey;
  box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
  background: white;

  tr {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  th {
    min-height: 55px !important;
    display: none; // for accessibility, use a visually hidden method here instead! Thanks, reddit!
  }

  td {
    display: block;


    img {
      height:60px;
      width: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
    &:first-child {
      padding-top: 0.5em;
    }
    &:last-child {
      padding-bottom: 0.5em;
    }

    &:before {
      content: attr(data-th) " "; // who knew you could do this? The internet, that's who.
      //font-weight: bold;

      // optional stuff to make it look nicer
      width: 6.5em; // magic number :( adjust according to your own content
      display: inline-block;
      // end options

      @media (min-width: $breakpoint-alpha) {
        display: none;
      }
    }
  }

  th,
  td {
    text-align: left;

    @media (min-width: $breakpoint-alpha) {
      display: table-cell;
      padding: 0.25em 0.5em;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
}

// presentational styling

@import "https://fonts.googleapis.com/css?family=Montserrat:300,400,700";

body {
  padding: 0 2em;
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: #444;
  background: #eee;
}

h1 {
  font-weight: normal;
  letter-spacing: -1px;
  color: #34495e;
}

.table {
  background: white;
  color: black;
  border-radius: 0.4em;
  overflow: hidden;
  font-size: 15px !important;
  //border: 0.5px solid rgba(211, 211, 211, 0.368);

  tr {
    border-color: rgba(211, 211, 211, 0.368);
    border-top: 0;
    cursor: pointer;
    vertical-align: middle;
  }
  th,
  td {
    border-bottom: 1px solid whitesmoke;
    margin: 0.5em 1em;
    font-size: 16px;
    @media (min-width: $breakpoint-alpha) {
      padding: 1em !important;
    }
  }
  th,
  td:before {
    //color: grey;
    color: black;
    font-weight: 400;
  }
}

.labels {
  min-height: 70px;
  background: #fafafa;
}

</style>