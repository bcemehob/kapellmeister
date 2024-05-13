import {createStore} from 'vuex';

export default createStore({
    state: {
        pattern: {},
        contextMenuShown: false
    },
    getters: {
        getPattern(state) {
            return state.pattern
        },
        getContextMenuShown(state) {
            return state.contextMenuShown
        }
    },
    mutations: {
        setPattern(state, payload) {
            state.pattern = payload;
        },
        setContextMenuShown(state, payload) {
            state.contextMenuShown = payload;
        },
    },
})
