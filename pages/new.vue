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
                            <input v-model="form.academic_qualification">
                        </div>
                    </div>
                    <div class="sidebar__item">
                        <div class="form-input">
                            <label for="">Chapter to produce</label>
                            <input v-model="form.chapter"></input>
                        </div>
                    </div>

                    <div class="sidebar__item">
                        <button @click="generate" :disabled="generating">Generate</button>
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

export default {
    components: {
        VueEditor
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
        generate(){
            this.generating = true
            this.$api.post('/generate', this.form).then(resp=> {
                this.output = resp.data.data
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
.container {
    display: flex;
    justify-content: space-between;
    min-height: 100vh;

}

.sidebar {
    width: 30%;
    border-right: 1px solid lightgrey;
    height: 100%;

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