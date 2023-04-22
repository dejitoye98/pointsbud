export const state = () => ({
    notifications: [],

})

export const mutations = ({
    setNotifications(state, value) {
        state.notifications = value
    },


})



export const actions = {
    getNotifications({ dispatch, commit }) {
        this.$api.get('/notifications/admin?type=new').then(resp => {
            //this.notifications = resp.data.data;
            resp.data.data.map(n => {
                n.show = n.seen == 0
            })
            commit('setNotifications', resp.data.data)
        })
    },
    closeNotification({ dispatch, commit }, id) {

    },
    readNotification({ dispatch, commit }, id) {
        return this.$api.put(`/notifications/${id}/admin/read`).then(resp => {
        })
    }

}

export const getters = {
    notifications: state => state.notifications,
}