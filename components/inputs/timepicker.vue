<template>
    <div class="container">
        <div class="timepicker" @click="showTimeDropdown">
            {{ local_time || placeholder }}
            <svg
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                    stroke="rgba(0,0,0,.5)"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001"
                    stroke="rgba(0,0,0,.5)"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>

        <div class="timepicker__dropdown" v-if="show_time_dropdown">
            <ul>
                <li
                    @click="chooseTime(t)"
                    v-for="(t, index) in hours"
                    :key="index"
                >
                    {{ t }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ["time", "placeholder", "day", "type"],
    data() {
        return {
            local_time: this.time,
            hours: [
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
                "11:00 PM",
            ],
            show_time_dropdown: false,
        };
    },
    methods: {
        showTimeDropdown() {
            this.show_time_dropdown = true;
        },
        chooseTime(time) {
            this.local_time = time;
            this.show_time_dropdown = false;
            this.$emit("onTimeChanged", {
                time: this.local_time,
                day: this.day,
                type: this.type,
            });
        },
    },
    watch: {
        time(value) {
            this.local_time = value;
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}
.timepicker {
    border: 0.5px solid lightgrey !important;
    cursor: pointer;
    width: 100%;
    min-height: 40px;
    cursor: text;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    font-size: 14px;
    position: relative;
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
        ul {
            width: 100%;
            li {
                //height: 30px;
                z-index: 10000000;
                color: black;
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
</style>
