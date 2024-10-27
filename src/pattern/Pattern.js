export class Pattern {
    name
    tempo = 0
    duration = 0
    measure = {}
    instruments = []
    constructor(name, tempo, duration, measure, instruments) {
        this.name = name
        this.tempo = tempo
        this.duration = duration
        this.measure = measure
        this.instruments = instruments
    }
}
