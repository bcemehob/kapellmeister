import {BeatValues} from "@/pattern/BeatValues";
import {PartElement} from "@/pattern/PartElement";

export class PartViewAtBeat {
    partyName: string | undefined
    beatValues: BeatValues | null
    currentElements: PartElement[]
    nextPartView: PartViewAtBeat | null

    constructor(
        partyName: string | undefined,
        beatValues: BeatValues | null,
        currentElements: PartElement[],
        nextPartView: PartViewAtBeat | null
    ) {
        this.partyName = partyName
        this.beatValues = beatValues
        this.currentElements = currentElements
        this.nextPartView = nextPartView
    }
}
