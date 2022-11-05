<template>

    <div class="create">
        <div class="create__sidebar">
            <div class="create__sidebar__logo sidebar-item">
                
                <p class="create__sidebar__fields__title sidebar-item-title">Logo</p>
                <input type="file"/>
            </div>

            <div class="create__sidebar__logo sidebar-item">
                
                <p class="create__sidebar__fields__title sidebar-item-title">Description</p>
                <input type="text" v-model="form_description"/>
            </div>




            <div class="create__sidebar__fields sidebar-item">
                <p class="create__sidebar__fields__title sidebar-item-title">Form Fields</p>
                <div class="create__sidebar__fields__field" v-for="(field, index) in fields" :key="index">
                    <p>{{field.name}}</p>
                </div>
                <div class="create__create-field" v-if="creating_field">
                

                    <div class="create__create-field__form" >
                        <input type="text"  v-model="fields[fields.length-1].name" placeholder="Enter field name">
                        <select name="" id="" v-model="fields[fields.length-1].type" @change="fieldOptionSelected">
                            <option value="" disabled>Select field type</option>
                            <option value="text">Text</option>
                            <option value="single-choice" >Single-choice option</option>
                            <option value="multi-choice" >Multi-choice options</option>
                        </select>
                        <label v-if="fields[fields.length-1].options">Options</label>
                        <div  v-for="(option, o_index) in fields[fields.length-1].options" :key="o_index">
                            <input type="text"  v-model="fields[fields.length-1].options[o_index]" :key="o_index">
                        </div>
                        <button @click="addOption">Add option</button>
                    </div>
                </div>
                <button @click="addField">Add new field</button>
            </div>
        </div>

        <div class="create__container">
            <div class="create__logo">
                Insert your logo
            </div>
            <div class="create__description">
                <p>{{form_description}}</p>
            </div>
            <div class="create__form">
                <div class="create__form__item">
                    <div class="create__form__item__input" v-for="(field, index) in fields" :key="index">
                        <label>{{field.name}}</label>
                        <template v-if="field.type.toLowerCase() === 'text'">
                            <input type="text" disabled>
                        </template>
                        <template v-else-if="field.type.toLowerCase() === 'single-choice'">
                            <select>
                                <option v-for="(option, index) in field.options" :key="index">{{option}}</option>
                            </select>
                        </template>
                        
                        <template v-else-if="field.type.toLowerCase() === 'multi-choice'">
                            <input type="radio" v-for="(option, index) in field.options" :key="index"> {{option}}
                        </template> 
                    </div>
                    <div class="create__form__item__remove">
                        <a>Remove</a>
                    </div>
                </div>
                
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>


.create {
    background: black;
    width: 100%;
    height: 100vh;
    padding: 5px;
    //padding: 16px;
    display: flex;

    &__create-field {
        border: 1px dashed lightgrey;
        margin-top: 20px;;
        font-size: 14px;
        color: #003333;
        padding: 8px;

        &__form {
            label {
                font-weight: 500;
                display: block;
                margin: 5px 0;
            }
            input,select {
                border: 1px solid lightgrey;
                padding: 5px;
                width: 100%;
                font-size: 14px;
                border-radius: 5px;
                margin-bottom:5px;

                &:focus {
                    outline: none;
                }
            }
        }

    }

    &__sidebar {
        background: white;
        height: 100%;
        width: 250px;
        border-radius: 5px;
        color: #003333;


        &__fields {

            &__title {
                font-size: 15px;
                color: #003333;
                margin-bottom: 4px;
            }

            &__field {
                border-radius: 5px;
                margin-bottom: 2px;

                padding: 8px;
                background-color: rgba(173, 216, 230, 0.157) ;
                p {
                    font-size: 14px;
                }
            }


            button {
                @include smallbutton;
                font-size: 14px;
                width: 100%; 
                //color: #003333;
                //border: 1px solid #003333;
                margin-top: 16px;
            }
        }
    }

    &__container {
        width: 85%;
        padding: 16px;
    }

    &__logo {
        width: 50%;
        margin: auto;
        text-align: center;
        border: 1px dotted white;
        color: white;
        margin-bottom: 16px;
    }

    &__description {
        color: black;
        text-align: center;
        font-size: 16px;
        margin-bottom: 8px;
        font-weight: 400;
    }

    &__form {
        width: 50%;
        background: white;
        border-radius: 5px;
        margin: auto;
        min-height: 5vh;
        padding: 24px 16px;

        
        //margin-top: 20px !important;
        &__item {
            &__input {
                display: flex;
                flex-direction: column;
                //align-items: center;
                margin-bottom: 20px;
                
                label {
                    font-size: 14px;
                    color: rgb(54, 44, 44);
                    //margin-right: 8px;
                    ///width: 30%;
                    font-weight: 400;
                }

                input,select{
                    border: 1px solid  lightgrey;
                    padding: 8px; 
                    border-radius: 5px;
                    //width: 70%;
                }
            }
            &__remove {
                display: flex;
                justify-content: flex-end;
                a {
                    color: $primary;
                    font-size: 14px;
                    font-weight: 300;
                }
            }
        }
        &__add {
            //border: 1px dotted $primary;
            padding: 4px 8px;
            border-radius: 10px;
            font-size: 15px;
            margin-top: 16px;
            font-weight: 300;
            color: $primary;
            
        }
    }
}

.sidebar-item {
    width: 90%;
    margin:auto;
    margin-top: 16px;
    &-title {
        cursor: pointer;
        font-weight: 500;
    }
    input,select{
        border: 1px solid  lightgrey;
        padding: 5px; 
        border-radius: 5px;
        font-size: 14px;
        //width: 70%;
        width: 100%;
    }
}
</style>

<script>
export default {
    data() {
        return {
            creating_field: false,
            
            form_description: '',
            field_template: {
                name: "",
                type: ''
            },
            fields: [
                {
                    name: 'Name',
                    type: 'text'
                }
            ],
            perm_fields: [
                {
                    name: 'Name',
                    type: 'text'
                }
            ] 
        }
    },
    methods: {
        addOption(field) {
            if(!field) {
                this.fields[this.fields.length-1].options.push('')
            }
        },
        fieldOptionSelected() {
            if(['single-choice', 'multi-choice'].includes(this.fields[this.fields.length-1].type)) {

                this.fields[this.fields.length-1] = {...this.fields[this.fields.length -1], options: []};
                this.fields[this.fields.length-1].options.push('')
                this.fields[this.fields.length-1].options.push('')
            }
            else {
                
                this.fields[this.fields.length-1] = this.field_template
            }
        },
        addField() {
            this.creating_field = true;
            this.fields.push({name: 'New Field', type: 'text'})
        },
        
        
    }
}
</script>