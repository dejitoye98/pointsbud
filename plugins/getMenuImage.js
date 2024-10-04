import Vue from "vue";
import getSymbolFromCurrency from 'currency-symbol-map'

export default () => {
    Vue.filter("getFoodImage", function (url) {
        //if (value === 0) return "0";


        
        const CLOUDFRONT_URL = 'https://d32daph4upy9zf.cloudfront.net/';
            if (url) {
                if (url.indexOf('cloudinary') > -1) {
                    let split = url.split('upload');
                    return CLOUDFRONT_URL + "199a65b881171e53c570a458c3265f8e";
                }
                if (url.indexOf('amazonaws.com') > -1) {
                    return CLOUDFRONT_URL + url.split('amazonaws.com/')[1];
                }
               
            }
            else {
                

                return CLOUDFRONT_URL + "199a65b881171e53c570a458c3265f8e";
            }
            return CLOUDFRONT_URL + "199a65b881171e53c570a458c3265f8e";

            return url

    });
    Vue.filter("getDrinkImage", function (url) {
        //if (value === 0) return "0";
        const CLOUDFRONT_URL = 'https://d32daph4upy9zf.cloudfront.net/';
        if (url) {
            if (url.indexOf('cloudinary') > -1) {
                let split = url.split('upload');
                return CLOUDFRONT_URL + "ea0da1510f76a83b983391fe9e2ceec8";
            }
            if (url.indexOf('amazonaws.com') > -1) {
                return CLOUDFRONT_URL + url.split('amazonaws.com/')[1];
            }

           
        }
        else {
            
            return CLOUDFRONT_URL + "ea0da1510f76a83b983391fe9e2ceec8";
        }
        return CLOUDFRONT_URL + "ea0da1510f76a83b983391fe9e2ceec8";

        return url
    });
    
};
