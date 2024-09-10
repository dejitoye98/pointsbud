<template>
    <div class="page"> 

        <BaseModal>
            <template #header>
                <div class="padding-16">
                    
                </div>
            </template>
        
            <template #body>
                <div class="padding-16">
                    Loading, please wait...
                </div>
            </template>
        </BaseModal>
        
        <div class="page__container">
            <BaseModal v-if="show_confirmation_modal" @close="show_confirmation_modal = false">
                <template #header>
                    <div class="padding-16">
                        Delete Template
                    </div>
                </template>

                <template #body>
                    <div class="padding-16">
                       <p>Are you sure you want to delete this template?</p>
                    </div>

                    
                </template>

                <template #footer>
                    <div>
                        <button @click="show_confirmation_modal=false">Cancel</button>
                        <button style="background-color: white; color: black" @click="deleteTemplate">Delete</button>
                    </div>
                </template>
            </BaseModal>

            <CreateRecommendationTemplateModal @close="show_template_modal = false" @createdTemplate="getTemplates" v-if="show_template_modal"></CreateRecommendationTemplateModal>
            
            <CreateRecommendationTemplateModal :data="focused_template" mode='edit' @close="show_viewtemplate_modal = false" @editedTemplate="getTemplates" v-if="show_viewtemplate_modal"></CreateRecommendationTemplateModal>


            <div class="fullsidebar flex-col">

                <div class="head">
                    <div class="head__header padding-24 space-between flex-center-y">
                        <p class="header-text" style="font-size: 18px; font-weight: 600">Templates</p>
                        <button @click="show_template_modal = true">Add new</button>
                    </div>


                    <div class="padding-24-x">
                        <p>Choose a template</p>
                    </div>
                    <div class="list padding-24 grid grid-cols-2 gap-2" style="border-bottom: 1px solid black">
                        <div class="template" @click.stop="chosen_template_id = template.id" :key="index" v-for="(template, index) of templates" :class="[chosen_template_id === template.id? 'selected-template': '']">
                            <p>{{template.name}}</p>

                            <button class="normal-button" @click.stop="viewTemplate(template)">View</button>
                            <button class="normal-button delete-btn" :disabled="deleting" @click.stop="triggerDeleteTemplate(template.id)">Delete</button>

                        </div>
                      
                    </div>
                </div>


                <div class="body padding-24">

                    <div class="form-input">
                        <label for="">Recommender's Name</label>
                        <input   v-model="payload.recommender_name">
                        
                       
                        
                    </div>
                    <div class="form-input">
                        <label for="">Recommender's Information</label>
                        <textarea name="" id=""  v-model="payload.recommender_summary">
                        
                        </textarea>
                        
                    </div>
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
                

                <div class="padding-24">

                    <button  @click="generate" :disabled="loading">Generate Letter</button>
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
import CreateRecommendationTemplateModal from "../../components/modals/CreateRecommendationTemplateModal.vue";

export default {
    components: {
    VueEditor,
    CreateRecommendationTemplateModal
},
    mounted() {

        this.sess = this.getSession();

        this.socketClient = socket(this.$config.SOCKET_BASE);

        this.socketClient.on('connect', () => {
            console.log('Connected to server');
           // this.getBusiness()
        });

        this.socketClient.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        this.socketClient.on("GeneratedText " + this.sess, (data) => {
            this.generating = true
            this.output += data.trim();
        })
        this.socketClient.on("EndedGeneratedText " + this.sess, (data) => {
            this.generating = false
        })
    },
    
    data() {
        return {
            deleting: false,
            loading: false,
            payload: {

            },
            sess:"",

            chosen_template_id: null,
            
            templates: [],


            show_template_modal: false,


            show_viewtemplate_modal: false,

            show_confirmation_modal: false,
            socketClient: null,
            generating: false,
            output: '',
            focused_template: null,

        }
    },

    created() {
        this.getTemplates()
    },

    methods: {
        async generate() {
            this.loading = true;
            await this.$api.post('/generate-recommendation-letter', {chosen_template_id: this.chosen_template_id, ...this.payload, sess: this.sess});
            this.loading = false;
        },
        getTemplates() {
            this.$api.get('/recommendation-templates').then(resp=> {
                this.templates = resp.data.data;
            })
        },
        viewTemplate(template){
            this.show_viewtemplate_modal = true;
            this.focused_template = template
        },

        getSession() {
            let session = window.localStorage.getItem("sessionToken")
            if (!session)  session = new Date().getTime().toString();
            window.localStorage.setItem("sessionToken", session)
            return session;
        },
        triggerDeleteTemplate(template_id){
            this.chosen_template_id = template_id
            this.show_confirmation_modal = true;
        },
        editTemplate() {
            this.$api.put('/templates/' + this.chosen_template_id, {
                data: JSON.stringify(this.payload)
            })
        },
        async deleteTemplate() {
            this.deleting = true;
            await this.$api.delete('/recommendation-templates/' + this.chosen_template_id);
            this.deleting = false
            this.show_confirmation_modal = false;
            this.getTemplates()

        }
    }
}
</script>


<style lang="scss" scoped>

.selected-template {
    background-color: $secondary !important;
}

.delete-btn {
    color: red;
}

.template {
    background-color: white;
   //width: 100%;
    padding: 16px;;
    border-radius: 10px;
    border: 1px solid lightgrey;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    &:hover {
        background-color: rgb(231, 231, 231)smoke;
    }
}
.page{

    &__container {
        display: grid;
        grid-template-columns: 40% 60%;
        justify-content: space-between;
    }

}

.header {
    background-color: whitesmoke;
    margin-bottom: 20px;
    align-items: center;
}

.fullsidebar {
    background-color: whitesmoke;
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
    @include plain-form-input;

    label {
        font-size: 16px;
        font-weight: 400;
    }
}
.sidebar {
    padding: 16px;
    min-height: 100vh;
    
}
button {
    @include smallbutton;
}


.normal-button {
    background-color: white;
    color: black;
    font-weight: 400;
    padding: 8px;
}
h2 {
    font-size: 20px;
}
</style>