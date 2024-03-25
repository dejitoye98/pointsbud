import Cookies from 'js-cookie';

export const state = () => ({
    active_tab: 'Dashboard',
    dashboard_title: 'Dashboard',
    token: "",
    show_mobile_navigation: false,
    
    
    properties: [],
    
})

export const mutations = ({
    setActiveTab(state, value) {
        state.active_tab = value
    },
    setDashboardTitle(state, value) {
        state.dashboard_title = value
    },
    setToken(state, value) {
        state.token = value
    },
    setShowMobileNavigation(state, value) {
        state.show_mobile_navigation = value
    },

    setProperties(state, value) {
        state.properties = value
    },
})



export const actions = {
    async fetchProperties({dispatch, commit}, payload){
        function objectToQueryString(obj) {
            const keyValuePairs = [];
            for (const key of Object.keys(obj)) {
                if (obj.hasOwnProperty(key)) {
                    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
                }
            }
            return keyValuePairs.join('&');
        }
      return new Promise(async (resolve, reject) => {
        let url = `/properties?`;
        if (payload) {
            url += objectToQueryString(payload)
        }
        await this.$api.get(url).then(resp=>{
            commit('setProperties', resp.data.data?.items)
            resolve(resp.data.data.items)
        }).catch(err=>{
            reject(err)
        })
      })  
    },
    login({ dispatch, commit }, payload) {
        this.$cookies.remove('aff-token', { path: '' })
        return new Promise((resolve, reject) => {
            this.$api.post(`/auth/login`, payload)
                .then(resp => {
                    commit('setLoggedIn', true)
                    commit('setToken', resp.data.data.token)
                    this.$cookies.set('aff-token', resp.data.data.token);
                    window.localStorage.setItem('afContext', resp.data.data.context)

                    resolve(resp)
                })
                .catch(err => {
                    //commit('setArticles', err)
                    console.log(err)
                    reject(err)
                });
        })
    },
    getAuthUser({ dispatch, commit }) {
        return new Promise((resolve, reject) => {
            this.$api.get(`/users/self`)
                .then(resp => {
                    window.localStorage.setItem('afUserDetails', JSON.stringify(resp.data.data))
                    resolve(resp)
                })
                .catch(err => {
                    //commit('setArticles', err)
                    console.log(err)
                    reject(err)
                });
        })
        
    },
    changeTab({ dispatch, commit }, tab, router) {
        commit('setActiveTab', tab)

        
        
    }
}

export const getters = {
    active_tab: state => state.active_tab,
    dashboard_title: state => state.dashboard_title,
    token: state => state.token,
    show_mobile_navigation: state=> state.show_mobile_navigation,

    properties: state => state.properties
}