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
    }
}

export const getters = {
    loggedIn: state => state.loggedIn,
    token: state => state.token,
}