<template>
  <div class="modal">
    <div class="modal__mask" @click="$emit('close', true)">
      <div class="modal__container" @click.stop>
        <div class="modal__header"></div>

        <div class="modal__body">
          <template v-if="!loading">
            <div class="calendar" v-if="!loading">
              <template>
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
                      <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
                      <div class="flex-grow overflow-y-auto overflow-x-auto">
                        <p
                          v-for="attr in attributes"
                          :key="attr.key"
                          class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                          :class="
                                                        attr.customData.class
                                                    "
                          @click="
                                                        chooseAttribute(attr)
                                                    "
                        >{{ attr.customData.title }}</p>
                      </div>
                    </div>
                  </template>
                </Calendar>
              </template>
            </div>
          </template>
          <template v-else>
            <LoadingState></LoadingState>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";

import moment from "moment";
export default {
  components: {
    Calendar
  },
  props: [
    "title",
    "width",
    "close",
    "header",
    "classes",
    "inputs",
    "startTime",
    "day",
    "space",
    "plan"
  ],
  data() {
    return {
      focusedDay: "",
      chosenAttribute: {},
      offTimeData: [],
      events: [],
      loading: false
    };
  },
  computed: {
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
              all_day: event.all_day
            },
            dates: new Date(event.day)
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
              all_day: time.all_day
            },
            dates: new Date(time.day)
          };
          array.push(obj);
        });
        return array;
      }
      return [];
    },
    computedCalendarAttributes() {
      return this.computedOffTimes.concat(this.computedEventsData);
    }
  },
  methods: {
    getOffDays() {
      this.$api
        .get(`/reservations/plans/${this.plan.id}/off-times`)
        .then(resp => {
          this.offTimeData = resp.data.data;
        });
    },
    getEvents() {
      this.loading = true;
      this.$api
        .get(`/reservations/plans/${this.plan.id}/events`)
        .then(resp => {
          this.events = resp.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.getOffDays();
    this.getEvents();
  }
};
</script>
<style>
.lightseagreen {
  background: #de5c6e;
  max-width: 100px;
}
.primary {
  background: #de5c6e;
}
</style>
<style lang="scss" scoped>
.calendar {
  padding: 0 16px;
}

@keyframes fadeIn {
  0% {
    background: rgba(0, 0, 0, 0);
  }
  100% {
    background: rgba(0, 0, 0, 0.7);
  }
}

.modal {
  z-index: 10000000000000;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;

  &__mask {
    width: 100vw;
    height: 100%;
    padding: 64px 0;
    position: fixed;
    //margin-left: 120px;
    overflow: scroll;
    background: rgba(0, 0, 0, 0);
    animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    @include media("<=dashbreak") {
      margin-left: 0 !important;
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
      align-items: flex-start;

      svg {
        cursor: pointer;
      }
    }
    &__text {
      p {
        &:first-of-type {
          font-size: 16px;
          color: black;
          font-weight: 500;
        }
        font-size: 14px;
        color: $faint;
      }
      // text-transform: uppercase;
    }
  }

  &__container {
    //width: 30%;
    width: max-content;
    background: white;
    min-height: auto;
    margin: auto;
    //margin-top: 50px;
    margin-top: 50px;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
    border-radius: 5px;
    @include media("<=t") {
      width: 90% !important;
    }

    &--half {
      width: 50% !important;
    }

    &--quarter {
      width: 25% !important;
    }
  }

  &__body {
    width: max-content;
    //width: 95%;
    margin: auto;
    padding: 16px 0;
  }

  &__footer {
    padding: 16px;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 49% 49%;
    border-top: 2px solid whitesmoke;

    button {
      @include smallbutton;
      font-weight: 400 !important;
      &:first-of-type {
        background: white;
        color: $charcoal;
        border: 1.5px solid lightgrey;
      }

      &:hover {
        transform: translateY(0);
        box-shadow: rgba(0, 0, 0, 0.1) 0 2px 2px;
      }
    }
  }
}
.header-icon {
  border: 1px solid whitesmoke;
  padding: 8px;
  border-radius: 5px;
  margin-right: 16px;
}
.hour-choice {
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: black;
    font-size: 30px;
    font-weight: 500;
  }
  button {
    border-radius: 5px;
    border: 0.5px solid lightgrey;
    color: black;
    padding: 4px 16px;
    &:first-of-type {
      margin-right: 16px;
    }
    margin-left: 18px;
    &:hover {
    }
  }
}
.hours {
  border-bottom: 2px solid whitesmoke;
  color: $charcoal;
  text-align: center;
  padding-bottom: 16px;
  font-size: 14px;
}
.form {
  padding: 16px 0px;
  border-bottom: 2px solid whitesmoke;
}
.form-input {
  @include plain-form-input;
  label {
    color: $charcoal;
    font-size: 14px;
  }
  input {
    background: white;
    border: 2px solid whitesmoke !important;
  }
}

.totals {
  padding: 16px 0;
  &__item {
    margin-bottom: 8px;
    color: black;
    display: flex;
    justify-content: space-between;
    font-size: 14px;

    p {
      &:first-of-type {
        font-weight: 500;
        color: black;
      }
      color: $charcoal;
      font-weight: 500;
    }
  }
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
