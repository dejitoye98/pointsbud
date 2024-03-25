<template>
    <SuperadminLayout>
        <template #content>
            <div class="property">
                <div class="property__container">

                    <div class="form" v-if="property && property.id">
                        <div class="form-input" v-for="(field, index) in Object.keys(property)">
                            <template v-if="required_fields.includes(field)">

                                <template v-if="field !== 'description'">


                                    <label>{{field}}</label>
                                    <input type="text" v-model="property[field]" :disabled="uneditable_fields.includes(field)">
                                </template>


                                <template v-else>

                                    <label>Description</label>

                                    <VueEditor v-model="property.description"></VueEditor>
                                </template>

                            </template>
                            
                            
                        </div>
                        
                        <div class="cta">
                            <button @click="save" :disabled="saving">Save</button>
                        </div>

                    </div>
                    
                </div>
            </div>
        </template>
    </SuperadminLayout>
</template>

<script>
import SuperadminLayout from '../../../../components/layouts/superadmin-layout.vue';
import wysiwyg from "vue-wysiwyg";
import { VueEditor } from "vue2-editor";

export default {
    data() {
        return {
            property: {},
            uneditable_fields: ['createdAt', 'updatedAt'],
            unnecessary_fields:['id'],
            required_fields:['name', 'location', 'summary', 'market_value', 'rental_income', 'description', 'minimum_investment_amount', 'max_investors', 'amenities'],
            saving: false,
        };
    },
    created() {
        this.getProperty();
    },
    methods: {
        getProperty() {
            this.$api.get('/properties/' + this.$route.params.slug).then(resp=> {
                this.property = resp.data.data;
            })
        },
        save() {
            this.saving = true;
            this.$api.put(`/properties/${this.$route.params.slug}`, this.property).then(resp=>{
                
            }).finally(() =>{ 
                this.saving = false;
            })
        }
    },
    components: { SuperadminLayout, VueEditor }
}
</script>

<style lang="scss" scoped>
.property {
    &__container {
        padding: 24px;
        width: 800px;
        margin: auto
    }
}


.cta {
    button {
        @include normalbutton;
    }
}
.form-input {
    @include plain-form-input;
    margin-bottom: 20px;
}


</style>