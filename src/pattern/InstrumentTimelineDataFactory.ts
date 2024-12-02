import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData"
import {PartSnapshot} from "@/pattern/PartSnapshot"
import {PREROLL_MEASURES} from "@/settings"
import {Instrument} from "@/pattern/deserialized/Instrument"
import {Part} from "@/pattern/deserialized/Part"
import {PartElement} from "@/pattern/deserialized/PartElement"
import {PartPerformance} from "@/pattern/deserialized/PartPerformance"
import {BeatValues} from "@/pattern/BeatValues"
import {snapshotElements} from "../../tests/utils/TestUtils"

export class InstrumentTimelineDataFactory {
    instrument: Instrument
    measureBeats: number
    partsById: Map<string, Part>
    partPerformancesById: Map<string, PartPerformance>
    partElementsById: Map<string, PartElement>
    timeline: PartSnapshot[]

    constructor(
        instrument: Instrument,
        measureBeats: number
    ) {
        this.instrument = instrument
        this.measureBeats = measureBeats
        this.partsById = this.mapParts()
        this.partPerformancesById = this.mapPartPerformances()
        this.partElementsById = this.mapPartElements()
        this.timeline = this.instrumentTimeline()
    }

    get() {
        return InstrumentTimelineData.instance(this)
    }

    mapParts(): Map<string, Part> {
        const mappedParts = new Map<string, Part>()
        this.instrument.parts.forEach(p => mappedParts.set(p.id, p))
        return mappedParts
    }

    mapPartPerformances(): Map<string, PartPerformance> {
        const mappedPartyPerformances = new Map<string, PartPerformance>()
        this.instrument.partPerformances.forEach(pp => mappedPartyPerformances.set(pp.id, pp))
        return mappedPartyPerformances
    }

    mapPartElements(): Map<string, PartElement> {
        const mappedPartyElements = new Map<string, PartElement>()
        this.instrument.partElements.forEach(pe => mappedPartyElements.set(pe.id, pe))
        return mappedPartyElements
    }

    findNextPerformanceStartBeatAfterEmptySnapshot(i: number): number | null {
        const result = this.instrument.partPerformances
            .filter(pp => this.nextPerformanceSearchCriteria(this.getStartBeat(pp) - i))
            .sort((a, b) => a.start - b.start)[0]
        return result ? this.getStartBeat(result) : null
    }

    nextPerformanceSearchCriteria(beatsTillNextPerformance: number): boolean {
        const prerollBeats = this.measureBeats * PREROLL_MEASURES
        return beatsTillNextPerformance > 0 && beatsTillNextPerformance <= prerollBeats
    }

    findNextPerformanceStartBeatAfterCurrentPerformance(nextPerformanceStart: number, i: number): number | null {
        const result = this.instrument.partPerformances
            .filter(() => this.nextPerformanceSearchCriteria(nextPerformanceStart - i))
            .find(pp => this.getStartBeat(pp) === nextPerformanceStart)
        return result ? nextPerformanceStart : null
    }

    getStartBeat(partyPerformance: PartPerformance): number {
        const anacrusis = this.partsById.get(partyPerformance.partId)?.anacrusis || 0
        return (partyPerformance.start - 1) * this.measureBeats + 1 - anacrusis
    }

    getDurationInBeats(part: Part): number {
        return part.duration * this.measureBeats + part.anacrusis + part.clausula
    }

    instrumentTimeline(): PartSnapshot[] {
        const timeline: PartSnapshot[] = []
        this.instrument.partPerformances.forEach(pp => this.fillPerformanceBeatsBySnapshots(pp, timeline))
        this.fillEmptyBeatsBySnapshots(timeline)
        return timeline
    }

    fillPerformanceBeatsBySnapshots(partPerformance: PartPerformance, timeline: PartSnapshot[]) {
        const part = this.partsById.get(partPerformance.partId)
        if (!part) throw new Error(`No part found for part performance ${partPerformance}`)
        const startBeat = this.getStartBeat(partPerformance)
        const durationInBeats = this.getDurationInBeats(part)
        for (let i = startBeat; i < startBeat + durationInBeats; i++) {
            if (timeline[i]) {
                throw Error(`Party Snapshot already set for position ${i}: ${timeline[i]}`)
            }
            const partElementsMap = new Map<string, string>()
            this.getCurrentPartElements(part, i - startBeat + 1)
                .forEach(cpe => partElementsMap.set(cpe.type, cpe.id))
            const beatValues = new BeatValues(startBeat, durationInBeats)
            const nextPerformanceStartBeat = this.findNextPerformanceStartBeatAfterCurrentPerformance(startBeat + durationInBeats, i)
            timeline[i] = new PartSnapshot(partPerformance.id, nextPerformanceStartBeat, part.id, beatValues, partElementsMap)
        }
    }

    getCurrentPartElements(part: Part, currentPartBeat: number): PartElement[] {
        return this.instrument.partElements
            .filter(partElement => partElement.partId === part.id
                && partElement.start <= currentPartBeat
                && partElement.end >= currentPartBeat
            )
    }

    fillEmptyBeatsBySnapshots(timeline: PartSnapshot[]) {
        for (let i = 0; i < timeline.length; i++) {
            if (timeline[i] !== undefined) continue
            timeline[i] = new PartSnapshot(null, this.findNextPerformanceStartBeatAfterEmptySnapshot(i), null, null, snapshotElements())
        }
    }
}
