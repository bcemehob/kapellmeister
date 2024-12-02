import {Measure} from "@/pattern/deserialized/Measure"
import {Instrument} from "@/pattern/deserialized/Instrument"

export class Pattern {
    name: string
    tempo: number
    duration: number
    measure: Measure
    instruments: Instrument[]

    constructor(
        name: string,
        tempo: number,
        duration: number,
        measure: Measure,
        instruments: Instrument[]
    ) {
        this.name = name
        this.tempo = tempo
        this.duration = duration
        this.measure = measure
        this.instruments = instruments
    }

    public isEmpty(): boolean {
        return this.duration === 0
    }

    public static instance(obj: any, measure: Measure, instruments: Instrument[]): Pattern {
        return new Pattern(obj.name, obj.tempo, obj.duration, measure, instruments)
    }

    public static empty(): Pattern{
        return new Pattern("", 0, 0, new Measure(0, 0), [])
    }
}
