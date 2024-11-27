export class Instrument {
    id
    name
    partPerformances
    parts

    constructor(id, name, partyPerformances, parts, partyElements) {
        this.id = id
        this.name = name
        this.partPerformances = partyPerformances
        this.parts = parts
        this.partElements = partyElements
    }
}
