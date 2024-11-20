export class Part {
    id
    name = null
    duration = 0
    anacrusis = 0

    constructor(id, name, duration, anacrusis, clausula) {
        this.id = id
        this.name = name
        this.duration = duration
        this.anacrusis = anacrusis
        this.clausula = clausula
    }
}
