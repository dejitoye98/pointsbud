<template>
    <div class="form">
        <div class="form-input">
            <p class="error">{{error}}</p>
            <label>Bank</label>
            <select v-model="bank.bank_name"> 
                <option v-for="bank in Object.keys(banks)" :key="bank"> {{bank}}</option>
            </select>
            
        </div>
        <div class="form-input">
            <p class="error">{{error}}</p>
            <label>Account Number</label>
            <input type="number" v-model="bank.account_number" />
        </div>
        <label class="checkbox-label"><input type="checkbox" v-model="bank.is_primary">Make primary</label>
        <div style="display: flex;justify-content:flex-end">
            <button class="button" @click="addBankAccount">Add</button>
        </div>
    </div>
</template>

<script>
import banks from './../nigerian_banks';
export default {
    data() {
        return {
            banks,
            error: '',
            bank: {
                account_number: '',
                bank_name: '',
                bank_shortcode: '',
                is_primary: 0
            }
        }
    },
    methods: {
        addBankAccount() {

            const payload = this.bank
            payload.bank_shortcode = this.banks[this.bank.bank_name]
            if (!payload.account_number || !payload.bank_name || !payload.bank_shortcode) {
                this.error = "Please enter all fields"
                return false
            }
            this.$api.post('/bank-accounts', payload).then(resp=> {
                this.bank = {
                    account_number: '',
                    bank_name: '',
                    bank_shortcode: '',
                    is_primary: ''
                }

               this.$emit('reloadBankAccountsList', true)
            })

        }
    },
    
}
</script>


<style lang="scss" scoped>

.checkbox-label {
    display: flex;
    align-items: center;
    color: grey;
    input {
        margin-right: 8px;
        margin-bottom: 0;
        min-height: 15px !important;
        appearance: auto !important;
        display: inline-block;
    }
    font-size: 15px;
    margin-right: 16px;
}
.error {
    @include error;
}
.form-input {
    @include plain-form-input;
}
.button {
    @include smallbutton;
    min-height: auto;
    height: auto;
    width: auto;
    border-radius: 5px;
    padding: 8px 16px;

}
input {
    margin-bottom: 16px;
}
.form {
    width: 100%;
}
</style>