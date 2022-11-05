<template>
    <div class="card">
        <div class="card__header">
            <div class="card__header__text">
                <p>{{title}}</p>
            </div>
            <div class="filter card__filter" v-if="filter_options">
                <select name="" id="">
                    <option>This week</option>
                    <option>This month</option>
                </select>
            </div>
        </div>

        <div class="card__body">
            <Listing v-if="type === 'list'" :records="listing_records" :labels="listing_labels" show_pagination="listing_pagination" />
            <BaseLineChart v-if="type === 'line'" :options='chart_options || default_chart_options' :chartData="chart_data" />
            <BaseBarChart v-if="type === 'bar'" :options='chart_options || default_chart_options' :chartData="chart_data" />
            <BaseDoughnutChart v-if="type === 'pie'" :options='chart_options || default_chart_options'  :chartData="chart_data" />
            <slot></slot>
        </div>
    </div>

</template>

<script>
import BaseLineChart from './BaseLineChart'
import BaseDoughnutChart from './BaseDoughnutChart'
import BaseBarChart from './BaseBarChart'

export default {
    components: {
        BaseLineChart,
        BaseDoughnutChart,
        BaseBarChart
    },
    props: ['title', 'type', 'filter_options', 'chart_options', 'chart_data', 'listing_records', 'listing_labels', 'listing_pagination'],
    data() {
        return {
            default_chart_options: {
                scaleBeginAtZero: true,


                legend: {
                    position: 'top'
                },
                
                responsive: true, 
                maintainAspectRatio: this.type && this.type === 'line' ? false : true, 
                animation: {
                    animateRotate: false
                }           
            },
            filter_default: this.filter_options && this.filter_options.default
        }
    },
    computed: {
        
    },
    methods: {
        
    },
    
    created() {
        if (this.type === 'line' || this.type ==='bar') {
            this.default_chart_options.scales = {xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }   
                    }]}
        }
    },
    mounted(){

    }
}
</script>


<style lang="scss" scoped>

.card {
    height: auto;
    border-radius: 5px;
    width: 100%;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    //padding: 16px;
    border: 0.5px solid rgba(211, 211, 211, 0.442);
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-30 {
        width: 30% !important;
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

    &__body {
       // height: 200px;
       padding: 2px;
    }

    
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        border-radius: 5px;
        background: #fafafa;

        //border-bottom: 0.5px solid rgba(211, 211, 211, 0.368);
        button {
            @include smallbutton-white;
            width: auto;
            padding: 8px 16px;
            height: auto;
            min-height: auto;
        }

        &__text {
            width: 100%;

            p {
                color: black;
                font-size: 16px !important;
                text-transform: none;
                font-weight: 400;
                text-align: center;
                display: block;
                width: 100%;
            }
        }


        
    }

    

}
</style>