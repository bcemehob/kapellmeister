import {Measure} from "@/pattern/Measure";
import {Instrument} from "@/pattern/Instrument";

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

    public static instance(obj: any, measure: Measure, instruments: Instrument[]): Pattern {
        return new Pattern(obj.name, obj.tempo, obj.duration, measure, instruments)
    }
}
