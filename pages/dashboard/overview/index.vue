<template>
    <div class="overview">
        <div class="section" v-if="context === 'marketer'">
            <div class="section__container">
                

                <div class="section__body">
                   <div class="section__body__stat section__body__stat--earnings">
                       <StatisticsChart :chart_data='earnings_chart' type="line" title="Earnings this week"/>
                   </div>
                   <div class="section__body__stat section__body__stat--earnings">
                       <StatisticsChart :chart_data='earnings_chart' type="list" title="Top grossing campaigns"/>
                   </div>
                   
                   <div class="section__body__stat section__body__stat--earnings">
                       <StatisticsChart :chart_data='links' type="pie" title="Links"/>
                   </div>

                    <div class="section__body__stat section__body__stat section__body__stat--earnings">
                       <StatisticsChart :chart_data='earnings_chart' type="bar" title="Clicks by time of the day"/>
                   </div>
                    <div class="section__body__stat section__body__stat--50 section__body__stat--earnings">
                       <ClicksByCountryChart :chart_data='earnings_chart' type="bar" title="Clicks by time of the day"/>
                   </div>


                   <!--
                   <div class="section__body__stat section__body__stat--earnings">
                        <StatisticsChart title="Average Earnings">
                            <div class="most">
                                <div class="most__item">
                                    <p>Per Day: N30,000</p>
                                </div>
                                <div class="most__item">
                                    <p>Per week: N40,000</p>
                                </div>
                            </div>
                        </StatisticsChart>
                   </div>-->
                </div>
            </div>
        </div>
        <div class="section">
            <div class="section__container">
                <div class="section__header">
                    <p>Campaigns</p>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="section__container">
                <div class="section__header">
                    <p>Earnings</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import StatisticsChart from '../../../components/charts/StatisticsChart'
import ClicksByCountryChart from '../../../components/charts/ClicksByCountryChart'
export default {
    layout: 'dashboard',
    components: {
        StatisticsChart,
        ClicksByCountryChart
    },
    data() {
        return {
            earnings_chart: {
                labels: ['Mon', 'Tue', 'Wed', "Thur", "Fri", "Sat"],
                datasets: [{
                    label: ['Amount in NGN'],
                    borderColor: ['#DE5C6E'],
                    fill: false,
                    data: [2000, 4000, 5000, 6000, 0, 124, 3234]// to be filled
                }] 
            },
            top_grossing_campaigns: {
                labels: {

                }
            },
            links: {
                labels: ['Accepted Clicks', "Disallowed Clicks"],
                datasets: [
                    {
                    backgroundColor: ['lightseagreen', "#DE5C6E"],
                    data: [100, 200],
                    } 
                ],
            }

        }
    },
    created() {
        
    },
    methods: {
        
    },
    computed: {
       
        context() {
            return window.localStorage.getItem('afContext')
        }
    },
    watch: {
        
    }
}
</script>

<style lang="scss" scoped>
.overview {
    
}

.section {
    &__container {

    }
    &__header {
        margin-bottom: 16px;
        p {
            font-size: 20px;
            color: grey;
        }
    }

    &__body {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;


        &__stat {
            width: 30%;
            margin-bottom: 20px;
            
            @include media("<=dashbreak") {
                width: 100%;
            }
        
            &--earnings {
                
            }

            &--50 {
                width: 65%;
            }
        
        }
    }
}

.most {
    color: grey;
    
    &__item {
        p {
            text-align: center;
            font-size: 20px;
        }
    }
}


</style>