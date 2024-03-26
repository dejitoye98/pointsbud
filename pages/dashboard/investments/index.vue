
import DashboardLayout from '../../../components/layouts/dashboard-layout.vue';
<template>
    <DashboardLayout>
        <template #content>
            
            <div class="overview">

                <div class="overview__container flex gap-16">
                    <div class="overview__card">
                        <div class="icon">
                            <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="36.6796" cy="36.2294" r="36.2382" fill="#FC4904" fill-opacity="0.2"/>
                                <g clip-path="url(#clip0_710_29969)">
                                <path d="M40.5384 28.8973H43.3925L43.3434 27.1588H40.9307L43.1983 22.4724L40.6329 22.2578L38.3797 23.9849L39.1311 22.0317L36.5015 21.7324L35.639 24.1731L34.2218 22.2835L30.3231 22.1481L32.9029 27.1596L30.5741 27.0847V28.8965H32.8182C28.0322 31.6978 24.584 39.0199 24.584 42.9753C24.584 47.9338 29.9989 50.723 36.6776 50.723C43.3562 50.723 48.7711 47.9338 48.7711 42.9753C48.7719 39.0199 45.3245 31.6985 40.5384 28.8973ZM37.6889 45.3541V47.0706H36.0389V45.472C34.9111 45.4229 33.8167 45.1175 33.1772 44.7486L33.6821 42.7803C34.3889 43.1681 35.3828 43.5203 36.4765 43.5203C37.4357 43.5203 38.0925 43.15 38.0925 42.478C38.0925 41.8363 37.5543 41.4319 36.3087 41.0124C34.5068 40.4069 33.2785 39.5641 33.2785 37.933C33.2785 36.4514 34.3223 35.2889 36.1235 34.9367V33.3373H37.7735V34.8188C38.9005 34.8702 39.6594 35.1037 40.2142 35.3736L39.7259 37.2761C39.2883 37.0917 38.5135 36.7032 37.3019 36.7032C36.2074 36.7032 35.8537 37.1741 35.8537 37.645C35.8537 38.2013 36.4433 38.5543 37.8741 39.0932C39.8763 39.8022 40.6851 40.7259 40.6851 42.2422C40.6858 43.738 39.6246 45.0177 37.6889 45.3541Z" fill="#FC4904"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_710_29969">
                                <rect width="28.9906" height="28.9906" fill="white" transform="translate(22.1836 21.7344)"/>
                                </clipPath>
                                </defs>
                                </svg>

                                
                            </div>
                            <div class="flex-col">
                                <p>Total Investment</p>

                                <template v-if="!loading_stats && stats.total_value">

                                    <span>$ {{stats.total_value | money}}</span>
                                </template>

                                <template v-else-if="!loading_stats && !stats.total_value">
                                    $0
                                </template>

                               
                            </div>
                    </div>
                    <div class="overview__card">
                        <div class="icon">
                            <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="36.4062" cy="36.2294" r="36.2382" fill="#5741DB" fill-opacity="0.2"/>
                                <g clip-path="url(#clip0_710_29980)">
                                <path d="M37.2542 37.0764V21.7324C29.0352 22.1635 22.3413 28.8574 21.9102 37.0764H37.2542ZM33.857 34.5285H32.1584V32.8299H33.857V34.5285ZM28.7612 29.4327H30.4598V31.1313H28.7612V29.4327ZM33.0077 29.0811L34.2086 30.282L29.6105 34.8802L28.4095 33.6792L33.0077 29.0811Z" fill="#5741DB"/>
                                <path d="M37.2529 38.7754H27.0938C27.5076 44.188 31.8404 48.5208 37.253 48.9346V38.7754H37.2529Z" fill="#5741DB"/>
                                <path d="M38.9531 25.1299C38.9531 25.3123 38.9531 50.9226 38.9531 50.7221C45.5817 50.2819 50.8999 44.5794 50.8999 37.8412C50.8999 31.1023 45.5833 25.5686 38.9531 25.1299ZM44.0489 37.0767C45.4539 37.0767 46.5968 38.2196 46.5968 39.6246C46.5968 40.7304 45.8847 41.6643 44.8982 42.016V43.8711H43.1996V42.016C42.2132 41.6643 41.501 40.7304 41.501 39.6246H43.1996C43.1996 40.0932 43.5803 40.4739 44.0489 40.4739C44.5175 40.4739 44.8982 40.0932 44.8982 39.6246C44.8982 39.156 44.5175 38.7753 44.0489 38.7753C42.644 38.7753 41.501 37.6323 41.501 36.2274C41.501 35.1216 42.2132 34.1877 43.1996 33.8359V31.9809H44.8982V33.8359C45.8847 34.1877 46.5968 35.1216 46.5968 36.2274H44.8982C44.8982 35.7588 44.5175 35.3781 44.0489 35.3781C43.5803 35.3781 43.1996 35.7588 43.1996 36.2274C43.1996 36.696 43.5803 37.0767 44.0489 37.0767Z" fill="#5741DB"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_710_29980">
                                <rect width="28.9906" height="28.9906" fill="white" transform="translate(21.9102 21.7344)"/>
                                </clipPath>
                                </defs>
                                </svg>
                                

                                
                            </div>
                            <div class="flex-col">
                                <p>Number of Investments</p>

                                <template v-if="!loading_stats && stats.total">

                                    <span>{{stats.total | money}}</span>
                                </template>

                                <template v-else-if="!loading_stats && !stats.total">
                                    0
                                </template>
                                

                              
                            </div>
                    </div>
                    <div class="overview__card">
                        <div class="icon">
                            <svg width="74" height="73" viewBox="0 0 74 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="37.1796" cy="36.2294" r="36.2382" fill="#27CBD6" fill-opacity="0.2"/>
                                <g clip-path="url(#clip0_710_29993)">
                                <path d="M51.4068 27.4323L45.9712 21.9968C45.7121 21.7377 45.3226 21.6598 44.9838 21.8011C44.6449 21.9424 44.4239 22.2704 44.4239 22.6364V25.3541H32.6468C27.1424 25.3541 22.6816 29.8149 22.6816 35.3193C22.6816 35.8194 23.0875 36.2253 23.5876 36.2253H27.2113C27.7113 36.2253 28.1172 35.8194 28.1172 35.3193C28.1172 32.8172 30.1447 30.7897 32.6468 30.7897H44.4239V33.5075C44.4239 33.8735 44.6449 34.2051 44.9838 34.3446C45.3226 34.4859 45.7121 34.408 45.9712 34.1489L51.4068 28.7133C51.7601 28.36 51.7601 27.7857 51.4068 27.4323Z" fill="#27CBD6"/>
                                <path d="M50.7658 36.2295H47.1421C46.6421 36.2295 46.2362 36.6353 46.2362 37.1354C46.2362 39.6376 44.2087 41.6651 41.7066 41.6651H29.9295V38.9473C29.9295 38.5813 29.7085 38.2497 29.3696 38.1102C29.0308 37.9707 28.6431 38.0486 28.3822 38.3077L22.9466 43.7433C22.5933 44.0966 22.5933 44.6709 22.9466 45.0243L28.3822 50.4598C28.6413 50.7189 29.0308 50.7968 29.3696 50.6555C29.7085 50.5142 29.9295 50.1844 29.9295 49.8184V47.1006H41.7066C47.211 47.1006 51.6718 42.6398 51.6718 37.1354C51.6718 36.6353 51.2659 36.2295 50.7658 36.2295Z" fill="#27CBD6"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_710_29993">
                                <rect width="28.9906" height="28.9906" fill="white" transform="translate(22.6836 21.7344)"/>
                                </clipPath>
                                </defs>
                                </svg>
                                

                                
                            </div>
                            <div class="flex-col">
                                <p>Total Revenue</p>
                                <span>{{'USD'}} {{0}}</span>
                            </div>
                    </div>
                </div>

            </div>


            <div class="section">
                
                <div class="sectionstat">

                

                    <div class="sectionstat__header">
                        Monthly total Investment
                    </div>

                    <div class="sectionstat__card">
                        <LineGraph v-if="!loading_monthly_investment_insight" :data="monthly_investment_insight"></LineGraph>
                    </div>

                </div>

                <div class="sectionstat">
                    <div class="sectionstat__header">
                        Monthly Revenue
                    </div>

                    <div class="sectionstat__card">
                        <LineGraph :data="{}"></LineGraph>

                    </div>
                </div>




                
            </div>

            <div class="section">
                <div class="sectionstat sectionstat--full">
                    <div class="sectionstat__header">
                        My Investments
                    </div>
                    <div class="sectionstat__card" style="margin-bottom: 10px;" v-for="(investment, index) in investments" @click="goToProperty(investment.property?.id)">
                       <div class="investment-grid padding-16">

                            <div style="width: fit-content;">
                                <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.394531" y="0.392578" width="65.2288" height="65.2288" rx="21.7429" fill="#FC4904" fill-opacity="0.1"/>
                                <path d="M34.4133 19.8068C34.0383 19.4318 33.5296 19.2212 32.9993 19.2212C32.469 19.2212 31.9604 19.4318 31.5853 19.8068L18.2913 33.0988C18.1983 33.1917 18.1246 33.3021 18.0743 33.4236C18.0239 33.5451 17.998 33.6753 17.998 33.8068C17.998 33.9383 18.0239 34.0685 18.0743 34.1899C18.1246 34.3114 18.1983 34.4218 18.2913 34.5148C18.4791 34.7025 18.7338 34.808 18.9993 34.808C19.1308 34.808 19.261 34.7821 19.3825 34.7318C19.504 34.6815 19.6143 34.6077 19.7073 34.5148L32.9993 21.2208L46.2913 34.5148C46.4791 34.7025 46.7338 34.808 46.9993 34.808C47.2649 34.808 47.5195 34.7025 47.7073 34.5148C47.8951 34.327 48.0006 34.0723 48.0006 33.8068C48.0006 33.5412 47.8951 33.2865 47.7073 33.0988L42.9993 28.3928V21.8068C42.9993 21.5415 42.894 21.2872 42.7064 21.0997C42.5189 20.9121 42.2645 20.8068 41.9993 20.8068H39.9993C39.7341 20.8068 39.4797 20.9121 39.2922 21.0997C39.1047 21.2872 38.9993 21.5415 38.9993 21.8068V24.3928L34.4133 19.8068Z" fill="#FC4904"/>
                                <path d="M33 23.3926L45 35.3926V43.8066C45 44.6022 44.6839 45.3653 44.1213 45.9279C43.5587 46.4905 42.7956 46.8066 42 46.8066H24C23.2044 46.8066 22.4413 46.4905 21.8787 45.9279C21.3161 45.3653 21 44.6022 21 43.8066V35.3926L33 23.3926Z" fill="#FC4904"/>
                                </svg>
                                    
                            </div>

                            <div>
                                <p>{{investment.property?.name}}</p>
                                <span>Property Name</span>
                            </div>
                        
                            <div>
                                <p>{{investment.currency}} {{investment.investment_amount | money}}</p>
                                <span>Investment Amount</span>
                            </div>
                        

                       </div>
                    </div>
                </div>
            </div>
        </template>
    </DashboardLayout>
</template>


<script>
import LineGraph from '../../../components/graphs/LineGraph.vue';

const months_mapping = {
    "01": "Jan", 
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
}
export default {
    data() {
        return {
            loading_stats: false,
            stats: {},
            monthly_revenue: [],
            investments: [],

            loading_monthly_investment_insight: true,
            
            

            raw_monthly_investment_insight: null,
            monthly_investment_insight: {
                labels: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                datasets: [{
                    //label: 'My First Dataset',
                    data: [0,0,0,0,0,0,0,0,0,0,0,0],
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        };
    },
    created() {
        
        this.$store.commit('dashboard/setDashboardTitle', 'Investments' )
        this.$store.commit('dashboard/setActiveTab', 'Investments' )
        this.getInsights();
        this.getInvestments();
    },
    methods: {
        goToProperty(id) {
            if (id) {
                this.$router.push('/dashboard/properties/' + id)

            }
        },
        getInvestments(){
            this.$api.get('/investments').then(resp=> {
                this.investments = resp.data.data;
            })
        },
        getInsights() {
            this.loading_stats = true;
            this.$api.get('/investments/insights').then(resp => {
                this.stats = resp.data.data.stats;
                this.raw_monthly_investment_insight = resp.data.data.monthly_investment;

                if (this.raw_monthly_investment_insight.length) {

                    this.computeMonthlyInvestmentInsight()
                }

            }).catch(e => {
            }).finally(() => {
                this.loading_stats = false;
            });
        },

        computeMonthlyInvestmentInsight() {
            //alert('computing')
             const insights = this.raw_monthly_investment_insight;

            for (let insight of insights) {
                // the momet
                let {month, total} = insight;
                
                month = parseInt(month);
                
                let index = month - 1;
                
                this.monthly_investment_insight.datasets[0].data[index] = total

                this.$set(this.monthly_investment_insight.datasets[0].data, index, total)

                this.loading_monthly_investment_insight = false
            }
        }
    },
    components: { LineGraph }
}
</script>


<style lang="scss" scoped>


* {
    font-family: "Open Sans", sans-serif;
}
.overview {
    &__container {
        @include media("<=t") {
            flex-direction: column;
            gap: 10px;
        }
    }
    &__card{
        border-radius: 20px;
        background-color: white;
        gap: 19px;
        align-items: center;
        min-width: 300px;

        padding: 24px;
        display: flex;

        @include media("<=t") {
            width: 100%;
            min-width: 100%;
        }
        

        p {
            color: grey;
            font-weight: 300;
        }

        span {
            font-weight: 600;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    padding: 30px;
    gap: 16px;
    justify-content: space-between;
    @include media("<=t") {
        flex-direction: column;
    }

    
}

.investment-grid {
    display: flex;
    gap: 16px;
    cursor: pointer;

    @include media("<=t") {
        flex-direction: column;
    }
    &:hover{
        transform: scale(1.01);
    }

    span {
        font-size: 12px;
        //text-transform: uppercase;
        color: $faint;
    }

    p {
        font-weight: 500;
    }
    //justify-content: space-between;
}

.sectionstat {
    width: 45%;
   // display: flex;
    //gap: 20px;
    @include media("<=t") {
       width: 100%;
    }
    &__header {
        font-size: 16px;
        font-weight:600 ;
        margin-bottom: 10px;
    }

    &--full {
        width: 100%;
    }
    

    &__card {
        background-color: white;
        border-radius: 20px;
        min-height: 50px;
        
        
    }
}

</style>