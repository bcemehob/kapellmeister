export class Party {
    id
    name = null
    duration = 0
    anacrusis = 0
    partyElements

    constructor(id, name, duration, anacrusis, clausula, partyElements) {
        this.id = id
        this.duration = duration
        this.anacrusis = anacrusis
        this.clausula = clausula
        this.partyElements = partyElements
    }
}
