<template>
    <div style="width: 100%">
        <Modal title="Find marketers" @close="close">
            <template>
                <div class="container">
                    <div class="filter">
                        <div class="filter__item">
                            <label for="">Name</label>
                            <input type="text">
                        </div>
                        <div class="filter__item">
                            <label for="">Industry</label>
                            <select type="text">
                                <option selected></option>
                                <option v-for="(industry, index) in industries" :key="index"> {{industry}}</option>    
                            </select>
                        </div>
                        <div class="filter__item">
                            <label for="">Score</label>
                            <div class="flex-row">
                                <div class="display: flex; flex-direction:column">
                                    <label for="">Min</label>
                                    <input type="number">
                                </div>
                                
                                <div class="display: flex; flex-direction:column">
                                    <label for="">Max</label>
                                    <input type="number">
                                </div>
                                
                            </div>
                        </div>
                        <button>Filter</button>
                    </div>
                    <div class="content">
                        <div class="content__container">
                            <div class="content__item" v-for="(marketer, index) in marketers" :key="index">
                                <div class="content__item__image" style="margin-right: 10px;">
                                    <img src="https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg'" alt="">
                                </div>
                                <div class="content__item__details">
                                    <p>{{marketer.name}}</p>
                                    <p>{{marketer.bio}}</p>
                                </div>
                                
                                
                            
                                
                                <div class="content__item__cta">
                                   <button @click="inviteMarketer(marketer.id)">Invite</button>
                                </div>
                            </div>
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
    name: "FindMarketersModal",
    props: ['campaign', 'show', 'invitations'],
    computed: {
        computedCampaign() {
            return this.campaign;
        }
    },
    components: {
        Modal
    },
    created() {
        this.getMarketers()
    },
    data() {
        return {
            marketers: [],
            industries: [
                'Arts and Entertainment',
                'Automotive',
                'Beauty and Fitness',
                'Books and Literature',
                'Business and Industrial Markets',
                'Computer and Electronics',
                'Finance',
                'Food and Drink',
                'Games',
                'Healthcare',
                'Hobbies and Leisure',
                'Home and Garden',
                'Internet and Telecommunication',
                'Jobs and Education',
                'Law and Government',
                'News',
                'Online Communities',
                'People and Society',
                'Pets and Animals',
                'Real Estate',
                'Reference',
                'Science',
                'Shopping',
                'Sports',
                'Travel',
                'Other'
            ],
            show: false
        }
    },
    methods: {
        inviteMarketer(marketer_id) {
            const payload = {
                campaign_id: this.campaign.id,
                marketer_id: marketer_id,
            }

            this.$api.post(`/campaigns/${this.campaign.id}/invite`, payload)
                .then(resp=> {
                    this.$store.commit('dashboard/setActionFindMarketers', false)
                    this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "Marketer was invited successfully"});
                })
                .catch(err=> {
                    const error = err.response && err.response.data.data || err
                    this.$store.dispatch('dashboard/actionShowErrorToast', {message: error}); // show error

                })
        },
        getMarketers() {
            this.$api.get('/marketers?for_campaign_id=' + this.campaign.id).then(resp=> {
                this.marketers = resp.data.data.list
            }).catch(err=> {

            })
        },
        close() {
            this.$store.commit('dashboard/setActionFindMarketers', false)

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
.container {
    display: flex;
}

.flex-row {
    display: flex;
    input {
        width: 45%;
    }
}
.filter {
    max-width: 200px;
    border-radius: 1px solid lightgrey;
    font-size: 14px;

    &__item {
        @include plain-form-input;
        color:$faint;
        display: flex;
        flex-direction: column;
        label {
            color: $faint;
            font-size: 14px;
        }
        input {
            //border: 0.5px solid lightgrey;
            padding: 2px 3px !important;
            height: auto !important;
            max-height: auto !important;
        }
    }

    button {
        @include smallbutton;
        border-radius: 5px !important;
        width: 100% !important;
    }
}

.content {
    width: 90%;
    margin: auto;
    color: $faint;
    //overflow-x: scroll;
    &__container {
        padding: 0 24px 0 30px;;
        width: 100%;
    }

    &__item {
        //border: 1px solid red;
        display: grid;
        grid-template-columns: 5% 80% 10% ;
        //grid-template-rows: 50px 50px 50px 50px;
        grid-gap: 1px;
        justify-content: space-between;
        width: 100%;
        font-size: 14px;
        margin-bottom: 8px;


        &__image {
            //display: block;
            height: 50px ;
            width: 50px;


            //border: 1px solid pink;
            border-radius: 50%;
            img {
                object-fit: cover;
                width: 100%;
                height: 100%;
                border-radius: 50%;

            }
        }

        &__score {
            vertical-align: middle;
            display: flex;
            align-items: center;
        }

        &__details {
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-height: 46px; 
            p {
                &:last-of-type  {
                    font-weight: 300;
                    overflow: hidden;

                }
            
            }
        }
        &__cta {
            display: flex;
            align-items: center;
            justify-content: center;

            button {
                @include editbutton;
            }
        }

        p {
            &:first-of-type {
                color: black;
            }
        }
    }
}
</style>