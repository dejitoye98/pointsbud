import Cookies from 'js-cookie';

export const state = () => ({
    focusedCampaign: {},
})

export const mutations = ({
    setFocusedCampaign(state, value) {
        state.focusedCampaign = value
    },

})



export const actions = {

    getCampaign({ dispatch, commit }, id) {
        return new Promise((resolve, reject) => {
            this.$api.get(`/campaigns/${id}`)
                .then(resp => {
                    commit('setFocusedCampaign', resp.data.data)
                    resolve(resp.data.data);
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
    focusedCampaign: state => state.focusedCampaign,
}