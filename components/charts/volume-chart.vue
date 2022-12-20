<template>
    <div>
        <StatisticsChart 
            :loading="loading"
            @onFilterChanged="changeFilter" 
            :filter="model.filter"  
            :title="title" 
            type="bar" 
            :chart_data="model.chart" 
            :name="name" />
    </div>
</template>


<script>

import moment from "moment";
export default {
    props: ['model', 'loading', 'title', 'name' ],
    
    created() {
        //this.getClicks()
    },
    data() {
        return {
            
        }
    },
    watch: {
        clicksFilter() {
           // this.getClicks();
        } 
    },
    computed: {
        clicksFilter() {
            //return this.clicks.filter.by;
        }
    },

    methods: {
        changeFilter(val) {
            this.$emit('onFilterChanged',val)
        },
       
    }
    
}
</script>


<style lang="scss" scoped>
.loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>