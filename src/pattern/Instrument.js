export class Instrument {
    id
    name
    partPerformances
    parts

    constructor(id, name, partyPerformances, parties, partyElements) {
        this.id = id
        this.name = name
        this.partPerformances = partyPerformances
        this.parts = parties
        this.partElements = partyElements
    }
}
