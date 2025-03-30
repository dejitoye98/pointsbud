import Vue from "vue";
import getSymbolFromCurrency from 'currency-symbol-map'

export default () => {
    Vue.filter("getFoodImage", function (url) {
        //if (value === 0) return "0";


        
        const CLOUDFRONT_URL = 'https://d32daph4upy9zf.cloudfront.net/';
            if (url) {
                if (url.indexOf('cloudinary') > -1) {
                    let split = url.split('upload');
                    return CLOUDFRONT_URL + "d0e7145ea9ded25b1afaf5d51c9cec4d";
                }
                if (url.indexOf('amazonaws.com') > -1) {
                    return CLOUDFRONT_URL + url.split('amazonaws.com/')[1];
                }
               
            }
            else {
                

                return CLOUDFRONT_URL + "d0e7145ea9ded25b1afaf5d51c9cec4d";
            }
            return CLOUDFRONT_URL + "d0e7145ea9ded25b1afaf5d51c9cec4d";

            return url

    });
    Vue.filter("getDrinkImage", function (url) {
        //if (value === 0) return "0";
        const CLOUDFRONT_URL = 'https://d32daph4upy9zf.cloudfront.net/';
        if (url) {
            if (url.indexOf('cloudinary') > -1) {
                let split = url.split('upload');
                return CLOUDFRONT_URL + "d0e7145ea9ded25b1afaf5d51c9cec4d";
            }
            if (url.indexOf('amazonaws.com') > -1) {
                return CLOUDFRONT_URL + url.split('amazonaws.com/')[1];
            }

           
        }
        else {
            
            return CLOUDFRONT_URL + "d0e7145ea9ded25b1afaf5d51c9cec4d";
        }
        return CLOUDFRONT_URL + "d0e7145ea9ded25b1afaf5d51c9cec4d";

        return url
    });
    
};
