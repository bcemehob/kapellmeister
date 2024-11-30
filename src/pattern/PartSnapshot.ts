import {BeatValues} from "@/pattern/BeatValues";

export class PartSnapshot {
    partyPerformanceId: string | null
    nextStartBeat: number | null
    partId: string | null
    beatValues: BeatValues | null
    partElementsMap: Map<string, string>

    constructor(
        partyPerformanceId: string | null,
        nextStartBeat: number | null,
        partId: string | null,
        beatValues: BeatValues | null,
        partElementsMap: Map<string, string>
    ) {
        this.partyPerformanceId = partyPerformanceId
        this.nextStartBeat = nextStartBeat
        this.partId = partId
        this.beatValues = beatValues
        this.partElementsMap = partElementsMap
    }
}
