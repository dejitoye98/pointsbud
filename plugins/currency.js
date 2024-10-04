import Vue from "vue";
import getSymbolFromCurrency from 'currency-symbol-map'

export default () => {
    Vue.filter("currencySymbol", function (value) {
        //if (value === 0) return "0";
        return getSymbolFromCurrency(value)
    });
    Vue.filter("capitalize", function (value) {
        //if (value === 0) return "0";
        if (value) {
           return  value.chartAt(0).toUpperCase() + value.slice(1).toString();
        }
        return ''
    });
};
