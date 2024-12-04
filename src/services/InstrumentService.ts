import {InstrumentTimelineDataFactory} from "@/pattern/InstrumentTimelineDataFactory"
import {PartViewAtBeat} from "@/pattern/PartViewAtBeat"
import {Instrument} from "@/pattern/deserialized/Instrument"
import {Measure} from "@/pattern/deserialized/Measure"
import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData"
import {PartElement} from "@/pattern/deserialized/PartElement"
import {v4 as uuidv4} from 'uuid'
import {PartSnapshot} from "@/pattern/PartSnapshot";

export const generateUUID = () => {
    return uuidv4()
}
export class InstrumentService {
    instrument: Instrument
    measure: Measure
    instrumentTimelineData: InstrumentTimelineData

    constructor(
        instrument: Instrument,
        measure: Measure
    ) {
        this.instrument = instrument
        this.measure = measure
        this.instrumentTimelineData = new InstrumentTimelineDataFactory(this.instrument, this.measure.beats).get()
    }

    currentPart(currentBeat: number, isNextSnapshot?: boolean): PartViewAtBeat {
        const snapshot: PartSnapshot = this.instrumentTimelineData.timeline[currentBeat]
        if (!snapshot) {
            throw Error("Invalid timeline")
        }
        const nextView: PartViewAtBeat | null = isNextSnapshot || !snapshot.nextStartBeat ? null :
            this.currentPart(snapshot.nextStartBeat, true)
        if (!snapshot.partyPerformanceId) return new PartViewAtBeat(undefined, null, [], nextView)
        const currentPartName = snapshot.partId ? this.instrumentTimelineData.partsById.get(snapshot.partId)?.name : undefined
        const currentPartElements: PartElement[] = []
        snapshot.partElementsMap.forEach((partElementId: string) => { // value
            const partElement = this.instrumentTimelineData.partElementsById.get(partElementId)
            !!partElement && currentPartElements.push(partElement)
        })
        return new PartViewAtBeat(currentPartName, snapshot.beatValues, currentPartElements, nextView)
    }

}
