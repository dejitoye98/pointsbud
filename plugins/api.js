export default function ({ $axios, store, redirect, $cookies }, inject) {
    const api = $axios.create();
    //api.setBaseURL("https://loyalteeapi.herokuapp.com/api/v1");
    api.setBaseURL("//localhost:5000/api/v1");
    let obj = {}
    if ($cookies.get('loyal-token')) {
        obj = { 'Authorization': `Bearer ${$cookies.get('loyal-token')}` }
    }
    api.onRequest((config) => {
        config.headers.common = { ...config.headers.common, ...obj }
        config.headers.common["Content-Type"] = "application/json";
    });
    inject("api", api);
}