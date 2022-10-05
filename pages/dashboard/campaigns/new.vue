<template>
    <div class="new">
        
        <template>
            <div class="section">
                <div class="section__header">
                    <p>General Details</p>
                </div>
                <div class="section__body">
                    <div class="section__body__container">

                        <div class="form-input">
                            <span class="error">{{errors.title}}</span>
                            <label for="">Title of campaign <span class="red">*</span></label>
                            <input  v-model="campaign.title" type="text">
                        </div>
                        <div class="form-input">
                            <span class="error">{{errors.description}}</span>
                            <label for="">Description <span class="red">*</span></label>
                            <textarea v-model="campaign.description"> </textarea>
                        </div>
                        <div class="half">
                            <div class="form-input">
                                <span class="error">{{errors.budget}}</span>
                                <label for="">Budget <span class="red">*</span></label>
                                <!--
                                <input  v-model="campaign.budget" type="number">-->
                                <div style="width: 100%">

                                    <CurrencyMoneyInput @onChange="setCampaignBudget"/>
                                </div>
                            </div>
                            <div class="form-input">
                                <span class="error">{{errors.marketeres_required}}</span>
                                <label for="">No. of marketers required <span>(Default: unlimited)</span></label>
                                <input  v-model="campaign.marketers_required" type="number">
                            </div>
                        </div>

                        <div class="half">
                            <div class="form-input">
                                <span class="error">{{errors.ends_at}}</span>
                                <label for="">End Date <span class="red">*</span></label>
                                <DatePicker v-model="campaign.ends_at" />
                            </div>
                            <div class="form-input">
                                <label for="">Display Picture</label>
                                <input type="file" id="imagefile"  accept="image/*"  @change="addThumbnail">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template>
            <div class="section">
                <div class="section__header">
                    <p>Links Details</p>
                </div>
                <div class="section__body">
                    <div class="section__body__container">

                        <div class="form-group advert-link"  v-for="(link,index) in campaign.links_to_advertise" :key="index">
                                <span class="error">{{link_errors[index]}}</span>
                            <div class="advert-link-head" v-if="index !== 0" @click="removeLink(index)">
                                <span>Remove</span>
                            </div>
                            <div class="form-group form-group--row advert-link-row">
                                <div class="form-input">
                                    <label for="">Link URL <span class="red">*</span></label>
                                        <input type="text" placeholder="https://link-you-want-to-advertise.com" v-model="link.link">
                                </div>
                                <div class="form-input">
                                    <label for="">Cost per click <span class="info">info</span> <span class="red">*</span></label>
                                    <!--<input type="number" v-model="link.pay_per_click">-->
                                    <CurrencyMoneyInput :meta="{index: index}" @onChange="setCostPerClick"/>

                                </div>
                            </div>
                            <div class="form-input">
                                <label for="">Advert note <span class="info">info</span> <span class="red">*</span></label>
                                <textarea :placeholder="'We are selling products. Visit: ' +  link.link" v-model="link.advert_note"></textarea>
                            </div>
                        </div>
                        <div class="add-link">
                            <p @click="addLink">Add link</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template>
            <div class="section">
                <div class="section__header">
                    <p>Privacy & Settings</p>
                </div>
                <div class="section__body">
                    <div class="section__body__container">
                        <div class="form-input">
                            <span class="error" v-if="errors.who_can_join">{{errors.who_can_join}}</span>
                            <label for="" class="">Who can join this campaign? <span class="red">* </span></label>

                            <div class="flex-row">
                                <label class="checkbox-label"><input v-model="campaign.who_can_join"  value="0" name="who_can_join" type="radio">Anyone<span></span></label>
                                <label class="checkbox-label"><input  v-model="campaign.who_can_join" value="1" name="who_can_join" type="radio">Invited marketers<span></span></label>
                                <label class="checkbox-label"><input  v-model="campaign.who_can_join" value="2" name="who_can_join" type="radio">Applicants<span></span></label>
                            </div>
                        </div>

                        <div class="application_questions" v-if="[2, '2'].includes(campaign.who_can_join)">
                            <div v-for="(q, index) in campaign.application_questions" :key="index" class="form-input">
                                <span class="error" v-if="index === 0">{{errors.application_questions}}</span>
                                <label for="">Application Question {{index + 1}} <span class="red" v-if="index === 0">*</span></label>
                                <input type="text" placeholder="eg: How many clicks can you drive to this campaign?" v-model="campaign.application_questions[index]">
                            </div>             
                            <div class="add-link" style="padding-top: 0px !important">
                                <p @click="addQuestion">Add Question</p>
                            </div>           
                        </div>

                        <div class="form-input">
                            <label for="" class="">Do you intend to add more links to this campaign in the future?</label>
                            <div class="flex-row">
                                <label class="checkbox-label"><input v-model="campaign.recurring_links"  value="0" name="intent" type="radio">Yes<span></span></label>
                                <label class="checkbox-label"><input  v-model="campaign.recurring_links" value="1" name="intent" type="radio">No<span></span></label>
                            </div>
                        </div>

                        <!--
                        <div class="form-input">
                            <label class="bold-label" for="">Accept traffic to links from: Default()</label>
                            <div style="display: flex; flex-wrap: wrap">
                                <label class="checkbox-label"  v-for="continent in Object.keys(continents)" :key="continent"><input type="checkbox" @change="chooseContinent(continent)">All {{continent}}</label>
                                <label class="checkbox-label"  v-for="country in countries" :key="country.name"><input  type="checkbox" class="countries-choice" :id="'choice_' + country.code.toLowerCase() " @change="checkCountry(country)">{{country.name}}</label>
                            </div>
                        </div> -->
                    </div>
                    
                </div>
            </div>
        </template>
        <template>
            <div class="section">
                <div class="section__header">
                    <p>Fraud Prevention</p>
                </div>
                <div class="section__body">
                    <div class="section__body__container">
                        <SelectCountriesInput @onCountriesSelected="setCountriesAllowed" important="true" label="What countries should you allow traffic from?"/>


                        
                        <!--
                        <div class="form-input">
                            <label class="bold-label" for="">Accept traffic to links from: Default()</label>
                            <div style="display: flex; flex-wrap: wrap">
                                <label class="checkbox-label"  v-for="continent in Object.keys(continents)" :key="continent"><input type="checkbox" @change="chooseContinent(continent)">All {{continent}}</label>
                                <label class="checkbox-label"  v-for="country in countries" :key="country.name"><input  type="checkbox" class="countries-choice" :id="'choice_' + country.code.toLowerCase() " @change="checkCountry(country)">{{country.name}}</label>
                            </div>
                        </div> -->
                    </div>
                    
                </div>
            </div>
        </template>
        <div class="new__cta">
            <button @click="createCampaign">Create Campaign!</button>
        </div>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import continents from '../../../continents'
import countries from '../../../countries'

import SelectCountriesInput from '../../../components/inputs/SelectCountriesInput';
import CurrencyMoneyInput from '../../../components/inputs/CurrencyMoneyInput';

import Toast from '../../../components/general/Toast';
 
import moment from 'moment';
import SelectCountriesInputVue from '../../../components/inputs/SelectCountriesInput.vue';
export default {
    layout: 'dashboard',
    components: {
        DatePicker,
        SelectCountriesInput,
        CurrencyMoneyInput,
        Toast,
    },
    created() {
        this.$store.commit('dashboard/setDashboardTitle', "New Campaign")
    },
    data() {
        return {
            selectedContinents: [],
            continents:continents,
            countries,
            step: 1,
            success_message: '',
            errors: {
                title: '',
                description: '',
                budget: '',
                ends_at: '',
                who_can_join: '',
                application_questions: ''
            },
            link_errors:[""],
            can_continue: true,
            campaign: {
                title: '',
                description: '',
                budget: '',
                links_to_advertise: [
                    {link: '', pay_per_click: '', advert_note: ''}
                ],
                join_by_invite: 0,
                ends_at: '',
                thumbnail: '',
                countries_allowed: [],
                recurring_links: '',
                who_can_join: null,
                pay_currency: 'NGN',
                application_questions: [""]
            },
            loading: false
        }
    },
    computed: {
        
    },
    methods: { 
        setCostPerClick(meta) {
            this.campaign.links_to_advertise[meta.index].pay_per_click = meta.value;
        },
        setCampaignBudget(value) {
            this.campaign.budget = value
        },
        setCountriesAllowed(value) {
            this.campaign.countries_allowed = value;
        },
        addQuestion() {
            this.campaign.application_questions.push("")
        },
        removeQuestion(index) {
            this.campaign.application_questions.splice(index, 1);
        },
        checkCountry(country) {
            if (this.campaign.countries_allowed.includes(country)) {
                this.campaign.countries_allowed.splice(this.campaign.countries_allowed.indexOf(country), 1);
            }
            else {
                if(!this.campaign.countries_allowed.includes(country)) {
                    this.campaign.countries_allowed.push(country)
                }
            }
        },
        createCampaign() {
            this.validateSteps()

            if (this.can_continue) {
                this.campaign.recurring_links = this.campaign.recurring_links ? parseInt(this.campaign.recurring_links) : '';
                const payload = this.campaign;
                this.loading = true;
                this.$api.post('/campaigns', payload).then(resp => {
                    this.loading = false;
                this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "Campaign was successfully created"})
                }).catch(err=> {
                    this.loading = false;
                    const error = err.response && err.response.data.data || err
                    this.$store.dispatch('dashboard/actionShowErrorToast', {message: err})

                })
            }
            else {
                this.$store.dispatch('dashboard/actionShowErrorToast', {message: "Errors Exist. Please see form"})
            }

        },
        addThumbnail() {
            const input = document.getElementById('imagefile');
            const file = input.files && input.files[0];
            const vm = this;

            const cloudinary_url = "https://api.cloudinary.com/v1_1/dx9vdtrxz/image/upload";
            try {

                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                const vm = this;
                
                
                xhr.open('POST', cloudinary_url, true);        
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
                xhr.onreadystatechange = function(e) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                    // File uploaded successfully
                        var response = JSON.parse(xhr.responseText);
                    // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                    }
                
                    //const displayElement = document.createElement('img');
                    //displayElement.src = response.secure_url
                    //editor.append(displayElement)
                    vm.campaign.thumbnail = response.secure_url
                }
    
                fd.append('upload_preset', "jljh5lxc");
                fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
                fd.append('file', file);
                xhr.send(fd);
            } 
            catch(e) {
                console.log(e)
            }

            
        },
        chooseContinent(continent) {
            //alert(continent)
            if (!this.selectedContinents.includes(continent)) {
                this.selectedContinents.push(continent)
                this.checkContinentCountries(continent)
            }
            else {
                const index = this.selectedContinents.indexOf(continent);
                this.selectedContinents.splice(index, 1)
                this.checkContinentCountries(continent, true)
            }
        },
        checkContinentCountries(continent, uncheck=false) {
            let countries_object = continents[continent];
            let countries = [];

            Object.keys(countries_object).forEach(country_code=> {
                //countries.push(countries_object[country_code])
                let country = countries_object[country_code];

                if (uncheck) {
                    if (this.campaign.countries_allowed.includes(country)) {
                        this.campaign.countries_allowed.splice(this.campaign.countries_allowed.indexOf(country), 1);
                    }
                   
                }

                else {
                    if(!this.campaign.countries_allowed.includes(country)) {
                        this.campaign.countries_allowed.push(country)
                    }
                }
                if (document.getElementById('choice_' + country_code)) {
                    document.getElementById('choice_' + country_code).checked = uncheck === false ? true : false;
                }
            });

           /* countries.forEach(country => {
                country = country.toLowerCase();
                
            })*/

            
        },

        removeLink(index) {
            this.campaign.links_to_advertise.splice(index, 1);
            this.link_errors.splice(index, 1)
        },

        addLink() {
            this.campaign.links_to_advertise.push({
                link: '',
                pay_per_click: '',
                advert_note: ''
            })
            this.link_errors.push("")
        },
        validateSteps() {
            
            // clear errors first =

            Object.keys(this.errors).forEach(key => {
                this.errors[key] = ''
            });

            Object.keys(this.link_errors).forEach(key=> {
                this.link_errors[key] = ''
            })

            this.can_continue = true;
           

            const fields = {
                1: ['title', 'description', 'budget', 'ends_at']
            }
            for (let i = 0; i < fields[1].length; i++) {
                const key = fields[1][i];
                if (!this.campaign[key]) {
                    this.errors[key] = `${key} cannot be empty`
                    this.can_continue = false;
                }
                else {
                    this.errors[key] = ''
                }
            }
            
            this.validateStep2()
            
            this.validateStep3()
            
            
        },
        
        validateStep2() {
            let can_continue = true
            this.campaign.links_to_advertise.forEach((link, index) => {
                if (!link.link || !link.pay_per_click || !link.advert_note) {
                    //alert(link)
                    this.$set(this.link_errors, index, "Please enter all fields")
                    //this.link_errors[index] =  "Please enter all fields for all links"
                    //if (!this.link_errors[index]) this.link_errors[index] = ""
                    //this.link_errors[index] =   "Please enter all fields"
                    this.can_continue = false;
                }
                else if (!link.link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                    this.$set(this.link_errors, index, "Please provide a valid URL")

                }
                else if (link.pay_per_click < 0) {
                    this.$set(this.link_errors, index, "Cost cannot be less than 0")
                }
            })

            return can_continue
        },
        validateStep3() { // privacy;
            // sanitize

            if (!this.campaign.who_can_join) {
                this.errors.who_can_join = "Please select who can join"
                this.can_continue = false
                return
            }
            if (this.campaign.who_can_join !==2 && this.campaign.who_can_join !== '2') {
                this.campaign.application_questions = [""]
                return true
            }
            else if (this.campaign.application_questions[0] === "")  {
                this.errors.application_questions = "Please enter at least one question to ask applicatnts"
                this.can_continue = false;
                return
                
            }

        }
    }
    
}
</script>

<style lang="scss" scoped>
.info {
    text-decoration: underline;
}
.new {
    width: 70%;
    //margin: auto;

    &__cta {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        
        button {
            @include largebutton;
            min-height: auto;
            min-width: auto;
            width: 200px;

        }
    }
}

.section {
    box-shadow: rgba(0, 0, 0, 0.25) 0 1px 1px;
    background: white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    margin-bottom: 40px;

    &__header {
        
        //background:  #e3a09e6a;
        background: #fafafa;
        //border-top: 2px solid  #857c7c2c;;
        border-bottom: 2px solid  #857c7c2c;;

        color: black;
        font-size: 16px; 
        padding: 16px 0;
        font-weight: 500;   

        p {
            width: 95%;
            margin: auto;
            display: block;
        }
    }

    &__body {
        &__container {
            padding: 16px 0;
            width: 95%;
            margin: auto;
        }
    }

}


.flex-row {
    display: flex;
    flex-wrap: wrap;
}

.bold-label {
    font-weight: 600;
}

.checkbox-label {
    display: flex;
    align-items: center;
    margin-right: 16px;
    position: relative;
    border-radius: 10px;
    padding: 2px 4px;
    //border: 1.5px solid rgba(169, 169, 169, 0.64);
    border: 1.5px solid #ced4da58 !important;

    margin-bottom: 5px;

    
    input {
        margin-right: 8px;
        min-height: 25px !important;
        appearance: auto !important;
        
       
       
    }
}
.step-active {
    .circle {
        background: $lightaccent;
        border: $lightaccent;
        
    }
    p {
        color: $lightaccent !important;
    }
}
.half {
    display: flex;
    justify-content: space-between;
    .form-input {
    
        width: 48%;

        &:deep(div){
            width:100%;
            min-height: 40px;

        }
        
    } 
}
.circle {
    background: white;;
    border: 1px solid lightgrey;
    height: 10px;
    width: 10px;
    border-radius: 50%;


    &--filled {
        background: lightgrey;
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
        font-size: 14px;

        
    }
    @include media("<=t") {

        font-size: 12px;
    }



}

.red {
    color: red !important;
    cursor: hi;;
}


.add-link {
    padding: 16px 0px;
    color: $primary;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
}

.error {
    color: red;
    font-size: 14px;
}

.form-group { 
    display: flex;
    flex-direction: column;
    border: rgba(211, 211, 211, 0.263) 1px solid ;
    border-radius: 5px;
    padding: 8px;
    &--row {
        padding: 0;
        border: none;
        flex-direction: row;
        justify-content: space-between;
    }
}
.form-input {
    @include plain-form-input;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    
    label {
        font-size: 15px; 
        color: black;
        display: flex;
        flex-direction: align-items;
        span {
            color: rgb(1, 1, 75);
            font-weight: 500;
            margin-right: 11px;
            cursor: pointer;
            margin-left: 5px;
        }
    }
    input, textarea, :deep(input){
        border: 1.5px solid rgba(169, 169, 169, 0.64);
        min-height: 40px;
        border-radius: 5px;
        padding: 8px;
        outline: none;
        font-size: 15px;
        color: $faint;
        appearance: none;
        background-color: rgba(211, 211, 211, 0.046);;
        &:focus {
            outline: $primary;
        }

    }
}
.advert-link { 
    margin-bottom: 8px;
    &-head {
        display: flex;
        justify-content: flex-end;
        span {
            color: $lightaccent;
            font-size: 12px;
            cursor: pointer;
        }
    }
}
.advert-link-row {
    div {
        width: 20%;
        &:first-of-type {
            width: 79% !important;
        }
    }
}
.form-section-title {
    padding: 20px 0 10px;
    font-weight: 600;
    font-size: 14px;
    color: $primary;
    text-transform: uppercase;
}

.cta {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .back {
        p {
            font-weight: 500;
            color: $faint;
            cursor: pointer;
        }
    }
    button {
        @include largebutton;
        height: 40px;
        padding: 8px 16px;
        width: auto;
        margin-left: 16px;
    }
}

</style>