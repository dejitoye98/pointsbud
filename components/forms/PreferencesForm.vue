<template>
    <div class="form">
        <div class="form-input" v-for="(setting, index) in settings.filter(s => s.group === group)" :key="index">
            <label for="">
                {{setting.name}}
            </label>
            <template v-if="setting.input_type === 'text'">
                <input type="text" :value="getPreferenceValue(setting.id)" @change="change($event, setting.id)">
            </template>
            <template v-if="setting.input_type === 'radio' && setting.input_options === 'yes,no'">
                <div class="flex-row">
                    <label class="checkbox-label"> <input type="radio" :checked="getPreferenceValue(setting.id) === 'yes' || setting.default_value === 'yes'" :name="setting.id " value='yes'  @change="change($event, setting.id)">Yes</label>
                    <label class="checkbox-label"><input type="radio" :name="setting.id" :checked="getPreferenceValue(setting.id) === 'no' || setting.default_value === 'no'" value='no' @change="change($event, setting.id)">No</label>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    props: ['settings', 'preferences', 'group'],
    methods: {
       change(event, setting_id) {
           this.$emit('onChange', {setting_id: setting_id, value: event.target.value})
       },
       getPreferenceValue(setting_id) {
            let value;
            const pref = this.preferences.find(pref => pref.setting.id === setting_id)
            if (pref) value = pref.value;
            return value || this.settings.find(s => s.id === setting_id).default_value;
       },
       
    },
    computed: {
        userDetails() {
            let details = window.localStorage.getItem('afUserDetails');
            if (details) {
                details = JSON.parse(details)
                return details
            }
            return {}
            
        }
    }
    
}
</script>
<style lang="scss" scoped>
.form {
    margin-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.flex-row {
    display: flex;
}
.form-input {
    @include plain-form-input;
    width: 48%;

    
}
.checkbox-label {
    display: flex;
    align-items: center;
    input {
        margin-right: 8px;
        min-height: 25px !important;
        appearance: auto !important;
    }
    margin-right: 16px;
}
</style>