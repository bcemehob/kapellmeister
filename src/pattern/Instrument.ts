import {PartPerformance} from "@/pattern/PartPerformance";
import {Part} from "@/pattern/Part";
import {PartElement} from "@/pattern/PartElement";

export class Instrument {
    id: string | null
    name: string
    partPerformances: PartPerformance[]
    parts: Part[]
    partElements: PartElement[]

    constructor(id: string | null, name:string, partyPerformances: PartPerformance[], parts: Part[], partyElements: PartElement[]) {
        this.id = id
        this.name = name
        this.partPerformances = partyPerformances
        this.parts = parts
        this.partElements = partyElements
    }
}
