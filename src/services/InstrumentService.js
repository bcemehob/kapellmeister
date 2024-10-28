const EMPTY_PARTY = {start: 0, duration: 0}
const PREROLL_MEASURES = 4

export class InstrumentService {
    partyTimeline = []
    constructor(instrument, measure) {
        this.instrument = instrument
        this.measure = measure
        this.instrument.parties.forEach(party => this.createPartyTimeline(party, this.partyTimeline))
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
