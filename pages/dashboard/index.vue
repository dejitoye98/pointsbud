<template>
    <DashboardLayout>
        <template #content>
            <div class="stuff">
                <div class="content">
                    <CompleteKYCNotification></CompleteKYCNotification>
                   
                    <div class="section" style="margin: 50px 0">
                        <div class="section__header flex space-between flex-center-y">
                            <p class="section__title">
                                
                                Featured Properties
                            </p>

                            <div class="section__buttons flex-center-y">
                                <select v-model="property_category">
                                    <option value="new">New</option>
                                    <option value="popular">Popular</option>

                                </select>
                                <button @click="scrollPropertyList('left')">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.4203 15.3955C13.3477 15.4682 13.2615 15.526 13.1666 15.5653C13.0717 15.6047 12.9699 15.625 12.8672 15.625C12.7644 15.625 12.6626 15.6047 12.5677 15.5653C12.4728 15.526 12.3866 15.4682 12.314 15.3955L7.05778 10.1392C6.99984 10.0814 6.95387 10.0127 6.92251 9.93712C6.89114 9.86151 6.875 9.78046 6.875 9.6986C6.875 9.61675 6.89114 9.5357 6.92251 9.46009C6.95387 9.38448 6.99984 9.3158 7.05778 9.25798L12.314 4.00173C12.6203 3.69548 13.114 3.69548 13.4203 4.00173C13.7265 4.30798 13.7265 4.80173 13.4203 5.10798L8.83278 9.69548L13.4265 14.2892C13.7265 14.5955 13.7265 15.0892 13.4203 15.3955Z" fill="#3F444E" fill-opacity="0.5"/>
                                        </svg>
                                        
                                </button>
                                <button @click="scrollPropertyList('right')">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.57972 15.3955C6.6523 15.4682 6.73851 15.526 6.83342 15.5653C6.92833 15.6047 7.03009 15.625 7.13285 15.625C7.23561 15.625 7.33736 15.6047 7.43228 15.5653C7.52719 15.526 7.6134 15.4682 7.68597 15.3955L12.9422 10.1392C13.0002 10.0814 13.0461 10.0127 13.0775 9.93712C13.1089 9.86151 13.125 9.78046 13.125 9.6986C13.125 9.61675 13.1089 9.5357 13.0775 9.46009C13.0461 9.38448 13.0002 9.3158 12.9422 9.25798L7.68597 4.00173C7.37972 3.69548 6.88597 3.69548 6.57972 4.00173C6.27347 4.30798 6.27347 4.80173 6.57972 5.10798L11.1672 9.69548L6.57347 14.2892C6.27347 14.5955 6.27347 15.0892 6.57972 15.3955Z" fill="#FC4904"/>
                                        </svg>
                                        
                                        
                                </button>
                            </div>

                        </div>

                        <div class="section__content">
                            <div id="property-list" class="property-list flex gap-8">

                                
                                <div style="width: 300px;">

                                    <PropertyItem v-for="(property, index) in properties" :property="property"></PropertyItem>
                                </div>


                              
                            </div>
                        </div>
                    </div>


                    <div style="margin: 50px 0">
                        <div class="flex gap-16">
                            <div class="card investment-flow" style="display: none;">
                                <div class="card__container">
                                    <div class="card__title">
                                        <p>Money Flow</p>

                                        <div class="flex">
                                            <select>

                                            </select>

                                            <p>N100,000</p>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div class="card" style="width: 100%;">
                                <div class="card__container">
                                    <div class="card__title">
                                        <p>Recent transactions</p>

                                        <p class="see-all" @click="$router.push('/dashboard/transactions')">See all</p>
                                       
                                    </div>

                                    <div>
                                        <table>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Transaction Type</th>
                                                    <th>Status</th>
                                                </tr>

                                                <tr v-for="(tx, index) in transactions.slice(0, 5)">
                                                    <td> {{ formatDate(tx.createdAt) }} </td>
                                                    <td>{{tx.currency || 'USD'}}{{tx.amount | money}}</td>
                                                    <td>{{refineTransactionType(tx.debit_or_credit)}}</td>
                                                    <td>{{tx.status}}</td>
                                                </tr>
                                            
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../components/layouts/dashboard-layout.vue';
import CompleteKYCNotification from '../../components/notifications/CompleteKYCNotification.vue';
import PropertyItem from '../../components/properties/PropertyItem.vue';
import {mapGetters} from 'vuex';
import moment from 'moment';

export default{
    layout: 'dashboard-layout',
    
    data() {
        return {
            property_category: 'new',
            transactions: [],

            loading_properties: false,
            //properties: [],
        };
    },
    computed: {
        ...mapGetters('dashboard', ['properties'])
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', 'Dashboard' )
        this.$store.commit('dashboard/setActiveTab', 'Dashboard' )
        this.$store.dispatch('dashboard/fetchProperties')
        this.getTransactions()
       /* this.getProperties().finally(()=> {
           // this.loading_properties = false;
        })*/
    },
    methods:{

        refineTransactionType(tx_type) {
            let type = "Debit"; 

            if (tx_type === 'cr') {
                type = "Credit"
            }
            return type
        },

        formatDate(date){
            return moment(date).format("MMM DD, YYYY").toString()
        },
        getTransactions() {
            this.$api.get('/transactions').then(resp=>{
                this.transactions = resp.data.data.items;
            })
        },

        scrollPropertyList(leftorright) {
            const propertyList = document.getElementById('property-list');
            if (leftorright === 'left') {
                propertyList.scrollBy({
                    left: -300,
                    behavior: 'smooth'
                })
            }else{
                propertyList.scrollBy({
                    left: +300,
                    behavior: 'smooth'
                })

            }
        },
        async getProperties(){
            this.loading_properties = true;

            const payload =  {tag: this.property_category}

            return await this.$store.dispatch('dashboard/fetchProperties', payload);

           
            
        }
    },

    watch: {
        property_category(value) {
            this.getProperties()
        }
    },
    components: { DashboardLayout, CompleteKYCNotification, PropertyItem }
}

</script>



<style lang="scss" scoped>

*{
    font-family: "Open Sans", sans-serif;
}



table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;    //padding: 24px;
}

th, td {
    //border: 1px solid #ddd;
    //padding: 8px;
    font-size: 15px;

}

td {
    padding: 16px 24px;
    font-weight: 400;
    font-size: 15px;


}

th {
    //background-color: #f2f2f2;
    color: black;
    color: #000;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
min-width: 100px !important;
height: 60px;
background-color: #F0F1F3;

padding: 16px 24px;
color: #525f7f;
text-transform: uppercase;
//background-color: #f5f9fc;


}


tr {
    line-height: 40px !important;
    padding: 16px;
}
tr:nth-child(even) {
    //background-color: #f9f9f9;
}

tr:hover {
    //background-color: #e8e8e8;
}

.header {
    &__container{
        display: flex;
        justify-content: flex-end;
    }

    
}


.section {
    padding: 20px 0;
    &__title {
        color: #16232D;
        font-size: 18px;
        line-height: 22px;
        font-weight: 600;
    }

    &__content {
        padding: 24px 0px;
    }

    &__header {
        @include media("<=t") {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }

    &__buttons {
        display: flex;
        gap: 8px;
       select, button {
            padding: 8px;
            border: 1px solid #3f444e8c;
            border-radius: 10px;
        }
    }
}

.profile {
    display: flex;


}


.card {
    border-radius: 10px;
    width: fit-content;
    background: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    
   // max-width: 45%;

   .see-all {
    color: $primary;
    font-size: 14px;
    cursor: pointer;
   }

    &__container {
        padding: 16px;
        width: 100%;
    }

    &__title {
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 19px ;
    }
}

.property-list {
    width: 100%;
    overflow: scroll;
    scrollbar-width: none;
    max-width: 75vw;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>