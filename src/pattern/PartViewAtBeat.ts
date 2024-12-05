import {BeatValues} from "@/pattern/BeatValues";
import {PartElement} from "@/pattern/deserialized/PartElement";
import {PartElementsSnapshot} from "@/pattern/PartElementsSnapshot";

export class PartViewAtBeat {
    partName: string | undefined
    beatValues: BeatValues | null
    currentElements: PartElement[]
    partsElementsSnapshot: PartElementsSnapshot | null
    nextPartView: PartViewAtBeat | null

    constructor(
        partName: string | undefined,
        beatValues: BeatValues | null,
        currentElements: PartElement[],
        partsElementsSnapshot: PartElementsSnapshot | null,
        nextPartView: PartViewAtBeat | null,
    ) {
        this.partName = partName
        this.beatValues = beatValues
        this.currentElements = currentElements
        this.partsElementsSnapshot = partsElementsSnapshot
        this.nextPartView = nextPartView
    }
}
