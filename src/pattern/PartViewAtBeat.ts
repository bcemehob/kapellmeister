export class PartViewAtBeat {
    partyName: string
    beatValues: any
    currentElements: any
    nextPartView: PartViewAtBeat
    constructor(partyName: string, beatValues: any, currentElements: any, nextPartView: PartViewAtBeat) {
        this.partyName = partyName
        this.beatValues = beatValues
        this.currentElements = currentElements
        this.nextPartView = nextPartView
    }
}
