<template>
    <div class="campaigns">
       <Modal title='Create campaign' v-if="createCampaign">
           <FormCreateCampaign />
       </Modal>

       <Listing :records="campaigns" item-link="/campaigns/:id" :labels="campaignLabels" :pagination="campaigns_page_info"/>
    </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
    layout: 'dashboard',
    data() {
        return {
            create_campaign: false,
            campaigns: [],
            campaigns_page_info: {},
            campaignLabels: {
                'Title': {
                    property: 'title',
                    type: 'text'
                },
                'Budget': {property: 'budget', type: 'money'},
                'Budget Left' : {property:'budget_left', type: 'money'},
                'Ends At': {property: 'ends_at', type: 'date'}
            }

        }
    },

    computed: {
        ...mapGetters('dashboard', ['createCampaign'])
    },

    methods: {
        getCampaigns() {
            this.$api.get('/campaigns')
                .then(resp => {
                    this.campaigns = resp.data.data.list;
                    this.campaigns_page_info = resp.data.data.page_info;
                })
                .catch(err=> {
                    
                })
        },
    },

    created() {
        this.$store.commit('dashboard/setActive', 'Campaigns')
        this.$store.commit('dashboard/setDashboardTitle', 'Campaigns');
        this.getCampaigns();
    },

}
</script>

<style lang="scss" scoped>
.campaigns {
    width: 100%;
    position: relative;
}

</style>