<template>
    <div> 
        <div class="form-input" :class="[showDropdown ? '' :'drop_down_closed']">
            <label>{{label}} <span class="red" v-if="important">*</span></label>
            <div style="overflow:scroll" class="input" type="text" @click="openDropdown" v-text="computedSelectedCountries" disabled> </div>
        </div>

        <div class="dropdown" v-if="showDropdown">
            <div class="dropdown__container">
                <div class="dropdown__header">
                    <input type="text" v-model="search_term" placeholder="Search" >
                </div>
            </div>
            <template v-if="!search_term">
                <label class="checkbox-label"><input type="checkbox">All countries</label>
                <label class="checkbox-label"   v-for="continent in Object.keys(continents)" :key="continent"><input type="checkbox" @change="chooseContinent(continent)">All {{continent}}</label>
                <label class="checkbox-label"   v-for="country in countries" :key="country.name"><input  type="checkbox" class="countries-choice" :id="'choice_' + country.code.toLowerCase() " @change="checkCountry(country)">{{country.name}}</label>
            </template>
            <template v-else>
                <label class="checkbox-label"   v-for="country in searchedCountries" :key="country.name"><input  type="checkbox" class="countries-choice" :id="'choice_' + country.code.toLowerCase() " @change="checkCountry(country)">{{country.name}}</label>
            </template>
        </div>


    </div>
</template>


<script>

import continents from '../../continents'
import countries from '../../countries'
export default {
    props: ['label', 'important'],
    
    data() {
        return {
            continents,
            countries,
           
            loading: false,
            search_term: '',
            countries_allowed: [],
            selected_continents: [],
            showDropdown: false

        }
    },
    watch: {
        countries_allowed(value) {
            this.$emit('onCountriesSelected', this.countries_allowed)
        }
    },
    computed: {
        countriesAllowedLength() {
            return this.countries_allowed.length;
        },
        searchedCountries() {
            return this.countries.filter(c => c.name.toLowerCase().includes(this.search_term.toLowerCase()))
        },
        computedSelectedCountries() {
            
            return this.countries_allowed.join(', ');

        },
        testCapitalize() {
            return this.capitalizeCountryName("united arab Emirates")
        }
        
    },
    methods: { 
        capitalizeCountryName(name) {
            function capitalize(string) {
                return string[0].toUpperCase() + string.slice(1)
            }

            let edited = '';
            
            name.split(' ').forEach(token=> {
                edited += ' ' + capitalize(token)
            })

            return edited.trim();
            
        },
        openDropdown() {
            this.showDropdown = !this.showDropdown; 
        },
        searchCountry() {

        },
        checkCountry(country) {
            if (this.countries_allowed.includes(country.name)) {
                this.countries_allowed.splice(this.countries_allowed.indexOf(country.name), 1);
            }
            else {
                if(!this.countries_allowed.includes(country.name)) {
                    this.countries_allowed.push(country.name)
                }
            }
        },
        chooseContinent(continent) {
            //alert(continent)
            if (!this.selected_continents.includes(continent)) {
                this.selected_continents.push(continent)
                this.checkContinentCountries(continent)
            }
            else {
                const index = this.selected_continents.indexOf(continent);
                this.selected_continents.splice(index, 1)
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
                    if (this.countries_allowed.includes(this.capitalizeCountryName(country))) {
                        this.countries_allowed.splice(this.countries_allowed.indexOf(this.capitalizeCountryName(country)), 1);
                    }
                   
                }

                else {
                    if(!this.countries_allowed.includes(this.capitalizeCountryName(country))) {
                        this.countries_allowed.push(this.capitalizeCountryName(country))
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
    }
}
</script>

<style lang="scss" scoped>

.red {
    color: red;
}
.form-input {
    //@include plain-form-input;
    margin-bottom: 2px !important;

    select {
        cursor: pointer;
    }
        

    input {
        cursor: pointer;
        
    }

    label {
        font-size: 15px;
        color: $charcoal;
        font-weight: 400;
        margin-bottom: 5px;
    }
}
.drop_down_closed {
    margin-bottom: 16px !important;
}
.input {
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        padding: 6px 30px;
        padding-left: 10px;
        font-size: 15px;
        line-height: 1.4;
        color: $charcoal;
        background-color: #fff;
        //border: 1px solid #ccc;
        border: 2px solid rgba(211, 211, 211, 0.442);

        border-radius: 4px;

        

        outline-color: rgba(229, 231, 235)
}
.dropdown {

    width: 100%;
    border: 1px solid lightgrey;
    max-height: 500px;
    overflow: scroll;
    border-radius: 5px;
    position: relative;
    margin-bottom: 16px;



    @include media('<=t') {
        width: 100%;
    }


    &__container {
        display: flex;
        flex-direction: column;
    }

    &__header {
        padding: 8px 8px;
        position: sticky;
        background-color: rgba(211, 211, 211, 0.31);

        input {
           
        }
    }
    
    input[type='text'] {
        //@include plain-form-input;
        border: 1px solid #ced4da;
        border-radius: 5px;
        padding: 3px;
        outline: none;
        padding: 2px 8px;
        width: 50%;
        cursor: pointer;
        font-size: 14px;


        &:focus {
            border: 2px solid #ced4da;
        }

        
    }

    label {
        padding: 4px 8px;
        display: block;
        border-bottom: 1px solid lightgrey;
        font-size: 14px;
        color: grey;

        input {
            margin-right: 8px;
        }
    }

}

</style>

