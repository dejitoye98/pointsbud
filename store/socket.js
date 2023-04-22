import Cookies from 'js-cookie';


export const state = () => ({
    adminSocketClient: null,
})

export const mutations = ({
    setAdminSocketClient(state, value) {
        state.adminSocketClient = value
    },

})





export const getters = {
    adminSocketClient: state => state.adminSocketClient,
}