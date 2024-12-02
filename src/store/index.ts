import {createStore} from 'vuex';
import {ConductorService} from "@/services/ConductorService";
import {HttpClient} from "@/clients/HttpClient";
import {Pattern} from "@/pattern/deserialized/Pattern";
import {Instrument} from "@/pattern/deserialized/Instrument";
import {PatternParser} from "@/pattern/PatternParser";

const pattern: Pattern = Pattern.empty()
const patternUndoStack: Pattern[] = []
const patternRedoStack: Pattern[] = []
const prerollMeasures: number = 0
const currentInstrument: Instrument = Instrument.empty()
const contextMenuShown: boolean = false
const editMode: boolean = false

export default createStore({
    state: {
        pattern,
        patternUndoStack,
        patternRedoStack,
        prerollMeasures,
        currentInstrument,
        contextMenuShown,
        editMode,
    },
    getters: {
        getPattern(state): Pattern {
            return state.pattern
        },
        getContextMenuShown(state): boolean {
            return state.contextMenuShown
        },
        isEditMode(state): boolean {
            return state.editMode
        },
        getPreRollMeasures(state): number {
            return state.prerollMeasures
        },
        getCurrentInstrument(state) : Instrument | null{
            return state.currentInstrument
        }
    },
    mutations: {
        setPattern(state, payload: Pattern) {
            state.pattern = payload
        },

        setPatternUndoStack(state, payload: Pattern[]) {
            state.patternUndoStack = payload
        },

        setPatternRedoStack(state, payload: Pattern[]) {
            state.patternRedoStack = payload
        },

        setContextMenuShown(state, payload: boolean) {
            state.contextMenuShown = payload
        },

        setPrerollMeasures(state, payload: number) {
            state.prerollMeasures = payload
        },

        setCurrentInstrument(state, payload: Instrument) {
            state.currentInstrument = payload
        },

        setEditMode(state, payload: boolean) {
            state.editMode = payload
        },

    },
    actions: {
        backup ({ commit, state }) {
            if (ConductorService.isEmpty(state.pattern)) return
            const latestPattern = JSON.parse(JSON.stringify(state.pattern))
            const undoStack: Pattern[] = [...state.patternUndoStack]
            undoStack.push(latestPattern)
            commit('setPatternUndoStack', undoStack)
            commit('setPatternRedoStack', [])
        },

        undo ({ commit, state }) {
            if (!state.patternUndoStack.length) return null;
            const undoStack: Pattern[] = [...state.patternUndoStack]
            const redoStack: Pattern[] = [...state.patternRedoStack]
            const previousPattern = JSON.parse(JSON.stringify(undoStack.pop()))
            redoStack.push(JSON.parse(JSON.stringify(state.pattern)))
            commit('setPatternUndoStack', undoStack)
            commit('setPatternRedoStack', redoStack)
            commit('setPattern', previousPattern)
        },

        redo ({ commit, state }) {
            if (!state.patternRedoStack.length) return null;
            const undoStack: Pattern[] = [...state.patternUndoStack]
            const redoStack: Pattern[] = [...state.patternRedoStack]
            const nextPattern = JSON.parse(JSON.stringify(redoStack.pop()))
            undoStack.push(JSON.parse(JSON.stringify(state.pattern)))
            commit('setPatternUndoStack', undoStack)
            commit('setPatternRedoStack', redoStack)
            commit('setPattern', nextPattern)
        },

        persistPattern({ commit, state }, patternCandidate: any) {
            const pattern: Pattern = !patternCandidate ? state.pattern : new PatternParser().cast(patternCandidate)
            commit('setPattern', pattern)
            localStorage.setItem('pattern', JSON.stringify(pattern))
            if (window['conductor'] && !window['standalone']) HttpClient.sendPatternToBackend(pattern)
        },

        clearPattern({ commit }) {
            commit('setPattern', {})
            localStorage.removeItem('pattern')
        },

        addNewSpan({  dispatch }, instrument) {
            instrument.parts.push({name: 'party x', spans: [[1,16]]})
            dispatch('persistPattern')
        },

        toggleEditMode( {state, commit }) {
            commit('setEditMode', !state.editMode)
        }
    }
})
