import {InstrumentTimelineDataFactory} from "@/pattern/InstrumentTimelineDataFactory";
import {PartViewAtBeat} from "@/pattern/PartViewAtBeat";
import {Instrument} from "@/pattern/Instrument";
import {Measure} from "@/pattern/Measure";
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
        if (!snapshot.partyPerformanceId) return new PartViewAtBeat(null, null, null, nextView)
        const currentPart = this.instrumentTimelineData.partsById[snapshot.partId]
        const currentElements = Object.values(snapshot.partElementsMap)
            .map(elemId => this.instrumentTimelineData.partElementsById[<string> elemId])
        return new PartViewAtBeat(currentPart.name, snapshot.beatValues, currentElements, nextView)
    }

}
