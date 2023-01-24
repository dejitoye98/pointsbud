import { ColourPicker } from 'vue-colour-picker'
import Vue from "vue"
new Vue({
    components: {
        'colour-picker': ColourPicker
    },

    data() {
        return {
            colour: '#000000'
        }
    }
})