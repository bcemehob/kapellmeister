export class PartSnapshot {
    partyPerformanceId: string
    nextStartBeat: number
    partId: string
    beatValues: any
    partElementsMap: any
    constructor(partyPerformanceId: string, nextStartBeat: number, partId: string, beatValues: any, partElementsMap: any) {
        this.partyPerformanceId = partyPerformanceId
        this.nextStartBeat = nextStartBeat
        this.partId = partId
        this.beatValues = beatValues
        this.partElementsMap = partElementsMap
    }
}
