<template>
    <div class="card">
        <div class="card__header">
            <div class="card__header__text">
                <p>Clicks By Country</p>
            </div>
            <div class="filter card__filter" v-if="filter_options">
                <select name="" id="">
                    <option>This week</option>
                    <option>This month</option>
                </select>
            </div>
        </div>

        <div class="card__body">
            <WorldMap/>
            <slot></slot>
        </div>
    </div>

</template>

<script>
import WorldMap from '../../components/WorldMap'

export default {
    components: {
        WorldMap
    },
    props: ['title', 'type', 'filter_options', 'chart_options', 'chart_data'],
    data() {
        return {
            default_chart_options: {

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
        if (this.type === 'line') {
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
    border-radius: 10px;
    width: 100%;
    box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
    padding: 16px;
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
    }

    
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
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
                color: grey;
                font-size: 20px !important;
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