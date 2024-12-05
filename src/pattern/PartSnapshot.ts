import {BeatValues} from "@/pattern/BeatValues";
import {PartElementsSnapshot} from "@/pattern/PartElementsSnapshot";

export class PartSnapshot {
    partyPerformanceId: string | null
    nextStartBeat: number | null
    partId: string | null
    beatValues: BeatValues | null
    partElementsMap: Map<string, string>
    partsElementsSnapshot: PartElementsSnapshot | null

    constructor(
        partyPerformanceId: string | null,
        nextStartBeat: number | null,
        partId: string | null,
        beatValues: BeatValues | null,
        partElementsMap: Map<string, string>,
        partElementsSnapshot: PartElementsSnapshot | null
    ) {
        this.partyPerformanceId = partyPerformanceId
        this.nextStartBeat = nextStartBeat
        this.partId = partId
        this.beatValues = beatValues
        this.partElementsMap = partElementsMap
        this.partsElementsSnapshot = partElementsSnapshot
    }
}
