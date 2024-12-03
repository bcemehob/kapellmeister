import {Pattern} from "@/pattern/deserialized/Pattern"
import {Measure} from "@/pattern/deserialized/Measure"
import {Instrument} from "@/pattern/deserialized/Instrument"
import {PartPerformance} from "@/pattern/deserialized/PartPerformance"
import {Part} from "@/pattern/deserialized/Part"
import {PartElement} from "@/pattern/deserialized/PartElement"

export class PatternMapper {
    map(rawPattern: any): Pattern {
        const measure: Measure = new Measure(rawPattern.measure.base, rawPattern.measure.beats)
        const instruments: Instrument[] = this.mapInstruments(rawPattern.instruments)
        return Pattern.instance(rawPattern, measure, instruments)
    }

    private mapInstruments(rawInstruments: any[]): Instrument[] {
        const instruments: Instrument[] = []
        if (!rawInstruments || !rawInstruments.length) return instruments
        rawInstruments.forEach(rawInstrument => instruments.push(this.mapInstrument(rawInstrument)))
        return instruments
    }

    private mapInstrument(rawInstrument: any): Instrument {
        const partPerformances: PartPerformance[] = this.mapPartyPerformances(rawInstrument.partPerformances)
        const parts: Part[] = this.mapParts(rawInstrument.parts)
        const partElements: PartElement[] = this.mapPartyElements(rawInstrument.partElements)
        return new Instrument(rawInstrument.id, rawInstrument.name, partPerformances, parts, partElements)
    }

    private mapPartyPerformances(rawPartyPerformances: any[]): PartPerformance[] {
        const partyPerformances: PartPerformance[] = []
        if (!rawPartyPerformances || !rawPartyPerformances.length) return partyPerformances
        rawPartyPerformances
            .forEach(rawPartyPerformance => partyPerformances.push(PartPerformance.instance(rawPartyPerformance)))
        return partyPerformances
    }

    private mapParts(rawParts: any[]): Part[] {
        const parts: Part[] = []
        if (!rawParts || !rawParts.length) return parts
        rawParts.forEach(party => parts.push(Part.instance(party)))
        return parts
    }

    private mapPartyElements(rawPartElements: any[]): PartElement[] {
        const partElements: PartElement[] = []
        if (!rawPartElements || !rawPartElements.length) return partElements
        rawPartElements.forEach(raw => partElements.push(PartElement.instance(raw)))
        return partElements
    }
}
