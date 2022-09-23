import Cookies from 'js-cookie';

export const state = () => ({
    loggedIn: false,
    token: ""
})

export const mutations = ({
    setLoggedIn(state, value) {
        state.loggedIn = value
    },
    setToken(state, value) {
        state.token = value
    }
})



export const actions = {
    login({ dispatch, commit}, payload) {
        Cookies.remove('aff-token')
        return new Promise((resolve, reject) => {
            this.$api.post(`/auth/login`, payload)
                .then(resp => {
                    commit('setLoggedIn',true)
                    commit('setToken',resp.data.data.token)
                    Cookies.set('aff-token', resp.data.data.token);
                    resolve(resp)
                })
            .catch(err => {
                    //commit('setArticles', err)
                    console.log(err)
                    reject(err)
                });
        })    
    }
}

export const getters = {
    loggedIn: state => state.loggedIn,
    token: state => state.token,
}