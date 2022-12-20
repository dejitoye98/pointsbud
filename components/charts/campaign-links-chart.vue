<template>
    <div class="card">
        <div class="card__stat">
            <BaseDoughnutChart v-if="this.campaign_links && show" :chartData="chartData" :options="options"/>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center">
            <p class="card__lead">{{(campaign_links && campaign_links.stat && parseInt(campaign_links.stat.accepted_clicks) + parseInt(campaign_links.stat.blocked_clicks)) || 0}}</p>
            <p class="card__caption">link clicks</p>
        </div>
    </div>
</template>

<script>
import BaseDoughnutChart from './BaseDoughnutChart'
export default {
    components: {
        BaseDoughnutChart
    },
    props:['campaign_links', 'show'],
    data() {
        return {
            options: {
                
                legend: {
                    position: 'top'
                },
                
                responsive: true, 
                maintainAspectRatio: true, 
                animation: {
                    animateRotate: false
                }
            }
        };
    },
    computed: {
        
        
        chartData() {
            if (this.campaign_links) {
                return {
                    labels: ['Accepted Clicks', "Disallowed Clicks"],
                    datasets: [
                    {
                        backgroundColor: ['lightseagreen', "#DE5C6E"],
                        data: [parseInt(this.campaign_links.stat.accepted_clicks), parseInt(this.campaign_links.stat.blocked_clicks)],
                     } ]
                }
            }
            else {
                return {}
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.card {

    height: auto;
    border-radius: 10px;
    width: 100%;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    padding: 16px;
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    background: white;
    display: flex;
    //flex-direction: row !important;
    //justify-content: space-between;
    flex-direction: column ;
    &__stat {
        width: 50%;
        display: flex;
        justify-content: center;
        margin: auto;
        height: auto;

        &:deep(.chartjs-render-monitor) {
            position: relative;
            height: 250px !important;
            width: 250px !important;
        }
    }

    &__content {
        width: 100%;
        text-align: center;
    }

    &-30 {
        //width: 30% !important;
        width: 50% !important;
    }
    &--flex {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between;
        align-items: center !important;

        @include media("<=t") {
            flex-direction: column !important;
            align-items: flex-start !important;
        }

    }

    &__lead  {
        color: black;
        font-size: 44px;
    }
    &__caption {
        color: darkgrey;
        font-size: 20px;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        border-bottom: 0.5px solid rgba(211, 211, 211, 0.368);
        button {
            @include smallbutton-white;
            width: auto;
            padding: 8px 16px;
            height: auto;
            min-height: auto;
        }

        p {
            color: black;
            font-size: 16px !important;
            text-transform: none;
            font-weight: 600;
        }

        
    }

    &__body {
        display: flex;
        flex-wrap: wrap;
        padding: 16px 0;
        &__detail {
            display: flex;
            flex-direction: column;
            margin-right: 20px;
            //border: 1px solid black;
            max-width: 200px;
            margin-bottom: 16px;
            padding-right: 0px 16px;

            p {
                color: grey;

                &:first-of-type {
                    font-weight: 500 !important;
                    //text-transform: uppercase;
                }
                font-weight: 400;
            }
        }
    }
}
</style>