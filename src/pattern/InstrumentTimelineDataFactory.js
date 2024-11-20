import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData"
import {PartSnapshot} from "@/pattern/PartSnapshot"
import {PREROLL_MEASURES} from "@/settings"

export class InstrumentTimelineDataFactory {
    constructor(instrument, measureBeats) {
        this.instrument = instrument
        this.measureBeats = measureBeats
        this.partsById = this.mapParts()
        this.partPerformancesById = this.mapPartPerformances()
        this.partElementsById = this.mapPartElements()
        this.timeline = this.instrumentTimeline()
    }

    get() {
        return new InstrumentTimelineData(this.timeline, this.partsById, this.partPerformancesById, this.partElementsById)
    }

    mapParts() {
        const mappedParts = {}
        this.instrument.parties.forEach(p => mappedParts[p.id] = p)
        return mappedParts
    }

    mapPartPerformances() {
        const mappedPartyPerformances = {}
        this.instrument.partyPerformances.forEach(pp => mappedPartyPerformances[pp.id] = pp)
        return mappedPartyPerformances
    }

    mapPartElements() {
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
        return (partyPerformance.start - 1) * this.measureBeats + 1 - this.partsById[partyPerformance.partyId].anacrusis
    }

    getDurationInBeats(part) {
        return part.duration * this.measureBeats + part.anacrusis + part.clausula
    }

    instrumentTimeline() {
        const timeline = []
        this.instrument.partyPerformances.forEach(pp => this.fillPerformanceBeatsBySnapshots(pp, timeline))
        this.fillEmptyBeatsBySnapshots(timeline)
        return timeline
    }

    fillPerformanceBeatsBySnapshots(partPerformance, timeline) {
        const part = this.partsById[partPerformance.partyId]
        const startBeat = this.getStartBeat(partPerformance)
        const durationInBeats = this.getDurationInBeats(part)
        for (let i = startBeat; i < startBeat + durationInBeats; i++) {
            if (timeline[i]) {
                throw Error(`Party Snapshot already set for position ${i}:`, timeline[i])
            }
            const partElementsMap = {}
            this.getCurrentPartElements(part, i - startBeat + 1)
                .forEach(cpe => partElementsMap[cpe.type] = cpe.id)
            const beatValues = {start: startBeat, duration: durationInBeats}
            const nextPerformanceId = this.findNextPerformanceIdAfterCurrentPerformance(startBeat + durationInBeats, i)
            timeline[i] = new PartSnapshot(partPerformance.id, nextPerformanceId, part.id, beatValues, partElementsMap)
        }
    }

    getCurrentPartElements(part, currentPartBeat) {
        return this.instrument.partyElements
            .filter(partElement => partElement.partyId === part.id
                && partElement.start <= currentPartBeat
                && partElement.end() >= currentPartBeat
            )
    }

    fillEmptyBeatsBySnapshots(timeline) {
        for (let i = 0; i < timeline.length; i++) {
            if (timeline[i] !== undefined) continue
            timeline[i] = new PartSnapshot(null, this.findNextPerformanceIdAfterEmptySnapshot(i), null, null, null)
        }
    }
}
