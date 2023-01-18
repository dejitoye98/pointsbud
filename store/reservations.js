import Cookies from "js-cookie";

export const state = () => ({
    spaces: {},
});

export const mutations = {
    setSpaces(state, value) {
        state.spaces = value;
    },
};

export const actions = {};

export const getters = {
    spaces: (state) => state.spaces,
};
