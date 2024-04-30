import {createStore} from 'vuex';

export default createStore({
    state: {
        pattern: {}
    },
    getters: {
        getPattern(state) {
            return state.pattern
        },
    },
    mutations: {
        setPattern(state, payload) {
            state.pattern = payload;
        },
    },
})
