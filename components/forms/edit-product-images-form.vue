<template>
    <div v-if="show">
        <Modal @close="close" title="Edit Product Images " classes="half-body">
            <div class="form">
                <div class="form__container">

                    <div class="image-container">

                        <ImageUpload :link="image"  v-for="(image, image_index) in local_details" :key="image_index" :product_index="image_index" :image_index="image_index"  @onImageUploaded="imageUploaded"/>
                    </div>
                            
                    <button class="add" :disabled="loading" @click="addImage">Add Image</button>
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
    props: ['images', 'product', 'show'],
    components: {
    },
    
    data() {
        return {
            errors: {},
            local_details: this.images || [''],
            loading: false,
        }
    },
    watch: {
       images(value) {
           this.local_details = this.images;
       }
    },
    
    methods: {

        
        imageUploaded(meta) {
            //alert(JSON.stringify(meta))
            //alert(meta.image_index)
            //alert(meta.image)
            this.local_details[meta.image_index] = meta.image
            
            //this.local_details[meta.index]= meta.image;
            this.local_details.push('');
        },
        addImage(){
            this.local_details.push('')
        },
        
       
        close() {
            this.$emit('close')
        },
        edit() {
            this.loading = true;
            //this.local_details = this.local_details.filter(image=>image)
            
            this.$api.put('/products/' + this.product.id, {images: this.local_details}).then(resp=> {
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
.form-group {
    .header {
        color: lightseagreen;
        font-size: 14px;
        font-weight: 400;
    }
    border: 0.5px solid rgba(211, 211, 211, 0.397);
    padding: 8px;
    margin-bottom: 16px;
}
.image-container {
    position: relative;
    padding: 5px 0;
    display: grid;
    grid-template-columns: 24% 24% 24% 24%;
    justify-content: space-between;
    //margin-bottom: 32px;
}
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