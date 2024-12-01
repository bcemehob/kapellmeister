import {BeatValues} from "@/pattern/BeatValues";
import {PartElement} from "@/pattern/deserialized/PartElement";

export class PartViewAtBeat {
    partName: string | undefined
    beatValues: BeatValues | null
    currentElements: PartElement[]
    nextPartView: PartViewAtBeat | null

    constructor(
        partName: string | undefined,
        beatValues: BeatValues | null,
        currentElements: PartElement[],
        nextPartView: PartViewAtBeat | null
    ) {
        this.partName = partName
        this.beatValues = beatValues
        this.currentElements = currentElements
        this.nextPartView = nextPartView
    }
}
