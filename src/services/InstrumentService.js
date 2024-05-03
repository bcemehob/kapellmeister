const EMPTY_PARTY = {start: 0, duration: 0}

export class InstrumentService {
    partyTimeline = []
    constructor(instrument, measure) {
        this.instrument = instrument
        this.measure = measure
        this.instrument.parties.forEach(party => party.spans.forEach((span => {
            for (let i = span[0]; i < span[0] + span[1]; i++) {
                this.partyTimeline[i] = {name: party.name, start: span[0], duration: span[1]}
            }
        })))
    }

    upcomingParty(currentBeat) {
        if (currentBeat >= this.partyTimeline.length - this.measure.beats) return EMPTY_PARTY
        const upcomingParty = this.partyTimeline[this.currentBeat + this.measure.beats]
        if (!upcomingParty) return EMPTY_PARTY
        return !this.currentParty || this.currentParty.name === upcomingParty.name ?
            {start: 0, duration: 0} : upcomingParty
    }

    currentParty(currentBeat) {
        const currentParty = this.partyTimeline[currentBeat]
        return currentParty ? currentParty : EMPTY_PARTY
    }

    countDown(currentBeat) {
        return this.upcomingParty(currentBeat).start === 0 ? "-" :
            Math.ceil((this.upcomingParty(currentBeat).start - currentBeat) / this.measure.beats)
    }





}
