
export const state = () => ({
    amountToFund: 0,
   
})

export const mutations = ({
    setAmountToFund(state, value) {
        state.amountToFund = value
    },
})



export const actions = {
    
}

export const getters = {
    amountToFund: state => state.amountToFund,
}