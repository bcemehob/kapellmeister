export class Instrument {
    id
    name
    partyPerformances
    parties

    constructor(id, name, partyPerformances, parties, partyElements) {
        this.id = id
        this.name = name
        this.partyPerformances = partyPerformances
        this.parties = parties
        this.partyElements = partyElements
    }
}
