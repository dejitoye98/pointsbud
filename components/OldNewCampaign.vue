<template>
    
    <div class="new">

        <template v-if="mode === 'choice'">
            <div class="choice">
                <div class="choice__container">
                    <div class="choice__header">
                        <p>What do you want to do?</p>
                    </div>
                    <div class="choice__body">
                        <div class="choice__item" @click="changeMode('click')">
                            <p>Drive traffic to your website</p>
                        </div>
                        <div class="choice__dividider"></div>
                        <div class="choice__item" @click="changeMode('sales-lead')">
                            <p>Sell and/or get more leads using Afflee</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="mode === 'click'">
            
                
                <div class="tabs">
                    <div class="tabs__tab tabs__tab" :class="[mode === 'click' && step === 1 ? 'tabs__tab--selected': '', step > 1 ? 'tabs__tab--passed' : '' ]">
                        <div class="tabs__tab__container">
                            <p>General Details</p>
                        </div>
                    </div>
                    <div class="tabs__tab" :class="[mode === 'click' && step === 2 ? 'tabs__tab--selected': '', step > 2 ? 'tabs__tab--passed' : '' ]">
                        <div class="tabs__tab__container">
                            <p>Link Details</p>
                        </div>
                    </div>
                    <div class="tabs__tab" :class="[step === 3 ? 'tabs__tab--selected': '', step > 3 ? 'tabs__tab--passed' : '' ]">
                        <div class="tabs__tab__container">
                            <p>Privacy and Settings</p>
                        </div>
                    </div>
                    <div class="tabs__tab" :class="[step === 4 ? 'tabs__tab--selected': '', step > 4 ? 'tabs__tab--passed' : '' ]">
                        <div class="tabs__tab__container">
                            <p>Fraud Prevention</p>
                        </div>
                    </div>
                </div>

                <template v-if="mode === 'click' && step == 1">
                    <div class="section">

                    
                        <div class="section__header">
                            <p>General Details</p>
                        </div>
                        <div class="section__body">
                            <div class="section__body__container">

                                <div class="form-input">
                                    <span class="error">{{errors.title}}</span>
                                    <label for="">CAMPAIGN TITLE <span class="red">*</span> </label>
                                    <input  v-model="campaign.title" type="text">
                                </div>
                                <div class="form-input">
                                    <span class="error">{{errors.description}}</span>
                                    <label for="">DESCRIPTION <span class="red">*</span></label>
                                    <textarea v-model="campaign.description"> </textarea>
                                </div>
                                <!--
                                <div class="form-input">
                                    <span class="error">{{errors.title}}</span>
                                    <label for="">Payment model <span class="red">*</span></label>
                                    <div class="flex-row">
                                        <label class="checkbox-label" v-for="(model, index) in template.payment_models" :key="index"><input @change="addPaymentModel(model)"  type="checkbox"/>{{model}}</label>
                                    
                                    </div>

                                </div>-->
                                <div class="half">
                                    <div class="form-input">
                                        <span class="error">{{errors.budget}}</span>
                                        <label for="">BUDGET <span class="red">*</span> <span class="info" @click="setInfoVisibility('budget')">info</span> </label>
                                        <!--<input  v-model="campaign.budget" type="number"-->
                                        <div style="width: 100%">
                                            <div class="form-input__info" v-if="extraInfos['budget'].visible">
                                                <p> {{extraInfos['budget'].text}} </p>
                                            </div>
                                            <CurrencyMoneyInput @onChange="setCampaignBudget"/>
                                        </div>
                                    </div>
                                    <div class="form-input">
                                        <span class="error">{{errors.marketeres_required}}</span>
                                        <label for="">NO. OF MARKETERS REQUIRED <span class="info" @click="setInfoVisibility('marketers_required')">info</span></label>
                                        <div class="form-input__info" v-if="extraInfos['marketers_required'].visible">
                                            <p> {{extraInfos['marketers_required'].text}} </p>
                                        </div>
                                        <input  v-model="campaign.marketers_required" type="number">
                                    </div>
                                </div>

                                <div class="half">
                                    <div class="form-input">
                                        <span class="error">{{errors.ends_at}}</span>
                                        <label for="">END DATE </label>
                                        <DatePicker v-model="campaign.ends_at" />
                                    </div>
                                    <div class="form-input">
                                        <label for="">DISPLAY PICTURE</label>
                                        <input type="file" id="imagefile"  accept="image/*"  @change="addThumbnail">
                                    </div>

                                </div>


                            </div>
                        </div> 
                    </div> 


                </template>


               
                <template v-if="mode === 'click' && step == 2">
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


                <template v-if="mode === 'click' && step == 3">
                    <div class="section">
                        <div class="section__header">
                            <p>Privacy & Settings</p>
                        </div>
                        <div class="section__body">
                            <div class="section__body__container">
                                <div class="form-input">
                                    <span class="error" v-if="errors.who_can_join">{{errors.who_can_join}}</span>
                                    <label for="" class="">Who can join this campaign? <span class="red">* </span>  <span class="info" @click="setInfoVisibility('who_can_join')"> info</span></label>
                                            <div class="form-input__info" v-if="extraInfos['who_can_join'].visible">
                                                <p> {{extraInfos['who_can_join'].text}} </p>
                                            </div>
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
                                    <label for="" class="">Do you intend to add more links to this campaign in the future? <span @click="setInfoVisibility('recurring_links')" class="info">info</span></label>
                                        <div class="form-input__info" v-if="extraInfos['recurring_links'].visible">
                                            <p> {{extraInfos['recurring_links'].text}} </p>
                                        </div>
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
                <template v-if="mode === 'click' && step == 4">
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
                <!--<button @click="createCampaign">Create Campaign!</button> -->
                <button class="plain-button"  @click="previousStep">Previous</button>
                <button @click="nextStep">Next</button>
            </div>
        </template>



        <template v-if="mode === 'sales-lead'">
            <div class="tabs">
                <div class="tabs__tab tabs__tab" :class="[step === 1 ? 'tabs__tab--selected': '', step > 1 ? 'tabs__tab--passed' : '' ]">
                    <div class="tabs__tab__container">
                        <p>General Details</p>
                    </div>
                </div>
                <div class="tabs__tab" :class="[step === 2 ? 'tabs__tab--selected': '', step > 2 ? 'tabs__tab--passed' : '' ]">
                    <div class="tabs__tab__container">
                        <p>Form Creation</p>
                    </div>
                </div>
                
                <div class="tabs__tab" :class="[step === 2 ? 'tabs__tab--selected': '', step > 2 ? 'tabs__tab--passed' : '' ]">
                    <div class="tabs__tab__container">
                        <p>Sales Page Creation</p>
                    </div>
                </div>
                
                <div class="tabs__tab" :class="[step === 3 ? 'tabs__tab--selected': '', step > 3 ? 'tabs__tab--passed' : '' ]">
                    <div class="tabs__tab__container">
                        <p>Privacy and Settings</p>
                    </div>
                </div>
                <div class="tabs__tab" :class="[step === 4 ? 'tabs__tab--selected': '', step > 4 ? 'tabs__tab--passed' : '' ]">
                    <div class="tabs__tab__container">
                        <p>Fraud Prevention</p>
                    </div>
                </div>
            </div>

            <div class="section" v-if="step === 1">
                <div class="section__header">
                    <p>General Info</p>
                </div>
                <div class="section__body">
                    <div class="section__body__container">

                        <div class="form-input">
                            <span class="error">{{errors.title}}</span>
                            <label for="">CAMPAIGN TITLE <span class="red">*</span> </label>
                            <input  v-model="campaign.title" type="text">
                        </div>
                        <div class="form-input">
                            <span class="error">{{errors.description}}</span>
                            <label for="">DESCRIPTION <span class="red">*</span></label>
                            <textarea v-model="campaign.description"> </textarea>
                        </div>
                                <div class="half">
                                    <div class="form-input">
                                        <span class="error">{{errors.budget}}</span>
                                        <label for="">BUDGET <span class="red">*</span> <span class="info" @click="setInfoVisibility('budget')">info</span> </label>
                                        <!--<input  v-model="campaign.budget" type="number"-->
                                        <div style="width: 100%">
                                            <div class="form-input__info" v-if="extraInfos['budget'].visible">
                                                <p> {{extraInfos['budget'].text}} </p>
                                            </div>
                                            <CurrencyMoneyInput @onChange="setCampaignBudget"/>
                                        </div>
                                    </div>
                                    <div class="form-input">
                                        <span class="error">{{errors.marketeres_required}}</span>
                                        <label for="">NO. OF MARKETERS REQUIRED <span class="info" @click="setInfoVisibility('marketers_required')">info</span></label>
                                        <div class="form-input__info" v-if="extraInfos['marketers_required'].visible">
                                            <p> {{extraInfos['marketers_required'].text}} </p>
                                        </div>
                                        <input  v-model="campaign.marketers_required" type="number">
                                    </div>
                                </div>

                                <div class="half">
                                    <div class="form-input">
                                        <span class="error">{{errors.ends_at}}</span>
                                        <label for="">END DATE </label>
                                        <DatePicker v-model="campaign.ends_at" />
                                    </div>
                                    <div class="form-input">
                                        <label for="">DISPLAY PICTURE</label>
                                        <input type="file" id="imagefile"  accept="image/*"  @change="addThumbnail">
                                    </div>

                                </div>

                            <div class="form-input">
                                <label for=""> WHAT ARE YOU TRYING TO CREATE? <span class="info" @click="setInfoVisibility('trying_to_create')">info</span> </label>
                                <span class="error">{{errors.title}}</span>
                                <div class="flex-row">
                                    <label class="checkbox-label"><input type="checkbox" @change="addConversionMedia('form')">A form.</label>
                                    <label class="checkbox-label"><input type="checkbox" @change="addConversionMedia('sales-page')">A sales page.</label>
                                </div>
                            </div>
                       
                    


                    </div>
                </div> 
            </div>
            

            <div class="section form-creation" v-if="step === 2">

                <FormCreator></FormCreator>
            </div>
            <div class="new__cta">
                <!--<button @click="createCampaign">Create Campaign!</button> -->
                <button class="plain-button"  @click="previousStep">Previous</button>
                <button @click="nextStep">Next</button>
            </div>



        </template>
        


    </div>
</template>