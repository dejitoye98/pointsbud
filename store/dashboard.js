
export const state = () => ({
    active: "Overview",
    dashboardTitle: "Overview",
    createCampaign: false,
})

export const mutations = ({
    setActive(state, value) {
        state.active = value
    },
    setDashboardTitle(state, value) {
        state.dashboardTitle = value;
    },
    setCreateCampaign(state, value) {
        state.createCampaign = value;
    }
    
})



export const actions = {
    
}

export const getters = {
    active: state => state.active,
    dashboardTitle: state => state.dashboardTitle,
    createCampaign: state => state.createCampaign,
}