import {InstrumentTimelineDataFactory} from "@/pattern/InstrumentTimelineDataFactory"
import {PartViewAtBeat} from "@/pattern/PartViewAtBeat"
import {Instrument} from "@/pattern/Instrument"
import {Measure} from "@/pattern/Measure"
import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData"


export class InstrumentService {
    instrument: Instrument
    measure: Measure
    instrumentTimelineData: InstrumentTimelineData

    constructor(instrument: Instrument, measure: Measure) {
        this.instrument = instrument
        this.measure = measure
        this.instrumentTimelineData = new InstrumentTimelineDataFactory(this.instrument, this.measure.beats).get()
    }

    currentPart(currentBeat: number, isNextSnapshot?: boolean): PartViewAtBeat {
        const snapshot = this.instrumentTimelineData.timeline[currentBeat]
        if (!snapshot) {
            throw Error("Invalid timeline")
        }
        const nextView = isNextSnapshot || !snapshot.nextStartBeat ? null :
            this.currentPart(snapshot.nextStartBeat, true)
        if (!snapshot.partyPerformanceId) return new PartViewAtBeat(undefined, null, null, nextView)
        const currentPartName = snapshot.partId ? this.instrumentTimelineData.partsById.get(snapshot.partId)?.name : undefined
        const currentElements = Array.from(snapshot.partElementsMap.entries())
            .map(keyAndValue => this.instrumentTimelineData.partElementsById.get((<Array<string>>keyAndValue)[1]))
        return new PartViewAtBeat(currentPartName, snapshot.beatValues, currentElements, nextView)
    }

}
