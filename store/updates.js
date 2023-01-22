import Cookies from 'js-cookie';

export const state = () => ({
    updateItems: {

    },
})

export const mutations = ({
    setItems(state, value) {
        state.updateItems = value;
    },

})



export const actions = {
    getUpdates({ dispatch, commit },) {
        return new Promise((resolve, reject) => {
            this.$api.get(`/update-counts`,)
                .then(resp => {
                    commit('setItems', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    //commit('setArticles', err)
                    console.log(err)
                    reject(err)
                });
        })
    },
    setItems({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$api.post(`/update-counts`, payload)
                .then(resp => {
                    commit('setItems', resp.data.data)
                    resolve(resp)
                })
                .catch(err => {
                    //commit('setArticles', err)
                    console.log(err)
                    reject(err)
                });
        })
    },

}

export const getters = {
    updateItems: state => state.updateItems,
}