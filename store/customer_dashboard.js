export const state = () => ({
    active: "Overview",

})

export const mutations = ({
    setActive(state, value) {
        state.active = value
    },

})



export const actions = {

}

export const getters = {
    active: state => state.active,

}