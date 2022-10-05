export const state = () => ({
    active: "Overview",
    dashboardTitle: "Overview",
    showErrorToast: false,
    showSuccessToast: false,
    successMessage: "",
    errorMessage: "",
    createCampaign: false,
    actionInviteMarketers: false,
    actionAddLink: false,
    actionEditCampaign: false,
    actionFundWallet: false,
    notifications: [],
    notification_length: 0,
    unread_notifications_length: 0,
    static_unread_notifications_length: 0,
})

export const mutations = ({
    setActive(state, value) {
        state.active = value
    },
    setDashboardTitle(state, value) {
        state.dashboardTitle = value;
    },
    setShowErrorToast(state, value) {
        state.showErrorToast = value;
    },
    setErrorMessage(state, value) {
        state.errorMessage = value;
    },
    setShowSuccessToast(state, value) {
        state.showSuccessToast = value;
    },
    setSuccessMessage(state, value) {
        state.successMessage = value;
    },
    setCreateCampaign(state, value) {
        state.createCampaign = value;
    },
    setActionInviteMarketers(state, value) {
        state.actionInviteMarketers = value;
    },
    setActionAddLink(state, value) {
        state.actionAddLink = value;
    },
    setActionFundWallet(state, value) {
        state.actionFundWallet = value;
    },
    setActionEditCampaign(state, value) {
        state.actionEditCampaign = value;
    },
    setNotifications(state, value) {
        state.notifications = value;
    },
    setNotificationLength(state, value) {
        state.notification_length = value
    },
    setUnreadNotificationsLength(state, value) {
        state.unread_notifications_length = value
    },
    setStaticNotificationsLength(state, value) {
        state.static_unread_notifications_length = value
    }

})



export const actions = {
    actionShowErrorToast({ dispatch, commit }, payload) {
        commit('setShowErrorToast', typeof(payload.show) === 'boolean' ? payload.show : true);
        commit('setErrorMessage', payload.message || '')
    },
    actionShowSuccessToast({ dispatch, commit }, payload) {
        commit('setShowSuccessToast', typeof(payload.show) === 'boolean' ? payload.show : true);
        commit('setSuccessMessage', payload.message || '')
    },
    getNotifications({ dispatch, commit }, limit) {
        return new Promise((resolve, reject) => {
            let url = '/notifications';
            if (limit) url += '?limit=' + limit;
            this.$api.get(url)
                .then(resp => {
                    commit('setNotifications', resp.data.data.list)

                    // get all unread notifications
                    commit('setUnreadNotificationsLength', resp.data.data.unread)
                    commit('setStaticNotificationsLength', resp.data.data.unread)
                    commit('setNotificationLength', resp.data.data.total)
                    resolve(resp)
                })
                .catch(err => {
                    //commit('setArticles', err)
                    console.log(err)
                    reject(err)
                });
        })
    },
    readNotifications({ dispatch, commit, state }, payload) {
        return new Promise((resolve, reject) => {
            commit('setUnreadNotificationsLength', parseInt(state.unread_notifications_length) - payload.notifs.length)
            this.$api.put(`/notifications/read`, payload)
                .then(resp => {
                    //commit('setNotifications', resp.data.data.list)
                    resolve(resp)
                })
                .catch(err => {
                    //commit('setArticles', err)
                    commit('setUnreadNotificationsLength', parseInt(state.unread_notifications_length) + payload.notifs.length)
                    console.log(err)
                    reject(err)
                });
        })
    },
}

export const getters = {
    active: state => state.active,
    dashboardTitle: state => state.dashboardTitle,
    showErrorToast: state => state.showErrorToast,
    showSuccessToast: state => state.showSuccessToast,
    successMessage: state => state.successMessage,
    errorMessage: state => state.errorMessage,
    createCampaign: state => state.createCampaign,
    actionInviteMarketers: state => state.actionInviteMarketers,
    actionAddLink: state => state.actionAddLink,
    actionEditCampaign: state => state.actionEditCampaign,
    actionFundWallet: state => state.actionFundWallet,
    notifications: state => state.notifications,
    notification_length: state => state.notification_length,
    unread_notifications_length: state => state.unread_notifications_length,
    static_unread_notifications_length: state => state.static_unread_notifications_length,
}