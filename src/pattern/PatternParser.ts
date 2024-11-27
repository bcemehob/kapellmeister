import {Pattern} from "@/pattern/Pattern"
import {Measure} from "@/pattern/Measure"
import {Instrument} from "@/pattern/Instrument"
import {PartPerformance} from "@/pattern/PartPerformance"
import {Part} from "@/pattern/Part"
import {PartElement} from "@/pattern/PartElement"

export class PatternParser {
    parse(patternJson: string): Pattern {
        const rawPattern = JSON.parse(patternJson)
        const measure: Measure = new Measure(rawPattern.measure.base, rawPattern.measure.beats)
        const instruments: Instrument[] = this.parseInstruments(rawPattern.instruments)
        return Pattern.instance(rawPattern, measure, instruments)
    }

    parseInstruments(rawInstruments: any[]): Instrument[] {
        const instruments: Instrument[] = []
        if (!rawInstruments || !rawInstruments.length) return instruments
        rawInstruments.forEach(rawInstrument => instruments.push(this.parseInstrument(rawInstrument)))
        return instruments
    }

    parseInstrument(rawInstrument: any): Instrument {
        const partPerformances: PartPerformance[] = this.parsePartyPerformances(rawInstrument.partPerformances)
        const parts: Part[] = this.parseParts(rawInstrument.parts)
        const partElements: PartElement[] = this.parsePartyElements(rawInstrument.partElements)
        return new Instrument(rawInstrument.id, rawInstrument.name, partPerformances, parts, partElements)
    }

    parsePartyPerformances(rawPartyPerformances: any[]): PartPerformance[] {
        const partyPerformances: PartPerformance[] = []
        if (!rawPartyPerformances || !rawPartyPerformances.length) return partyPerformances
        rawPartyPerformances
            .forEach(rawPartyPerformance => partyPerformances.push(PartPerformance.instance(rawPartyPerformance)))
        return partyPerformances
    }

    parseParts(rawParts: any[]): Part[] {
        const parts: Part[] = []
        if (!rawParts || !rawParts.length) return parts
        rawParts.forEach(party => parts.push(Part.instance(party)))
        return parts
    }

    parsePartyElements(rawPartElements: any[]): PartElement[] {
        const partElements: PartElement[] = []
        if (!rawPartElements || !rawPartElements.length) return partElements
        rawPartElements.forEach(raw => partElements.push(PartElement.instance(raw)))
        return partElements
    }
}
