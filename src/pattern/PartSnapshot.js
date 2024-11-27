export class PartSnapshot {
    constructor(partyPerformanceId, nextStartBeat, partId, beatValues, partyElementsMap) {
        this.partyPerformanceId = partyPerformanceId
        this.nextStartBeat = nextStartBeat
        this.partId = partId
        this.beatValues = beatValues
        this.partyElementsMap = partyElementsMap
    }
}
