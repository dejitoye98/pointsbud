
import SuperadminLayout from '../../../../components/layouts/superadmin-layout.vue';
<template>
    <SuperadminLayout>
        <template #content>
            <div class="page">
                <div class="page__container">
                    
                    <div class="page__title"> Create a new Property</div>
                    <div class="form">
                        <div class="form-input">
                            <label for="">Name</label>
                            <input v-model="payload.name">
                        </div>
                        
                        <div class="form-input">
                            <label for="">Location</label>
                            <input v-model="payload.location">
                        </div>
                        <div class="form-input">
                            <label for="">Summary</label>
                            <input v-model="payload.summary">
                        </div>
                        
                        <div class="form-input">
                            <label for="">Market Value (USD)</label>
                            <input inputmode="numeric" v-model="payload.current_market_value">
                        </div>
                        <div class="form-input">
                            <label for="">Rental Income (USD)</label>
                            <input inputmode="numeric" v-model="payload.rental_income">
                        </div>

                        <div class="form-input">
                            <label for="">Description</label>
                            <VueEditor v-model="payload.description"></VueEditor>
                        </div>

                        <div class="form-input">
                            <label>Images</label>
                            <div class="" v-for="(image, index) in payload.images">
                                <S3ImageUpload @onUploaded="imageUploaded" :image_index="index" :link="image"></S3ImageUpload>
                                
                            </div>
                            <button @click="addImage"> + add image</button>
                        </div>
                        <div class="form-input">
                            <label>Minimum Invesment Amount (USD)</label>
                            <input inputmode="numeric" v-model="payload.min_investment_amount">

                        </div>

                        <div class="form-input">
                            <label>Max Investors Required (optional)</label>
                            <input inputmode="numeric" v-model="payload.max_investors">

                        </div>
                        <div class="form-input">
                            <label>Amenities (optional)</label>
                            <input inputmode="numeric" v-model="payload.amenities">

                        </div>
                        

                        <div class="ctas" style="width: 100%;">
                            <button @click="createProperty" :disabled="creating">Create Property</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </template>
    </SuperadminLayout>
</template>

<script>
import { VueEditor } from "vue2-editor";
import S3ImageUpload from '../../../../components/inputs/S3ImageUpload.vue'

export default {
    data() {
        return {
            payload: {
                images: ['']
            },
            creating: false,
        }
    },
    components: {VueEditor, S3ImageUpload},
    methods: {
      imageUploaded(obj) {
        const {image_index, image} = obj;
        
        this.payload.images[image_index] = image;
      },
      addImage() {
        this.payload.images.push('')
      },
      createProperty() {
        this.creating = true;
        this.$api.post('/properties', this.payload).then(resp=> {
            window.open('/superadmin/dashboard/properties/new', '_self')
        }).finally(()=>{
            this.creating = false
        })
      }
    },
}
</script>


<style lang="scss" scoped>

.page {
    &__container {
       // padding: 24px;
        padding: 60px 24px;
    }
    &__title {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 16px;
    }
}

.form {
    background-color: white;
    border-radius: 20px;
    width: 700px;
    margin: auto;
    padding: 24px;
}


.ctas {
    margin-top: 20px;
    button {
        @include normalbutton;
        width: 100%;
    }
}
.form-input {
    @include plain-form-input;
    margin-bottom: 20px;
}
</style>