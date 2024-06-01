<template>
    <div>
        <div class="container">
            <div class="sidebar">
                <div class="sidebar__container">
                    <!-- 
                    <div class="sidebar__item">

                        <div class="form-input">
                            <label for="">Name of Candidate</label>
                            <input v-model="form.name">
                        </div>
                    </div>

                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Experience</label>
                            <textarea v-model="form.experience"></textarea>
                        </div>
                    </div>

                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Skills</label>
                            <textarea v-model="form.skills"></textarea>
                        </div>
                    </div>

                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Reference Links on the Web</label>
                            <textarea v-model="form.reference_links"></textarea>
                        </div>
                    </div>---->

                    <!-- 
                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Exhibits</label>
                            <textarea v-model="form.exhibits"></textarea>
                        </div>
                    </div>-->

                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Academic Qualification/History</label>
                            <textarea placeholder="Academic Qualification" v-model="form.academic_qualification"></textarea>
                        </div>
                    </div>
                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Proposed endeavor</label>
                            <textarea  placeholder="Enter the proposed endeavour here" v-model="form.proposed_endeavor"></textarea>
                        </div>
                    </div>
                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Certifications</label>
                            <textarea placeholder="Enter certifications here" v-model="form.certifications"></textarea>
                        </div>
                    </div>
                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Achievements/Contributions</label>
                            <textarea placeholder="Enter achievements here" v-model="form.achievements"></textarea>
                        </div>
                    </div>
                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Chapter to produce</label>
                            <input v-model="form.chapter"></input>
                        </div>
                    </div>

                    <div class="sidebar__item">
                        <button @click="generate" >Generate</button>
                    </div>

                </div>
            </div>

            <div class="main">
                <div class="main__container">

                    <div class="content">
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

    data() {
        return {
            socketClient: null,
            generating: false,
            session_id: ''
        }
    },


    mounted() {
        // create session id 


        this.createSessionId()

        this.socketClient = socket(this.$config.SOCKET_BASE);

        this.socketClient.on('connect', () => {
            console.log('Connected to server');
           // this.getBusiness()
        });

        this.socketClient.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        this.socketClient.on(`GeneratedText sess:${this.session_id}`, (data) => {
            this.generating = true
            this.output += data;
        })
        this.socketClient.on(`EndedGeneratedText  sess:${this.session_id}`, (data) => {
            this.generating = false
        })
    },
    
    data() {
        return {
            
            output: '',
            form: {
                chapter: 1,
            },
            generating: false
        }
    },
    methods: {
        generateUniqueCode(length = 6) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const codeLength = 4;
            const randomBytes = crypto.randomBytes(length);
            const code = [...randomBytes].map(byte => characters[byte % characters.length]).join('');
            return code;
        },
        createSessionId(){
            const code = this.generateUniqueCode();
            this.session_id = code;
        },
        generate(){
            this.generating = true
            this.$api.post('/generate?session_id='+this.session_id, this.form).then(resp=> {
                //this.output = resp.data.data
            }).finally(()=> {
                this.generating = false
            })
        }
    },
    watch: {

    }
}
</script> 


<style lang="scss" scoped>

textarea {
    height: 300px;
}
.container {
    display: flex;
    justify-content: space-between;
    min-height: 100vh;

}

.sidebar {
    width: 30%;
    border-right: 1px solid lightgrey;
    height: 100%;
    max-height: 100vh;
    overflow: scroll;
    &__container {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 16px;
    }

    &__item {

        .form-input {
            @include plain-form-input;
            margin-bottom: 20px !important;
        }

        button {
            @include smallbutton;



        }
    }
}

.main {
    width: 70%;
    padding: 16px;
    min-height: 100vh;

    background-color: whitesmoke;


}
</style>