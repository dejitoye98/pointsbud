<template>
    <SuperadminLayout>
        <template #content>
            
            <div class="properties">
                <div class="properties__container">
                    <div class="header flex flex-end" style="justify-content: flex-end;">
                        <button class="create-btn" @click="$router.push('/superadmin/dashboard/properties/new')">Create New Property</button>
                    </div>
                    <div class="list">
                        
                        <div class="property" v-for="(property, index) in properties" @click="$router.push('/superadmin/dashboard/properties/' + property.id)">
                            <p class="name">
                                {{ property.name }}
                            </p>

                            <div class="details">
                                <div class="detail" v-for="(detail, index) in required_details">
                                    <p>{{detail}}</p>
                                    <span>{{property[detail]}}</span>
                                </div>
                            </div>
                        
                            <p class="date">
                                {{ formateDate(property.createdAt) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </template>

    </SuperadminLayout>
</template>


<script>

import moment from 'moment';
import {mapGetters} from 'vuex';
import SuperadminLayout from '../../../../components/layouts/superadmin-layout.vue';

export default {
    created() {
        this.getProperties();
    },
    data() {
        return {
            required_details: ['investors', 'location', 'current_market_value']
        };
    },
    methods: {
        getProperties() {
            this.$store.dispatch('superadmin/fetchProperties');
        },
        formateDate(string) {
            return moment(string).format("MMM DD, YYYY");
        }
    },
    computed: {
        ...mapGetters('superadmin', ['properties'])
    },
    components: { SuperadminLayout }
}

</script>

<style lang="scss" scoped>
.create-btn {
    @include normalbutton;
    border-radius: 10px;
    width: 200px;
    justify-self: flex-end;
    align-self: flex-end;
}

.properties {
    &__container {
        padding: 24px 0;
        max-width: 800px;
        width: 800px;
        margin: auto;

        @include media("<=t") {
            max-width: 90%;
            width: 90%;
        }
    }
}

.details {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    gap: 8px;
    .detail {
        p {
           font-size: 14px; 
           font-weight: 500;
        }

        span {
            font-size: 13px;
            color: $charcoal;
        }
    }

}
.property{
    padding: 16px;
    background-color: white;
    border-radius: 10px;
    margin: 16px 0;
    cursor: pointer;

    &:hover {
        background-color: whitesmoke;
    }


    .name {
        font-size: 16px;
        font-weight: 600;
    }
    .date {
        color: darkgrey;
        font-size: 12px;
    }
}
</style>