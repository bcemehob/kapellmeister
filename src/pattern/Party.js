export class Party {
    id
    name = null
    duration = 0
    anacrusis = 0

    constructor(id, name, duration, anacrusis, clausula) {
        this.id = id
        this.duration = duration
        this.anacrusis = anacrusis
        this.clausula = clausula
    }
}
