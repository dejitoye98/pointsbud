
export const state = () => ({
    active: "Overview",
    dashboardTitle: "Overview",
})

export const mutations = ({
    setActive(state, value) {
        state.active = value
    },
    setDashboardTitle(state, value) {
        state.dashboardTitle = value;
    }
    
})



export const actions = {
    
}

export const getters = {
    active: state => state.active,
    dashboardTitle: state => state.dashboardTitle
}