<template>
    <div style="width: 100%" v-if="show">
        <Modal width="half" :header="false">
            <template>
                <div style="display: flex; flex-direction: column">

                    <div class="image">
                        <img src="../../static/celebrating.svg"/>
                    </div>

                    <div class="body">
                        <p class="body__congratulations">Congratulations!</p>
                        <p class="body__caption">You've joined the campaign {{ campaign&& campaign.title}}</p>
                        <div class="body__buttons">
                            <button @click="show = false">Stay here</button>
                            <button @click="goToCampaign">Go To Campaign</button>
                        </div>
                    </div>
                </div>
            </template>
        </Modal>
    </div>

</template>


<script>
import Modal from '../Modal'
export default {
    name: "JoinedCampaignModal",
    props: ['campaign'],
    computed: {
        computedCampaign() {
            return this.campaign;
        }
    },
    components: {
        Modal
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        close() {
            this.show = false;
        },
        goToCampaign() {
            this.$router.push(`/dashboard/campaigns/${this.campaign.id}`)
        },
    },
    watch:{
        campaign(value) {
            this.show = true
        }
    },
}
</script>

<style lang="scss" scoped>
.body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;

    &__congratulations {
        font-size: 25px;
        font-weight: 500;
    }
    &__caption {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 16px;
    }
    &__buttons {
        width: 50%;
        display: flex;
        justify-content: space-between;
    
        button {
            @include smallbutton;
            width: 48% !important;
            &:first-of-type {
                @include smallbutton-white
            }
        }
    }
}
.image {
    width: 100%;
    height: 200px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>