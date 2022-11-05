<template>
    <div class="campaign__form">
        <template>

            <div class="header__steps header__steps--desktop">
                <div class="header__steps__item" :class="[step === 1 || step > 1 || step === 'finish'? 'step-active': '']" @click="changeStep(1)">
                    <div class="circle circle--filled">1</div>
                    <p>General Details</p>
                </div>
                <div class="header__steps__divider" ></div>
                <div class="header__steps__item" :class="[step === 2 || step > 2 || step === 'finish'? 'step-active': '']"  @click="changeStep(2)">
                    <div class="circle circle--filled">2</div>
                    <p>Links</p>
                </div>
                
                <div class="header__steps__divider"></div>

                <div class="header__steps__item" :class="[step === 3? 'step-active': '']" >
                    <div class="circle circle--filled">3</div>
                    <p>Settings</p>
                </div>
                
            </div>
        </template>
        <template v-if="step === 1">
            
            <div class="form-input">
                <span class="error">{{errors.title}}</span>
                <label for="">Title of campaign <span>*</span></label>
                <input  v-model="campaign.title" type="text">
            </div>
            <div class="form-input">
                <span class="error">{{errors.description}}</span>
                <label for="">Description <span>*</span></label>
                <textarea v-model="campaign.description"> </textarea>
            </div>
            <div class="half">
                <div class="form-input">
                    <span class="error">{{errors.budget}}</span>
                    <label for="">Budget <span>*</span></label>
                    <input  v-model="campaign.budget" type="number">
                </div>
                <div class="form-input">
                    <span class="error">{{errors.end_date}}</span>
                    <label for="">End Date <span>*</span></label>
                    <DatePicker v-model="campaign.end_date" />
                </div>
            </div>
            <div class="form-input">
                <label for="">Display Picture</label>
                <input type="file" id="imagefile"  accept="image/*"  @change="addThumbnail">
            </div>


    </template>

        
        <template v-if="step === 2">
            
            <div class="form-group advert-link"  v-for="(link,index) in campaign.links_to_advertise" :key="index">
                    <span class="error">{{link_errors[index]}}</span>
                <div class="advert-link-head" v-if="index !== 0" @click="removeLink(index)">
                    <span>Remove</span>
                </div>
                    <div class="form-input">
                        <label for="">Link URL <span>*</span></label>
                            <input type="text" placeholder="https://link-you-want-to-advertise.com" v-model="link.link">
                    </div>
                    <div class="form-input">
                        <label for="">Pay per click <span>*</span></label>
                        <input type="number" v-model="link.pay_per_click">
                    </div>
                <div class="form-input">
                    <label for="">Advert note <span>*</span></label>
                    <textarea :placeholder="'We are selling products. Visit: ' +  link.link" v-model="link.advert_note"></textarea>
                </div>
            </div>
            <div class="add-link">
                <p @click="addLink">Add link</p>
            </div>
        </template>
        
        <template v-if="step === 3">
            
            <div class="form-input">
                <label for="" class="bold-label">Do you intend to add more links to this campaign in the future?</label>
                <div class="flex-row">
                    <label class="checkbox-label"><input v-model="campaign.recurring_links"  value="0" name="intent" type="radio">Yes</label>
                    <label class="checkbox-label"><input  v-model="campaign.recurring_links" value="1" name="intent" type="radio">No</label>
                </div>
            </div>
            <div class="form-input">
                <label  class="bold-label" for="">Who can join this campaign?</label>
                <div class="flex-row">
                    <label class="checkbox-label"><input  name="privacy" type="radio">Anyone</label>
                    <label class="checkbox-label"><input  name="privacy" type="radio">People with link</label>
                </div>
            </div>
            <div class="form-input">
                <label class="bold-label" for="">Accept traffic to links from: Default()</label>
                <div style="display: flex; flex-wrap: wrap">
                    <label class="checkbox-label"  v-for="continent in Object.keys(continents)" :key="continent"><input type="checkbox" @change="chooseContinent(continent)">All {{continent}}</label>
                    <label class="checkbox-label"  v-for="country in countries" :key="country.name"><input type="checkbox" class="countries-choice" :id="'choice_' + country.code.toLowerCase() " @change="checkCountry(country.name)">{{country.name}}</label>
                </div>
            </div>
           
        </template>
        

        <div class="cta">
            <div></div>
            <div style="display: flex; align-items: center">

                <div class="back" @click="goBack" v-if="step > 1">
                    <p>Back</p>
                </div>
                <button class="continue" @click="nextStep" v-if="step !== 3">Continue</button>
                <button class="continue" :disabled="loading" @click="createCampaign" v-else>Create</button>
            </div>
        </div>
    </div>
</template>


<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import continents from '../continents'
import countries from '../countries'
 
import moment from 'moment';
export default {
    components: {
        DatePicker
    },
    data() {
        return {
            selectedContinents: [],
            continents:continents,
            countries,
            step: 2,
            errors: {
                title: '',
                description: '',
                budget: '',
                end_date: '',
            },
            link_errors:[""],
            campaign: {
                title: '',
                description: '',
                budget: '',
                links_to_advertise: [
                    {link: '', pay_per_click: '', advert_note: ''}
                ],
                join_by_invite: 0,
                end_date: '',
                thumbnail: '',
                countries_allowed: '',
                recurring_links: ''
            },
            loading: false
        }
    },
    computed: {
        
    },
    methods: { 
        createCampaign() {
            this.campaign.recurring_links = this.campaign.recurring_links ? parseInt(this.campaign.recurring_links) : '';
            const payload = this.campaign;
            this.loading = true;
            this.$api.post('/campaigns', payload).then(resp => {
                this.loading = false;
            }).catch(err=> {
                this.loading = false;
                const error = err.response && err.response.data.data || err
                alert(error)

            })
        },
        addThumbnail() {
            const input = document.getElementById('imagefile');
            const file = input.files && input.files[0];
            const vm = this;

            const cloudinary_url = "https://api.cloudinary.com/v1_1/dx9vdtrxz/image/upload";
            try {

                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                
                
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
                if (document.getElementById('choice_' + country_code)) {
                    document.getElementById('choice_' + country_code).checked = uncheck === false ? true : false;
                }
            });

           /* countries.forEach(country => {
                country = country.toLowerCase();
                
            })*/

            
        },
        changeStep(step) {
            if (this.validateStep()) {
                this.step = step
            }
        },
        removeLink(index) {
            this.campaign.links_to_advertise.splice(index, 1);
            this.link_errors.splice(index, 1)
        },
        nextStep() {
            const max = 3;
            if (this.validateStep(this.step) && this.step !== max) {
                this.step++;
            }
        },
        goBack() {
            const min = 1;
            if (this.step !==1 ) {
                this.step--;
            }
        },
        addLink() {
            this.campaign.links_to_advertise.push({
                link: '',
                pay_per_click: '',
                advert_note: ''
            })
            this.link_errors.push("")
        },
        validateStep(step) {
            let can_continue = true;
            if (step === 1) {

                const fields = {
                    1: ['title', 'description', 'budget', 'end_date']
                }
                for (let i = 0; i < fields[step].length; i++) {
                    const key = fields[step][i];
                    if (!this.campaign[key]) {
                        this.errors[key] = `${key} cannot be empty`
                        can_continue = false;
                    }
                    else {
                        this.errors[key] = ''
                    }
                }
            }
            else {
                can_continue = this.validateStep2()
            }
            //console.log(can_continue)
            return can_continue;
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
                    can_continue = false
                }
            })

            return can_continue
        }
    }
}
</script>

<style lang="scss" scoped>

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
    input {
        margin-right: 8px;
        min-height: 25px !important;
        appearance: auto !important;
    }
    margin-right: 16px;
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
.header {
    //width: 80%;
    //margin: auto;
    padding: 16px 0;
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.442);

    &__container {
        @include container;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include media("<=tablet") {
            flex-direction: column;
            flex-wrap: wrap;            
        }
    }

    &__steps {
        margin-bottom: 16px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        @include media("<=tablet") {
            flex-wrap: wrap;
            align-items: center;
            justify-content: left;
            
        }


        &__item {
            cursor: pointer;
            display: flex;
            align-items: center;
            @include media("<=tablet") {
                margin-bottom: 8px;
                margin-right: 8px;
            }
            div {
                margin-right: 8px;
                
            }
            p {
                color: lightgrey;
                display: inline-block;
                font-size: 14px;
                @include media("<tablet") {
                    font-size: 14px;
                }
            }
        }

        &__divider {
            height: 2px;
            margin: 0 16px;
            width: 10px;
            background: rgba(211, 211, 211, 0.331);
            @include media("<=tablet") {
                display: none;
            }
        }
    }
}

.campaign__form {
    width: 100%;
    height: 100%;
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
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    
    label {
        font-size: 14px; 
        color: darkgrey;
        span {
            color: red;
        }
    }
    input, textarea, :deep(input){
        border: 1.5px solid rgba(169, 169, 169, 0.64);
        min-height: 40px;
        border-radius: 5px;
        padding: 8px;
        outline: none;
        font-size: 14px;
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