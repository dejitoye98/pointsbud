import Vue from "vue";

export default () => {
    Vue.filter("money", function (value) {
        if (!value) return "";
        return Intl.NumberFormat("en-US").format(value);
    });
};
