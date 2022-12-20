<template>
    <div class="card">
        <div class="card__header">
            <div class="card__header__text">
                <p>{{computedTitle}}</p>
            </div>
            <div class="filter card__filter">
                <select  v-model="local_filter" name="" id="">
                    <option value="week" :selected="filter && filter.by === 'week'">This week</option>
                    <option  value="month"  :selected="filter && filter.by === 'month'">This month</option>
                    <option value="today" :selected="filter && filter.by === 'today'">Today</option>
                </select>
            </div>
        </div>

        <div class="card__body">
            <Listing v-if="type === 'list'" :records="listing_records" :labels="listing_labels" show_pagination="listing_pagination" />
            <BaseLineChart v-if="type === 'line' && !isLoading" :options='chart_options || default_chart_options' :chartData="chart_data" />
            <BaseBarChart v-if="type === 'bar' && !isLoading" :options='chart_options || default_chart_options' :chartData="chart_data" />
            <BaseDoughnutChart v-if="type === 'pie' && isLoading" :options='chart_options || default_chart_options'  :chartData="chart_data" />
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
    props: ['loading', 'name','title', 'type', 'filter', 'chart_options', 'chart_data', 'listing_records', 'listing_labels', 'listing_pagination'],
    data() {
        return {
            local_filter: '',
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
    watch: {
        local_filter(val) {
            this.$emit('onFilterChanged', {name: this.name, filter: val})
        }
    },
    computed: {
        isLoading() {
            if(typeof(this.loading) !== 'undefined' && this.loading === false) {
                return false
            } 
            else if (typeof(this.loading) !== 'undefined' && this.loading === true) {
                return true
            }
            return false
        },
        computedTitle() {
            const title = this.title;
            if (this.filter && this.filter.by && ['month', 'week'].includes(this.filter.by)){
                return title + " this " + this.filter.by
            }
            else if (this.filter && this.filter.by === 'today') {
                return title + " today"
            }

            return title
        }

        
    },
    methods: { 
        changeFilter() {
            alert("somethin")
            this.$emit('onFilterChanged', {filter: this.local_filter, name: this.name})
        },
    
        fetch() {
            
        }
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
select {
    background: transparent;
    outline: none;
    font-size: 14px;
    color: $faint;
}
.card {
    height: auto;
    border-radius: 5px;
    width: 100%;
        box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
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
        //height: 50px;

        border-radius: 5px;
        background: #fafafa;
        padding: 24px 24px;
        color: $charcoal;

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
                color: $faint !important;
                font-size: 14px !important;
                text-transform: none;
                font-weight: 400;
                //text-align: center;
                display: block;
                width: 100%;
            }
        }


        
    }

    

}
</style>