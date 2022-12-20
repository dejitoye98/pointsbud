<template>
    <div class="grid">
        <!--- remember to change the onFilteChanged -->
        <div class="grid__item">

            <ValueChart
                
                :loading="loading.value"
                @onFilterChanged="changeValueFilter" 
                name='Sales Value'
                title='Sales Value'
                type="bar"
                :model="clicks.value"

            />
        </div>

        <div class="grid__item">

            <VolumeChart
                
                :loading="loading.volume"
                @onFilterChanged="changeVolumeFilter"
                name='Sales Volume'
                title='Sales Volume'
                type="line"
                :model="clicks.volume"

            />
        </div>
        <div class="grid__item">

            <ClicksReferrersTable
                v-if="clicks.top_referrers && clicks.top_referrers.data && clicks.top_referrers.data.length > 0"
                :clicks="clicks"
            />
        </div>

        
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: ['campaign'],
    data() {
        return {
            loading: {
                volume: '',
                value: ''
            },
            clicks: {
                
                top_referrers: {
                    labels: {
                        "Referrer": {
                            type: 'text',
                            property: 'referrer',
                        },
                        "Clicks": {
                            type: "number",
                            property: 'total'
                        }
                    },
                    data: []
                },

                volume: {
                    group_by_day: [],
                    filter: {
                        by: "month"
                    },
                    chart: {
                        labels: [],
                        datasets: [{
                            label: ['Amount'],
                            borderColor: ['lightseagreen'],
                            fill: false,
                            data: [],
                            backgroundColor: 'lightseagreen',
                            pointBackgroundColor: 'white',
                            borderWidth: 2,
                            pointBorderColor: 'lightseagreen',
                        }]

                    }, 
                },
                value: {
                    group_by_day: [],
                    filter: {
                        by: "week"
                    },
                    top_referrers: [],
                    chart: {
                        labels: [],
                        datasets: [{
                            label: ['Amount'],
                            borderColor: ['#DE5C6E'],
                            fill: false,
                            data: []
                        }]

                    }, 
                },
                

            },
        }
    },
    mounted(){
        this.initialize();
    },
    computed: {
        monthDaysMapping() {
            return {
                '01': 31,
                '02': 29,
                '03': 31,
                '04': 30,
                '05': 31,
                '06': 30,
                '07': 31,
                '08': 31,
                '09': 30,
                '10': 31,
                '11': 30,
                '12': 31
            }
        },
        monthNameMapping() {
            return {
                '01': "Jan",
                '02': "Feb",
                '03': "Mar",
                '04': "Apr",
                '05': "May",
                '06': "Jun",
                '07': "Jul",
                '08': "Aug",
                '09': "Sep",
                '10': "Oct",
                '11': "Nov",
                '12': "Dec",
            }
        }
    },
    
    methods: {
        getData(type, filter) {
            this.loading[type] = true;
            let url = `/insights/clicks?include=group_by_day,top_referrers&time=${filter.by}`
            if (this.campaign) url += `&campaign_id=${this.campaign.id}`;
            this.$api.get(url).then(resp=>{
                this.loading[type] = false;

                this.clicks[type].group_by_day = resp.data.data.group_by_day
                this.computeClicksData(type);
            }).catch(err=> {
                this.loading[type] = false;
            })

        },
        pad(n) {
            if (String(n).length === 1) {
                return "0" + n
            }
            return String(n);
        },
        initialize() {
            this.loading.value = true;
            this.loading.volume = true;
            let url = `/insights/sales?include=group_by_day,top_referrers&time=${this.clicks.volume.filter.by}`
            if (this.campaign) url += `&campaign_id=${this.campaign.id}`
            this.$api.get(url).then(resp=>{
                this.loading.value = false;
                this.loading.volume = false;

                this.clicks.volume.group_by_day = resp.data.data.group_by_day
                this.clicks.value.group_by_day = resp.data.data.group_by_day

                this.clicks.top_referrers.data = resp.data.data.top_referrers

                this.computeClicksData('value');
                this.computeClicksData('volume')
            }).catch(err=>{
                this.loading.value = false;
                this.loading.volume = false;
            })
        },
        changeVolumeFilter(val) {
            this.clicks.volume.filter.by = val.filter
            this.getData('volume', this.clicks.volume.filter)

        },
        changeValueFilter(val) {
            this.clicks.value.filter.by = val.filter
            this.getData('value', this.clicks.value.filter)
        },
        computeClicksData(type) {
            if (this.clicks[type].filter.by === 'week') {
                try {
                    
                    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    const datasets =[0, 0, 0, 0, 0, 0, 0]
                    this.clicks[type].chart.labels = labels;
                    this.clicks[type].group_by_day.forEach(data=> {
                        const day = moment(data.date).day();
                        // use amount for value and  total for volume;
                        datasets[day] = type == 'value' ? data.amount || 0 : data.total; 
    
                        
                    })
                    this.$set(this.clicks[type].chart.datasets[0], 'data', datasets)
                    //this.clicks[type].chart.datasets[0].data = datasets;
                    this.loading[type] = false;
                }catch(err) {
                    alert(err)
                }

            }
            else if (this.clicks[type].filter.by === 'month') {
                try {
                    const labels = [];
                    const datasets = [];
                    const month = new Date().getUTCMonth()
                    for (let i = 1; i <= this.monthDaysMapping[month]; i++) {
                        labels.push(this.pad(i))
                        datasets.push(0)
                    }

                    //this.clicks[type].chart.labels = labels;
                    this.clicks[type].group_by_day.forEach(data=> {
                        const clickday = this.pad(moment(data.date).date());
                        const index  = labels.indexOf(clickday);
                        datasets[index] = type === 'value' ? data.amount || 0 : data.total;
                    })
                    // change labels
                    
                    this.clicks[type].chart.labels = labels;
                    this.$set(this.clicks[type].chart.datasets[0], 'data', datasets)
                    this.loading[type] = false;

                }catch(err) {
                    alert(err)
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    justify-content: space-between;
    @include media("<=dashbreak") {
        grid-template-columns: 100%;
    }
    &__item {
        
    }
}
</style>