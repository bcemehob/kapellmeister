import {PREROLL_MEASURES} from "@/settings"

const EMPTY_PART = {start: 0, duration: 0}

export class InstrumentServiceLegacy {
    partTimeline = []

    constructor(instrument, measure) {
        this.instrument = instrument
        this.measure = measure
        this.instrument.parties.forEach(part => this.createPartTimeline(part, this.partTimeline))
    }

    createPartTimeline(part, partTimeline) {
        part.spans.forEach((span => {
            for (let i = span[0]; i < span[0] + span[1]; i++) {
                partTimeline[i] = {name: part.name, start: span[0], duration: span[1]}
            }
        }))
    }

    upcomingPartLegacy(currentBeat) {
        if (currentBeat >= this.partTimeline.length - this.prerollBeats()) return EMPTY_PART
        const upcomingParty = this.partTimeline[currentBeat + this.prerollBeats()]
        if (!upcomingParty) return EMPTY_PART
        let currentParty = this.currentPartLegacy(currentBeat)
        return !currentParty || currentParty.name === upcomingParty.name ? EMPTY_PART : upcomingParty
    }

    currentPartLegacy(currentBeat) {
        const currentParty = this.partTimeline[currentBeat]
        return currentParty ? currentParty : EMPTY_PART
    }

    currentCountDown(currentBeat) {
        const currentParty = this.currentPartLegacy(currentBeat)
        return currentParty.start === 0 ? 0 :
            Math.ceil((currentParty.start + currentParty.duration - currentBeat) / this.measure.beats)
    }

    upcomingCountDown(currentBeat) {
        return this.upcomingPartLegacy(currentBeat).start === 0 ? 0 :
            Math.ceil((this.upcomingPartLegacy(currentBeat).start - currentBeat) / this.measure.beats)
    }

    countDown(currentBeat) {
        const current = this.currentCountDown(currentBeat)
        const upcoming = this.upcomingCountDown(currentBeat)
        if (current === 0 && upcoming === 0) return {type: 'no-count', count: null}
        else if (current === upcoming) return {type: 'common', count: current}
        return current ? {type: 'current', count: current} : {type: 'upcoming', count: upcoming}
    }

    prerollBeats() {
        return this.measure.beats * PREROLL_MEASURES
    }
}
