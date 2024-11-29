export class PartSnapshot {
    partyPerformanceId: string | null
    nextStartBeat: number | null
    partId: string | null
    beatValues: any | null
    partElementsMap: any | null
    constructor(
        partyPerformanceId: string | null,
        nextStartBeat: number | null,
        partId: string | null,
        beatValues: any | null,
        partElementsMap: any | null
    ) {
        this.partyPerformanceId = partyPerformanceId
        this.nextStartBeat = nextStartBeat
        this.partId = partId
        this.beatValues = beatValues
        this.partElementsMap = partElementsMap
    }
}
