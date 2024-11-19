export class PartySnapshot {
    constructor(partyPerformanceId, nextPerformanceId, partyId, beatValues, partyElementsMap) {
        this.partyPerformanceId = partyPerformanceId
        this.next = nextPerformanceId
        this.partyId = partyId
        this.beatValues = beatValues
        this.partyElementsMap = partyElementsMap
    }
}
