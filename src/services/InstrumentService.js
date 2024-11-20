import {InstrumentTimelineDataFactory} from "@/pattern/InstrumentTimelineDataFactory";
import {PartViewAtBeat} from "@/pattern/PartViewAtBeat";
import {PREROLL_MEASURES} from "@/settings"

const EMPTY_PARTY = {start: 0, duration: 0}

export class InstrumentService {
    partyTimeline = []
    instrumentTimelineData = null

    constructor(instrument, measure) {
        this.instrument = instrument
        this.measure = measure
        if (instrument.partyPerformances) {
            this.instrumentTimelineData = new InstrumentTimelineDataFactory(this.instrument, this.measure.beats).get()
        } else {
            this.instrument.parties.forEach(party => this.createPartyTimeline(party, this.partyTimeline))
        }
    }

    createPartyTimeline(party, partyTimeline) {
        party.spans.forEach((span => {
            for (let i = span[0]; i < span[0] + span[1]; i++) {
                partyTimeline[i] = {name: party.name, start: span[0], duration: span[1]}
            }
        }))
    }

    upcomingParty(currentBeat) {
        if (currentBeat >= this.partyTimeline.length - this.prerollBeats()) return EMPTY_PARTY
        const upcomingParty = this.partyTimeline[currentBeat + this.prerollBeats()]
        if (!upcomingParty) return EMPTY_PARTY
        let currentParty = this.currentParty(currentBeat)
        return !currentParty || currentParty.name === upcomingParty.name ? EMPTY_PARTY : upcomingParty
    }

    currentParty(currentBeat) {
        const currentParty = this.partyTimeline[currentBeat]
        return currentParty ? currentParty : EMPTY_PARTY
    }

    currentPartyNew(currentBeat, isNextSnapshot) {
        const snapshot = this.instrumentTimelineData.timeline[currentBeat]
        if (!snapshot) {
            throw Error("Invalid timeline")
        }
        const nextView = isNextSnapshot || !snapshot.next ? null : this.currentPartyNew(snapshot.next, true)
        if (!snapshot.partyPerformanceId) return new PartViewAtBeat(null, null, null, nextView)
        const currentParty = this.instrumentTimelineData.partiesById[snapshot.partyId]
        const currentElements = Object.values(snapshot.partyElementsMap)
            .map(elemId => this.instrumentTimelineData.partyElementsById[elemId])
        return new PartViewAtBeat(currentParty.name, snapshot.beatValues, currentElements, nextView)
    }

    currentCountDown(currentBeat) {
        const currentParty = this.currentParty(currentBeat)
        return currentParty.start === 0 ? 0 :
            Math.ceil((currentParty.start + currentParty.duration - currentBeat) / this.measure.beats)
    }

    upcomingCountDown(currentBeat) {
        return this.upcomingParty(currentBeat).start === 0 ? 0 :
            Math.ceil((this.upcomingParty(currentBeat).start - currentBeat) / this.measure.beats)
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
