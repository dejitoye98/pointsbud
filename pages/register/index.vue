<template>
    <div class="page">
        <div class="header">
            <div class="header__container">
                <div class="logo">Afflee</div>

                <div class="header__steps header__steps--desktop">
                    <div class="header__steps__item" :class="[step === 1 || step > 1 || step === 'finish'? 'step-active': '']" @click="changeStep(1)">
                        <div class="circle circle--filled">1</div>
                        <p>Who are you</p>
                    </div>
                    <div class="header__steps__divider" ></div>
                    <div class="header__steps__item" :class="[step === 2 || step > 2 || step === 'finish'? 'step-active': '']"  @click="changeStep(2)">
                        <div class="circle circle--filled">2</div>
                        <p>About you</p>
                    </div>
                    
                    <div class="header__steps__divider"></div>

                    <div class="header__steps__item" :class="[step === 'finish'? 'step-active': '']" >
                        <div class="circle circle--filled">3</div>
                        <p>Finish</p>
                    </div>
                   
                </div>
            </div>



        </div>
        <div class="body">
            <div class="body__container">



                <div class="step step1" v-if="step === 1">
                    <p class="step1__header">Who are you?</p>
                    <div class="step1__choice">
                        <div class="step1__choice__item" :class="[mode === 1 ? 'step1__selected': '']" @click="selectMode(1)">
                            <div class="step1__choice__item__header" style="display: flex; justify-content: space-between; align-items:center">
                                <p>I am a business</p>
                                <div class="circle"></div>
                            </div>
                            <p>I want to market my brand and products</p>
                        </div>
                        <div class="step1__choice__item" :class="[mode === 2 ? 'step1__selected': '']" @click="selectMode(2)">
                            <div  class="step1__choice__item__header" style="display: flex; justify-content: space-between; align-items:center">
                                <p>I am a marketer</p>
                                <div class="circle"></div>
                            </div>                            
                            <p>I want to earn money by marketing brands and products</p>
                        </div>
                    </div>

                    <div class="step1__button">
                        <button :disabled="!mode" @click="changeStep(2)">Continue</button>
                    </div>

                    <span class="already">Already have an account? <a href="/login">Login</a></span>
                </div>


                <div class="step2" v-else-if="step === 2 && mode === 1">
                    <span class="error">{{error}}</span>
                    <div class="step2__item form-item">
                        <div class="left">
                            <p>Business Information</p>
                            <p>Provide your business info.</p>
                        </div>

                        <div class="right">
                            <span class="error"> {{errors.name}}</span>
                            <div class="form-input">
                                <label for="">Business Name</label>
                                <input type="text" v-model="business.name">
                            </div>

                            <div class="flex-row">
                                <div class="half">

                                    <span class="error"> {{errors.industry}}</span>
                                    <div class="form-input">

                                        <label for="">Industry</label>

                                        <select type="text" v-model="business.industry">
                                            <option :value="industry" v-for="industry in industries" :key="industry"> {{industry}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="half">
                                    <span class="error"> {{errors.country}}</span>
                                    <div class="form-input">

                                        <label for="">Country</label>

                                        <select type="text" v-model="business.country">
                                            <option :value="country.name"  v-for="country in countries" :key="country.name"> {{country.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                        
                    </div>
                    <div class="step2__item form-item">
                        <div class="left">
                            <p>Personal Information</p>
                            <p>Provide your personal info.</p>
                        </div>

                        <div class="right">
                            <div class="flex-col">
                                <span class="error"> {{errors.user_name}}</span>
                                <div class="form-input">
                                    <label for="">Your Name</label>
                                    <input v-model="business.user_name" type="">
                                </div>
                            </div>

                            <div class="flex-row">
                                <div class="half">
                                    <span class="error"> {{errors.email}}</span>
                                    <div class="form-input form-input--half">

                                        <label for="">Email Address</label>
                                        <input v-model="business.email" type="text">
                                    </div>
                                </div>

                                <div class="half">
                                    <span class="error"> {{errors.phone}}</span>

                                    <div class="form-input form-input--half">
                                        <label for="">Phone Number</label>
                                        <input v-model="business.phone_number" type="text">
                                    </div>

                                </div>
                            </div>
                            <div class="flex-row">
                                <div class="half">

                                    <span class="error"> {{errors.password}}</span>
                                    <div class="form-input">

                                        <label for="">Password</label>
                                        <input v-model="business.password" type="password">
                                    </div>
                                </div>

                                <div class="half">

                                    <span class="error"> {{errors.confirm_password}}</span>

                                    <div class="form-input ">
                                        <label for="">Confirm Password</label>
                                        <input v-model="business.confirm_password" type="password">
                                    </div>
                                </div>
                                                                
                            </div>
                        </div>
                        
                    </div>

                    <div class="step2__button">
                        <button @click="register">Sign Up</button>
                    </div>

                </div>


                <div class="step2" v-else-if="step === 2 && mode === 2">
                    <span class="error">{{error}}</span>

                    <div class="step2__item form-item">
                        <div class="left">
                            <p>Personal Information</p>
                            <p>Provide your personal info.</p>
                        </div>

                        <div class="right">
                            <div class="flex-row">
                                <div class="half">
                                    <span class="error"> {{errors.name}}</span>
                                    <div class="form-input">
                                        <label for="">Your Name</label>
                                        <input v-model="marketer.name" type="">
                                    </div>
                                </div>
                                <div class="half">
                                    <span class="error"> {{errors.email}}</span>
                                    <div class="form-input form-input--half">

                                        <label for="">Email Address</label>
                                        <input v-model="marketer.email" type="text">
                                    </div>
                                </div>
                            </div>

                            <div class="flex-row">
                                <div class="half">
                                    <span class="error"> {{errors.phone}}</span>

                                    <div class="form-input form-input--half">
                                        <label for="">Phone Number</label>
                                        <input v-model="marketer.phone_number" type="text">
                                    </div>

                                </div>

                                <div class="half">
                                    <span class="error"> {{errors.country}}</span>
                                    <div class="form-input">

                                        <label for="">Country</label>

                                        <select type="text" v-model="marketer.country">
                                            <option :value="industry" v-for="industry in industries" :key="industry"> {{industry}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-row">
                                <div class="half">

                                    <span class="error"> {{errors.password}}</span>
                                    <div class="form-input">

                                        <label for="">Password</label>
                                        <input v-model="marketer.password" type="password">
                                    </div>
                                </div>

                                <div class="half">

                                    <span class="error"> {{errors.confirm_password}}</span>

                                    <div class="form-input ">
                                        <label for="">Confirm Password</label>
                                        <input v-model="marketer.confirm_password" type="password">
                                    </div>
                                </div>
                                                      
                            </div>

                            <div class="flex-col">
                                <div class="form-input form-input--textarea">
                                    <label for="">Bio (optional)</label>
                                    <textarea type="text" v-model="marketer.bio"></textarea>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div class="step2__item form-item">
                        <div class="left">
                            <p>Professional Information</p>
                            <p>Provide your business info.</p>
                        </div>

                        <div class="right">
                            <div class="flex-row">

                                <div class="half half--marginRule">
                                    <span class="error"> {{errors.occupation}}</span>
                                    <div class="form-input form-input--marginOverrule">
                                        <label for="">Occupation</label>
                                        <input type="text" v-model="marketer.occupation">
                                    </div>
                                    <label><input type="checkbox" @change="changeIsStudent" :value="is_student"> I am a student </label>
                                </div>

                                <div class="half" v-if="!is_student">

                                    <span class="error" > {{errors.industry}}</span>
                                    <div class="form-input">

                                        <label for="">Industry</label>

                                        <select type="text" v-model="marketer.industry">
                                            <option :value="industry" v-for="industry in industries" :key="industry"> {{industry}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="platforms-used">
                                <p>Marketing platforms used</p>
                                <div class="platforms-used__platforms">

                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('blogs')">Blogs</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('facebook')">Facebook</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('instagram')">Instagram</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('tiktok')">TikTok</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('reddit')">Reddit</label>
                                    </div>
                                    <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('whatsapp')">Whatsapp</label>
                                    </div>
                                   <div>
                                        <label for=""><input type="checkbox" @change="addPlatform('others')">Others</label>
                                    </div>
                                </div>


                            </div>
                                
                        </div>
                        
                    </div>

                    <div class="step2__button">
                        <button @click="register">Sign Up</button>
                    </div>

                </div>

                <div class="finish-step" v-if="step === 'finish'">

                    <div>

                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx="50" cy="50" r="32" stroke-width="8" stroke="#d94241" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round" style="animation-play-state: running; animation-delay: 0s;">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0 50 50;360 50 50" style="animation-play-state: running; animation-delay: 0s;"></animateTransform>
                        </circle>
                        ></svg>
                    </div>
                    

                    <p class="finish-step__status">{{status}}</p>
                </div>
            
            </div>
        </div>
    </div>
</template>


<script>
import countries from '../../countries'

export default {
    
    data() {
        return {
            step: 1,
            successful: false,
            status: '',
            countries: countries,

            is_student: false,
           
            error: '',
            errors:{
                name: '',
                user_name: '',
                industry: '',
                email: '',
                password: '',
                confirm_password: '',
                phone_number: '',
                country: '',
                bio: '',
                occupation: '',
            },
            mode: null,
            is_individual: 0,
            business: {
                name: '',
                user_name: '',
                industry: '',
                email: '',
                password: '',
                confirm_password: '',
                phone_number: '',
                country: ''
            },
            marketer: {
                name: '',
                industry: '',
                occupation: '',
                bio: '',
                email: '',
                password: '',
                confirm_password: '',
                phone_number: '',
                country: '',
                platforms_used: []
            },
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
            ]
        }
    },

    methods: {
        switchMode(is_individual) {
            this.is_individual = is_individual
        },

        addPlatform(p) {
            if (this.marketer.platforms_used.indexOf(p) > -1) {
                const index = this.marketer.platforms_used.indexOf(p);
                this.marketer.platforms_used.splice(index, 1);
            }
            else {
                this.marketer.platforms_used.push(p);
            }
        },

        canFinish() {
            let can_continue = true;
            if (this.mode === 1) {
                // for businesses


                for (let i = 0; i < Object.keys(this.business).length; i++) {
                    const key = Object.keys(this.business)[i];
                    if (!this.business[key]) {
                        this.errors[key] = `${key} cannot be empty`;
                        can_continue = false;
                        //return false;
                    }
                    else {
                        this.errors[key] = ''
                    }
                }                

            }
            else {
                for (let i = 0; i < Object.keys(this.marketer).length; i++) {
                    const key = Object.keys(this.marketer)[i];
                    if (!this.marketer[key] && ['bio', 'platforms_used'].indexOf(key) == -1) {
                        if (key === 'industry' && this.marketer.occupation === 'Student') {

                        }
                        else {
                            this.errors[key] = `${this.resolveFieldName(key)} cannot be empty`;
                            can_continue = false;
                        }
                        //return false;
                    }
                    else {
                        this.errors[key] = ''
                    }
                }

            }
            return can_continue;
        },

        selectMode(mode) {
            this.mode = mode;
        },
        changeStep(step) {
            this.step = step;
        },
        changeIsStudent() {
            this.is_student = !this.is_student
            if (this.is_student) this.marketer.occupation = "Student"
        },
        resolveFieldName(field){
            field = capitalize(field);
            // remove _
            const split_string = field.split('_');

            return split_string.join(' ');

            function capitalize(string) {
                const first= string[0];
                return first.toUpperCase() + string.slice(1)
            }
        },

        validateInformation() {
            if (this.mode === 1) {
                
                if (this.business.password  !== this.business.confirm_password) {
                    this.errors['password'] = "Passwords don't match"
                }
                else {
                    this.errors['password'] = ''
                }

                
            }

            else {
                
            }
        },
        errorsExist() {
            for (let i = 0; i < Object.keys(this.errors).length; i++) {
                const key = this.errors[Object.keys(this.errors)[i]];

                if (key) {
                    return true;
                }

                
            }
            return false;
        },

        register() {
            this.validateInformation();
            
            this.canFinish();

            console.log(this.errors)

            if (!this.errorsExist()) {
                this.step = 'finish';
                let payload = {};

                if (this.mode === 1)  payload = this.business;
                else payload = {...this.marketer, is_individual: 1}

                if (this.is_student || this.marketer.occupation === "Student") payload.industry = "Student";

                this.error = '';
                this.status = "Signing you up..."
                this.$api.post('/auth', payload)
                    .then(resp =>{
                        this.successful = true;
                        //login
                        this.status = 'Successful. Signing you in...'
                        this.$store.dispatch('auth/login', payload).then(resp=> {
                            this.$router.push({path: '/dashboard/campaigns'})
                        })
                    }).catch(err => {
                        this.successful = false;
                        this.error = err.response && err.response.data.data || err.response.data.message;

                        if (this.error.indexOf("Validation")>-1) {
                            this.error = "Account with name or phone already exists"
                        }
                        this.step = 2;
                    })
            }
        },

        login() {
            const payload = {
                email: this.mode === 1 ? this.business.email : this.marketer.email,
                password: this.mode === 1 ? this.business.password : this.marketer.password
            }

            this.$api.post('/auth/login', payload)
                .then(resp=> {
                    this.status = 'Redirecting you to the dashboard...'
                }).catch(err=> {
                    this.status = "Error signing in"

                })
        },
    }
    
    
}
</script>


<style lang="scss" scoped>
.already {
    display: block;
    font-size: 15px;
    color: $faint;
    text-align: center;
    
    a {
        color: $lightaccent !important;
        text-decoration: none;
    }
}
.flex-col {
    display: flex;
    flex-direction: column;
}
.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @include media("<=t") {
        flex-direction: column;
        justify-content: center;
    }


}
.platforms-used {
    background: rgba(211, 211, 211, 0.247);
    padding: 10px;
    p {
        display: block;
        color: $faint;
        font-size: 12px;
        font-weight: 600;
    }

    &__platforms {
        display: flex;
        flex-wrap: wrap;
        div {
            display: flex;
            flex-wrap: wrap;
            margin-right: 8px;
            align-items: center;

            label {
                color: $faint;
                font-size: 15px;
                margin-right: 8px;
            }
            
            input {
                margin-right: 5px;
            }
        }

    }
}
.error {
    @include error;
    @include media("<=t") {
        font-size: 12px;
    }
}

.half {
    width: 48%;
    @include media("<=t") {
        width: 100%;
        
    }

    &--marginRule {
        margin-bottom: 25px;

        @include media("<=t") {
            margin-bottom: 16px;
        }
    }

    label {
        color: $faint;
        font-size: 15px;
        display: flex;
        align-items: center;
        input {
            margin-right: 2px;
        }
    }
}

.form-input {
    background: rgba(211, 211, 211, 0.247);
    border-radius: 5px;
    min-height: 55px;
    outline: none;
    margin-bottom: 24px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;

    @include media("<=t") {
        margin-bottom: 16px;
    }

    &--marginOverrule {
        margin-bottom: 0;
    }

    &--half {
        //width: 48%;
    }

    label {
        font-size: 12px;
        color: grey;
        font-weight: 600;
        position: absolute;
        top: 0;
        left: 10px;
        right: 10px;    
        top: 10px;
    }

    input, select,textarea {
        height: 100%;
        width: 100%;
        background: transparent;
        outline: none;
        position: absolute;
        top: 0px;
        padding-top: 12px;
        padding-left: 10px;
        padding-right: 10px;
        color: rgba(0, 0, 0, 0.726);
        appearance: none;
        font-size: 15px;

        &:focus {
            outline: 2px solid $lightaccent;
        }
    }
    &--textarea {
        height: 200px;
        textarea {
            padding-top: 25px;
            height: 200px !important;
            resize: none;
        }
    }
    option {
        padding-left: 0px !important;
    }

}
.logo {
    font-size: 30px;
    @include media("<=tablet") {
        display: block;
        text-align: center;
        margin-bottom: 16px;
    }
}

.step-active {
    .circle {
        background: $primary;
        border: $primary;
        
    }
    p {
        color: $primary !important;
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
                font-size: 16px;
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

.body {
    &__container {
        @include container;
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

.step1 {
    //@include container;
    &__header {

        margin: auto;
        margin-top:50px;
        font-size: 40px;
        width: 100%;
        text-align: center;
        margin-bottom: 24px;

        @include media("<=t") {
            margin-top: 20px;
            font-size: 25px;
        }
    }

    &__choice {
        display: flex;
        justify-content: center;

        @include media("<=tablet") {
            display: flex;
            flex-direction: column;
        }

        &__item {
            cursor: pointer;
            border: 0.5px solid lightgrey;
            border-radius: 10px;
            padding: 16px 20px;
            &:first-of-type {
                margin-right: 16px;


            }

            @include media("<=tablet") {
                margin-right: 0 !important;
                margin-bottom: 16px;
                
            }

            &__header {
                p {
                    font-weight: 600;
                    color: black !important;
                }
            }

            p {
                color: $faint;
               

            }
        }
    }

    &__button {
        display: flex;
        justify-content: center;

        button {
            @include largebutton;
            margin-top: 36px;


        }
    }
    
}

.step1__selected {
    border: 1px solid $primary;
    p {
        color: $primary !important;
    }
    .circle {
        background: $primary !important;
        border: $primary !important;
    }
}

.step2 {
    margin-top: 100px;

    &__button {
        display: flex;
        justify-content: flex-end;
        button {
            width: 200px !important;
            @include largebutton;
              
        }
    }
}


.form-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 48px;

    @include media("<=t") {
        flex-direction: column;
    }
    .left {
        width: 40%;
        @include media("<=t") {
            width: 100%;
        }
        p {
            color: $faint;
            line-height: 20px;
            margin-bottom: 16px;
            @include media("<=t") {
                margin-bottom: 8px;
                font-size: 15px;
            }
            &:first-of-type {
                line-height: 30px;
                color: black !important;
                font-size: 32px;
                font-weight:600;

                    @include media("<=t") {
                        line-height: 25px;
                        font-size: 20px;
                    }
            }

        }
    }

    .right {
        width: 60%;
        @include media("<=t") {
            width: 100%;
        }
    }
}

.finish-step {
    div {
        width: 20%;
        margin: auto;
    }
    svg {
        width: 100px;
    }

    p {
        font-weight: 20px;
        @include media("<=t") {
            font-size: 14px;
        }
        font-weight: 500;
        text-align: center;
    }
}
</style>