<template>
    <div class="page">
        <div class="page__container">

            <div class="card">
                <div class="card__container">
                
                    <h1>

                        Veend Auth Sample
                    </h1>

                    <template v-if="step == 1">
                        <div class="card__body">
                            <p class="caption">Is your salary account phone 08100455706 available on WhatsApp?</p>
                            <div class="cta flex gap-2">
                                <button @click="generateVerificationCode">Yes, it's available on WhatsApp</button>
                                <button>No, it's not</button>
                            </div>
                        </div>
                    </template>

                    <template v-if="step==2">
                        <div class="card__body">
                            <p class="caption"> Please click on this link to verify your account on Whatsapp</p>

                            <div class="cta">
                                <button>I have verified my account</button>
                                <span>Click on the button when you've sent the verification message to Whatsapp</span>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            


            
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            step: 1,
            verification_code: null
        }

        
    },
    methods: {
            generateVerificationCode(){
                this.$api.post('https://phoneverify-83aue.ondigitalocean.app/verify', {
                    phoneNumber: "08100455706"
                }).then(resp=> {
                    this.verification_code = resp.data.data.verificationCode
                    this.step=2
                })
            }
    }
}
</script>


<style lang="scss" scoped>
.page {
    &__container {
        
    }
}

.card {
    border: 1px solid grey;
    padding: 24px;
    width: 90% ;
    margin: auto;
    margin-top: 10px;
}

h1 {
    font-family: "Quicksand", sans-serif;
    font-size: 20px;
    font-weight: 700;
   
}

button {
    @include smallbutton;
    display: block;
    width: 100%;
    margin: 0 !important;
   // padding: 0;
    
}

.caption {
    font-size: 15px;
    font-family: "Inter", sans-serif;
}

span{
    text-align: center;
    display: block;
    font-size: 13px;
    
}

.cta {
    //display: none;
    margin: 10px;
}
</style>