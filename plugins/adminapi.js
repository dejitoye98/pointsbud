export default function ({ app, $axios, $route, store, redirect, $cookies, $config }, inject) {
    const api = $axios.create();
    //api.setBaseURL("//localhost:5000/api/v1");
    api.setBaseURL($config.API_BASE);
    let obj = {}
    if ($cookies.get('usertoken')) {
        obj = { 'Authorization': `Bearer ${$cookies.get('admin-token')}` }
    }
    api.onRequest((config) => {
        config.headers.common = { ...config.headers.common, ...obj }
        config.headers.common["Content-Type"] = "application/json";
    });


    api.onError((error) => {
        //alert(JSON.stringify($route))
        if (error?.response?.status == 401) {
            if (app.router.history.current.path.indexOf('admin') > -1) {
                app.router.push('/admin')
            }
        }

    })
    inject("adminapi", api);
}