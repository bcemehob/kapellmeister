import {createStore} from 'vuex';
import {ConductorService} from "@/services/ConductorService";

export default createStore({
    state: {
        pattern: {},
        patternUndoStack: [],
        patternRedoStack: [],
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
        setPatternUndoStack(state, payload) {
            state.patternUndoStack = payload;
        },
        setPatternRedoStack(state, payload) {
            state.patternRedoStack = payload;
        },
        setContextMenuShown(state, payload) {
            state.contextMenuShown = payload;
        },
    },
    actions: {
        backup ({ commit, state }) {
            if (ConductorService.isEmpty(state.pattern)) return
            const latestPattern = JSON.parse(JSON.stringify(state.pattern))
            const undoStack = [...state.patternUndoStack]
            undoStack.push(latestPattern)
            commit('setPatternUndoStack', undoStack)
            commit('setPatternRedoStack', [])
        },
        undo ({ commit, state }) {
            if (!state.patternUndoStack.length) return null;
            const undoStack = [...state.patternUndoStack]
            const redoStack = [...state.patternRedoStack]
            const previousPattern = JSON.parse(JSON.stringify(undoStack.pop()))
            redoStack.push(JSON.parse(JSON.stringify(state.pattern)))
            commit('setPatternUndoStack', undoStack)
            commit('setPatternRedoStack', redoStack)
            commit('setPattern', previousPattern)
        },
        redo ({ commit, state }) {
            if (!state.patternRedoStack.length) return null;
            const undoStack = [...state.patternUndoStack]
            const redoStack = [...state.patternRedoStack]
            const nextPattern = JSON.parse(JSON.stringify(redoStack.pop()))
            undoStack.push(JSON.parse(JSON.stringify(state.pattern)))
            commit('setPatternUndoStack', undoStack)
            commit('setPatternRedoStack', redoStack)
            commit('setPattern', nextPattern)
        },
        persistPattern({ commit, state }, pattern) {
            pattern = !pattern ? state.pattern : pattern
            commit('setPattern', pattern)
            localStorage.setItem('pattern', JSON.stringify(pattern))
        },
        addNewSpan({  dispatch }, instrument) {
            instrument.parties.push({name: 'party x', spans: [[1,16]]})
            dispatch('setPattern')
        }
    }
})
