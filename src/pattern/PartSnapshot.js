export class PartSnapshot {
    constructor(partyPerformanceId, nextStartBeat, partId, beatValues, partElementsMap) {
        this.partyPerformanceId = partyPerformanceId
        this.nextStartBeat = nextStartBeat
        this.partId = partId
        this.beatValues = beatValues
        this.partElementsMap = partElementsMap
    }
}
