<template>
    <div v-if="show">
        <Modal @close="close" title="Edit product" classes="half-body">
            <div class="form">
                <div class="form__container">

                    
                        <div class="form-input"  v-for="(feature, index) in local_details" :key="index">
                            <input type="text" placeholder="Name (e.g delivery medium)" style="margin-bottom:5px;" v-model="local_details[index].name"> 
                            <input type="text" placeholder="Value (e.g email address)" v-model="local_details[index].value">
                        </div>

                        <button class="add" :disabled="loading" @click="addDeliveryDetail">Add Delivery Detail</button>
                        
                        

                    
                </div>

                <div class="form__footer">
                    <button @click="edit">Edit</button>
                </div>
                
            </div>
        </Modal>
    </div>
</template>


<script>
import Modal from '../Modal'
export default {
    props: ['details', 'product', 'show'],
    components: {
    },
    mounted() {
    },
    data() {
        return {
            errors: {},
            local_details:[{
                name: '',
                value: ''
            }],
            loading: false,
        }
    },
    watch: {
       details(value) {
           this.local_details = value;
           //this.local_features = JSON.parse(JSON.stringify(this.feature));
       }
    },
    mounted() {
        /*if (this.features) {
            this.local_features = JSON.parse(this.features);
        }*/
    
    },
    methods: {
        addDeliveryDetail(){
            this.local_details.push({
                name: '',
                value: ''
            })
        },
        addFeature() {
            
            this.local_details.push('')
        },
       
        close() {
            this.$emit('close')
        },
        edit() {
            this.loading = true;
            this.$api.put('/products/' + this.product.id, {delivery_details: this.local_details}).then(resp=> {
                this.loading = false;
                this.$store.dispatch('dashboard/actionShowSuccessToast', {message: "Successfully updated the product"})
                this.close();
            }).catch(err=> {
                this.loading = false;
                
                this.$store.dispatch('dashboard/actionShowErrorToast', {message: err.response && err.response.data.data || err})

            })
        }
    },
    computed: {
       
    }
    
}
</script>
<style lang="scss" scoped>
.add {
    @include editbutton;
    margin-left: 0;
}
.half {
    display: flex;
    justify-content: space-between;
    width: 100% !important;
    .form-input {
        width:100% !important;

        input, select, textarea {
            width: 98% !important;
        }

        input[type='radio'] {
            width: 50px !important;
            height: 50px
        }
    }
}

.form-input {
   display: flex;
    flex-direction: column;
    margin-bottom: 24px;

        &:deep(.mx-datepicker) {
            height: 50px !important;
            width: 98%;
            
        }
        &:deep(.mx-input-wrapper) {
            height: 50px !important;
            
        }
        &:deep(.mx-input) {
            height: 50px !important;
        }

    label {
        font-size: 15px;
        color: $charcoal;
        font-weight: 400;
        margin-bottom: 5px;
    }

    input, select,textarea {
        /*display: inline-block;
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

        

        outline-color: rgba(229, 231, 235)*/


        position: relative;
        cursor: text;
        font-size: 14px;
        line-height: 20px;
        padding: 8px 16px;
        height: 48px;
        background-color: #fff;
        border: 1px solid #d6d6e7;
        border-radius: 3px;
        color: rgb(35, 38, 59);
        box-shadow: inset 0 1px 4px 0 rgb(227 160 158 / 20%);
        overflow: hidden;
        transition: all 100ms ease-in-out;
        :focus {
            border-color: #3c4fe0;
            box-shadow: 0 1px 0 0 rgb(35 38 59 / 5%);
        }
    

    }

    textarea {
        height: 200px;
    }

}

.form{
    &__footer {
        display: flex;
        justify-content: flex-end;
        
        button {
            @include largebutton;
            width: auto;
            height:auto;
            min-height: auto;
            padding: 8px 24px !important;
        }
    }
}
</style>