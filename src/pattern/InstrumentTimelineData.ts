import {PartSnapshot} from "@/pattern/PartSnapshot";
import {Part} from "@/pattern/Part";
import {PartPerformance} from "@/pattern/PartPerformance";
import {PartElement} from "@/pattern/PartElement";

export class InstrumentTimelineData {
    timeline: PartSnapshot[]
    partsById: Map<string, Part>
    partPerformancesById: Map<string, PartPerformance>
    partElementsById: Map<string, PartElement>
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