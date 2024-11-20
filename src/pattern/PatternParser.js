import {Pattern} from "@/pattern/Pattern"
import {Measure} from "@/pattern/Measure"
import {Instrument} from "@/pattern/Instrument"
import {PartPerformance} from "@/pattern/PartPerformance"
import {Part} from "@/pattern/Part"
import {PartyElement} from "@/pattern/PartyElement"

export class PatternParser {
    parse(patternJson) {
        const rawPattern = JSON.parse(patternJson)
        const measure = Object.assign(new Measure(), rawPattern.measure)
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
        const partyPerformances = this.parsePartyPerformances(rawInstrument.partyPerformances)
        const parties = this.parseParties(rawInstrument.parties)
        const partyElements = this.parsePartyElements(rawInstrument.partyElements)
        return new Instrument(rawInstrument.id, rawInstrument.name, partyPerformances, parties, partyElements)
    }

    parsePartyPerformances(rawPartyPerformances) {
        const partyPerformances = []
        if (!rawPartyPerformances || !rawPartyPerformances.length) return partyPerformances
        rawPartyPerformances
            .forEach(rawPartyPerformance => partyPerformances.push(
                new PartPerformance(rawPartyPerformance.id, rawPartyPerformance.start, rawPartyPerformance.partyId))
            )
        return partyPerformances
    }

    parseParties(rawParties) {
        const parties = []
        if (!rawParties || !rawParties.length) return parties
        rawParties.forEach(party => parties.push(new Part(party.id, party.name, party.duration, party.anacrusis, party.clausula)))
        return parties
    }

    parsePartyElements(rawPartyElements) {
        const partyElements = []
        if (!rawPartyElements || !rawPartyElements.length) return partyElements
        rawPartyElements.forEach(raw => partyElements.push(Object.assign(new PartyElement(), raw)))
        return partyElements
    }
}
