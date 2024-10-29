import {Pattern} from "@/pattern/Pattern"
import {Measure} from "@/pattern/Measure"
import {Instrument} from "@/pattern/Instrument"
import {PartyPerformance} from "@/pattern/PartyPerformance"
import {Party} from "@/pattern/Party"
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
        return new Instrument(rawInstrument.id, rawInstrument.name, partyPerformances, parties)
    }

    parsePartyPerformances(rawPartyPerformances) {
        const partyPerformances = []
        if (!rawPartyPerformances || !rawPartyPerformances.length) return partyPerformances
        rawPartyPerformances
            .forEach(rawPartyPerformance => partyPerformances.push(
                new PartyPerformance(rawPartyPerformance.start, rawPartyPerformance.partyId))
            )
        return partyPerformances
    }

    parseParties(rawParties) {
        const parties = []
        if (!rawParties || !rawParties.length) return parties
        rawParties.forEach(party => parties.push(this.parseParty(party)))
        return parties
    }

    parseParty(party) {
        const partyElements = this.parsePartyElements(party.partyElements)
        return new Party(party.id, party.name, party.duration, party.anacrusis, party.clausula, partyElements)
    }

    parsePartyElements(rawPartyElements) {
        const partyElements = []
        if (!rawPartyElements || !rawPartyElements.length) return partyElements
        rawPartyElements.forEach(raw => partyElements.push(Object.assign(new PartyElement(), raw)))
        return partyElements
    }
}
