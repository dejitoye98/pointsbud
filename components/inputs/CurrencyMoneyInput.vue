<template>
    <div class="form-input" style="width: 100% !important; background: white">
        <div class="" style="height:40px; background: rgba(169, 169, 169, 0.64); border: 1px solid rgba(169, 169, 169, 0.64)">{{currency}}</div>
        <input  v-model="value" type="number" @change="onChangeAmount">
    </div>
</template>


<script>
import country_currencies from '../../country_currencies'



export default {
    props: ['country', 'meta'],
    data() {
        return {
            country_currencies,
            value: '',
            currency: 'NGN',
        }
    },
    created() {
        if (this.country) {
            const object = country_currencies.filter(a => a.countryName === this.country);
            this.currency = object.currecyCode
        }
    },
    watch:{
        value(new_value) {
            this.value = new_value
        }
    },
    methods: {
        onChangeAmount() {
            if (!this.meta) {

                this.$emit('onChange', this.value)
            }
            else this.$emit('onChange', {...this.meta, value: this.value})
        },
        changeValue(event) {
            let value = event && event.target.value;
            if (value) {
                value = Intl.NumberFormat('en-US').format(value)
                this.value =  value;
                this.onChange(this.value)
            }
        }
    },
    computed: {
        
    }
    
}
</script>

<style lang="scss" scoped>
.form-input {
    @include plain-form-input;

    width: 100% !important;

    position: relative !important;
    
    div {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        
        display: flex;
        //justify-content: center;
        align-items: center;
        background: lightgrey;
        justify-content: center;
        width: 60px !important;;
        padding: 0 8px;
        font-weight: 400;
        
    }
    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding-left: 68px !important;
        font-size: 15px;
    }
}
</style>