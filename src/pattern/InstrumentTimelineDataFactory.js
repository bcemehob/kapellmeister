import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData"
import {PartSnapshot} from "@/pattern/PartSnapshot"
import {PREROLL_MEASURES} from "@/settings"

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

    findNextPerformanceIdAfterEmptySnapshot(i) {
        const result = this.instrument.partyPerformances
            .filter(pp => this.nextPerformanceSearchCriteria(this.getStartBeat(pp) - i))
            .sort((a, b) => a.start - b.start)[0]
        return result ? this.getStartBeat(result) : null
    }

    nextPerformanceSearchCriteria(beatsTillNextPerformance) {
        const prerollBeats = this.measureBeats * PREROLL_MEASURES
        return beatsTillNextPerformance > 0 && beatsTillNextPerformance <= prerollBeats
    }

    findNextPerformanceIdAfterCurrentPerformance(nextPerformanceStart, i) {
        const result = this.instrument.partyPerformances
            .filter(_ => this.nextPerformanceSearchCriteria(nextPerformanceStart - i))
            .find(pp => this.getStartBeat(pp) === nextPerformanceStart)
        return result ? nextPerformanceStart : null
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
            const partyElementsMap = {}
            this.getCurrentPartyElements(party, i - startBeat + 1)
                .forEach(cpe => partyElementsMap[cpe.type] = cpe.id)
            const beatValues = {start: startBeat, duration: durationInBeats}
            const nextPerformanceId = this.findNextPerformanceIdAfterCurrentPerformance(startBeat + durationInBeats, i)
            timeline[i] = new PartSnapshot(partyPerformance.id, nextPerformanceId, party.id, beatValues, partyElementsMap)
        }
    }

    getCurrentPartyElements(party, currentPartyBeat) {
        return this.instrument.partyElements
            .filter(partyElement => partyElement.partyId === party.id
                && partyElement.start <= currentPartyBeat
                && partyElement.end() >= currentPartyBeat
            )
    }

    fillEmptyBeatsBySnapshots(timeline) {
        for (let i = 0; i < timeline.length; i++) {
            if (timeline[i] !== undefined) continue
            timeline[i] = new PartSnapshot(null, this.findNextPerformanceIdAfterEmptySnapshot(i), null, null, null)
        }
    }
}
