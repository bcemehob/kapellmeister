export class Party {
    id
    name = null
    duration = 0
    anacrusis = 0
    partyElements

    constructor(id, name, duration, anacrusis, partyElements) {
        this.id = id
        this.duration = duration
        this.anacrusis = anacrusis
        this.partyElements = partyElements
    }
}
