<template>
    <div class="page"> 
        <div class="page__container">

            <div class="prof-sidebar sidebar">
                <div class="">
                
                </div>
                <div class="form-input">
                    <label for="">Recommender's Name</label>
                    <input   v-model="payload.recommender_name">
                    
                   
                    
                </div>
                <div class="form-input">
                    <label for="">Recommender's Information</label>
                    <textarea name="" id=""  v-model="payload.recommender_summary">
                    
                    </textarea>
                    
                </div>
            </div>
            <div class="pet-sidebar sidebar">
                <div class="form-input">
                    <label for="">Petitioner's Name</label>
                    <input name="" id="" v-model="payload.petitioner_name">
                    
                  
                </div>
                <div class="form-input">
                    <label for="">Proposed Endeavor</label>
                    <input name="" id="" v-model="payload.proposed_endeavor">
                    
                  
                </div>
                <div class="form-input">
                    <label for="">Petitioner's Information</label>
                    <textarea name="" id="" v-model="payload.petitioner_summary">
                    
                    </textarea>
                </div>
               
            </div>
    
            <div class="main">
                <div class="main__container">

                    <div class="header flex space-between padding-16">
                        <div>
                            <h2>
                                Recommendation Letter Generator
                            </h2>
                            
                            </div>
                        <div class="cta">
                            <button :disabled="generating" @click="generate">Generate Letter</button>
                        </div>
                    </div>
                    <div class="form">
                        <VueEditor v-model="output"></VueEditor>
    
                    </div>
                </div>
              
            </div>
        </div>

    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import socket from "socket.io-client"

export default {
    components: {
        VueEditor
    },
    mounted() {
        this.socketClient = socket(this.$config.SOCKET_BASE);

        this.socketClient.on('connect', () => {
            console.log('Connected to server');
           // this.getBusiness()
        });

        this.socketClient.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        this.socketClient.on("GeneratedText", (data) => {
            this.generating = true
            this.output += data.trim();
        })
        this.socketClient.on("EndedGeneratedText", (data) => {
            this.generating = false
        })
    },
    
    data() {
        return {
            payload: {

            },
            socketClient: null,
            gnerating: false,
            output: '',

        }
    },

    methods: {
        generate() {
            this.$api.post('/generate-recommendation-letter', this.payload);
        }
    }
}
</script>

<style lang="scss" scoped>
.page{

    &__container {
        display: grid;
        grid-template-columns: 20% 20% 60%;
        justify-content: space-between;
    }

}

.header {
    background-color: whitesmoke;
    margin-bottom: 20px;
    align-items: center;
}
.prof-sidebar {
    background-color: whitesmoke;
    padding: 16px;
    border-right: 1px solid lightgray;
}

.main {
    &__container {
        padding: 16px;
    }
}
.pet-sidebar {
    background-color: whitesmoke;
}
.form-input {
    label {
        font-size: 20px;
        font-weight: 600;
    }
    @include plain-form-input;
}
.sidebar {
    padding: 16px;
    min-height: 100vh;
    
}
button {
    @include smallbutton;
}

h2 {
    font-size: 20px;
}
</style>