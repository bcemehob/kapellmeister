export class PartViewAtBeat {
    partyName: string | undefined
    beatValues: any
    currentElements: any
    nextPartView: PartViewAtBeat | null
    constructor(partyName: string | undefined, beatValues: any, currentElements: any, nextPartView: PartViewAtBeat | null) {
        this.partyName = partyName
        this.beatValues = beatValues
        this.currentElements = currentElements
        this.nextPartView = nextPartView
    }
}
