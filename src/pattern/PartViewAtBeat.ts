export class PartViewAtBeat {
    partyName: string | null
    beatValues: any
    currentElements: any
    nextPartView: PartViewAtBeat | null
    constructor(partyName: string | null, beatValues: any, currentElements: any, nextPartView: PartViewAtBeat | null) {
        this.partyName = partyName
        this.beatValues = beatValues
        this.currentElements = currentElements
        this.nextPartView = nextPartView
    }
}
