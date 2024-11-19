import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData";
import {PartySnapshot} from "@/pattern/PartySnapshot";

export class InstrumentTimelineDataFactory {
    constructor(instrument, measureBeats) {
        this.instrument = instrument
        this.measureBeats = measureBeats
        this.partiesById = this.mapParties()
        this.partyPerformancesById = this.mapPartyPerformances()
        this.partyElementsById = this.mapPartyElements()
        this.timeline = this.instrumentTimeline()
    }

    get() {
        return new InstrumentTimelineData(this.timeline, this.partiesById, this.partyPerformancesById, this.partyElementsById)
    }

    mapParties() {
        const mappedParties = {}
        this.instrument.parties.forEach(p => mappedParties[p.id] = p)
        return mappedParties
    }

    mapPartyPerformances() {
        const mappedPartyPerformances = {}
        this.instrument.partyPerformances.forEach(pp => mappedPartyPerformances[pp.id] = pp)
        return mappedPartyPerformances
    }

    mapPartyElements() {
        const mappedPartyElements = {}
        this.instrument.partyElements.forEach(pp => mappedPartyElements[pp.id] = pp)
        return mappedPartyElements
    }

    findNextPerformanceId(i) {
        const result = this.instrument.partyPerformances
            .filter(pp => this.getStartBeat(pp) > i)
            .sort((a, b) => a.start - b.start)[0]
        return result ? result.id : null
    }

    findNextPerformanceIdAfterExistingPerformance(nextPerformanceStart) {
        const result = this.instrument.partyPerformances
            .find(pp => this.getStartBeat(pp) === nextPerformanceStart)
        return result ? result.id : null
    }

    getStartBeat(partyPerformance) {
        return (partyPerformance.start - 1) * this.measureBeats + 1 - this.partiesById[partyPerformance.partyId].anacrusis
    }

    getDurationInBeats(party) {
        return party.duration * this.measureBeats + party.anacrusis + party.clausula
    }

    instrumentTimeline() {
        const timeline = []
        this.instrument.partyPerformances.forEach(pp => this.fillPerformanceBeatsBySnapshots(pp, timeline))
        this.fillEmptyBeatsBySnapshots(timeline)
        return timeline
    }

    fillPerformanceBeatsBySnapshots(partyPerformance, timeline) {
        const party = this.partiesById[partyPerformance.partyId]
        const startBeat = this.getStartBeat(partyPerformance)
        const durationInBeats = this.getDurationInBeats(party)
        for (let i = startBeat; i < startBeat + durationInBeats; i++) {
            if (timeline[i]) {
                throw Error(`Party Snapshot already set for position ${i}:`, timeline[i])
            }
            const currentBeatOfParty = i - startBeat + 1
            const currentPartyElements = this.instrument.partyElements
                .filter(partyElement => partyElement.partyId === party.id
                    && partyElement.start <= currentBeatOfParty
                    && partyElement.end() >= currentBeatOfParty
                )
            const partyElementsMap = {}
            currentPartyElements.forEach(cpe => partyElementsMap[cpe.type] = cpe.id)
            const beatValues = {start: startBeat, duration: durationInBeats}
            const nextPerformanceId = this.findNextPerformanceIdAfterExistingPerformance(startBeat + durationInBeats)
            timeline[i] = new PartySnapshot(partyPerformance.id, nextPerformanceId, party.id, beatValues, partyElementsMap)
        }
    }

    fillEmptyBeatsBySnapshots(timeline) {
        for (let i = 0; i < timeline.length; i++) {
            let nextPerformanceId = null
            if (timeline[i] === undefined) {
                nextPerformanceId = this.findNextPerformanceId(i)
                timeline[i] = new PartySnapshot(null, nextPerformanceId, null, null, null)
            } else {
            }
            console.log(i, timeline[i])
        }
    }
}
