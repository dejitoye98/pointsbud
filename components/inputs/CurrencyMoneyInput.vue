<template>
    <div class="form-input" style="width: 98%; height: 50px;">
        <div class="currency" style="height:49px; z-index: 1000;">{{currency}}</div>
        <input style="height; 50px;"  v-model="value" type="number" @change="onChangeAmount">
    </div>
</template>


<script>
import country_currencies from '../../country_currencies'



export default {
    props: ['country', 'meta', 'classes'],
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


.currency{ 
    background: lightgray;
    border-radius: 4px;;

    top: -1px !important;
    left: -1px !important;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    width: 60px;
}
.form-input {

    width: 100% !important;
    height: 50px !important;
    position: relative !important;
        border: 2px solid rgba(211, 211, 211, 0.442);

    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 6px 30px;
    padding-left: 10px;
    font-size: 14px;
    line-height: 1.4;
    color: #555;
    background-color: #fff;
    border-radius: 4px;
    

    div {
        position: absolute;
        top: 0;
        left: 0;
        //height: 100%;
        
        display: flex;
        //justify-content: center;
        align-items: center;
        justify-content: center;
        //padding: 0 8px;
        font-weight: 400;
        
    }
    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        padding: 0 0 0 68px;
            appearance: none;
            -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        outline: none;
        //border: 1px solid #ccc;

        border-radius: 4px;
                font-size: 15px;
        line-height: 1.4;
        color: $charcoal;




        &:focus {

        }
//        border: 1px solid rgba(169, 169, 169, 0.64) !important;


    }
}
</style>