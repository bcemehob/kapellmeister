import {Pattern} from "@/pattern/Pattern"
import {Measure} from "@/pattern/Measure"
import {Instrument} from "@/pattern/Instrument"
import {PartPerformance} from "@/pattern/PartPerformance"
import {Part} from "@/pattern/Part"
import {PartElement} from "@/pattern/PartElement"

export class PatternParser {
    parse(patternJson) {
        const rawPattern = JSON.parse(patternJson)
        const measure = new Measure(rawPattern.measure.base, rawPattern.measure.beats)
        const instruments = this.parseInstruments(rawPattern.instruments)
        return new Pattern(rawPattern.name, rawPattern.tempo, rawPattern.duration, measure, instruments)
    }

    parseInstruments(rawInstruments) {
        const instruments = []
        if (!rawInstruments || !rawInstruments.length) return instruments
        rawInstruments.forEach(rawInstrument => instruments.push(this.parseInstrument(rawInstrument)))
        return instruments
    }

    parseInstrument(rawInstrument) {
        const partyPerformances = this.parsePartyPerformances(rawInstrument.partPerformances)
        const parties = this.parseParts(rawInstrument.parts)
        const partyElements = this.parsePartyElements(rawInstrument.partElements)
        return new Instrument(rawInstrument.id, rawInstrument.name, partyPerformances, parties, partyElements)
    }

    parsePartyPerformances(rawPartyPerformances) {
        const partyPerformances = []
        if (!rawPartyPerformances || !rawPartyPerformances.length) return partyPerformances
        rawPartyPerformances
            .forEach(rawPartyPerformance => partyPerformances.push(PartPerformance.instance(rawPartyPerformance)))
        return partyPerformances
    }

    parseParts(rawParties) {
        const parties = []
        if (!rawParties || !rawParties.length) return parties
        rawParties.forEach(party => parties.push(Part.instance(party)))
        return parties
    }

    parsePartyElements(rawPartyElements) {
        const partyElements = []
        if (!rawPartyElements || !rawPartyElements.length) return partyElements
        rawPartyElements.forEach(raw => partyElements.push(PartElement.instance(raw)))
        return partyElements
    }
}
