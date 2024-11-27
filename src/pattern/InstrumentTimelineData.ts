import {PartSnapshot} from "@/pattern/PartSnapshot";

export class InstrumentTimelineData {
    timeline: PartSnapshot[]
    partsById: any
    partPerformancesById: any
    partElementsById: any
    constructor(timeline: PartSnapshot[], partsById: any, partPerformancesById:any, partElementsById: any) {
        this.timeline = timeline
        this.partsById = partsById
        this.partPerformancesById = partPerformancesById
        this.partElementsById = partElementsById
    }

    public static instance(obj: any): InstrumentTimelineData {
        return new InstrumentTimelineData(obj.timeline, obj.partsById, obj.partPerformancesById, obj.partElementsById)
    }
}
