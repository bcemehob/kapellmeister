export class Instrument {
    id
    name
    partyPerformances
    parties

    constructor(id, name, partyPerformances, parties) {
        this.id = id
        this.name = name
        this.partyPerformances = partyPerformances
        this.parties = parties
    }
}
