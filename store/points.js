import Cookies from 'js-cookie';

export const state = () => ({
    pointsLeft: 0,
})

export const mutations = ({
    setPointsLeft(state, value) {
        state.pointsLeft = value
    },

})




export const getters = {
    pointsLeft: state => state.pointsLeft,
}