import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData";
import {PartySnapshot} from "@/pattern/PartySnapshot";

const instrumentTimelineDataFactory = {
    generateInstrumentTimeline: function (instrument, measureBeats) {
        const partiesById = this.mapParties(instrument.parties)
        const partyPerformancesById = this.mapPartyPerformances(instrument.partyPerformances)
        const partyElementsById = this.mapPartyElements(instrument.partyElements)
        const timeline = this.instrumentTimeline(instrument, partiesById, measureBeats)
        return new InstrumentTimelineData(timeline, partiesById, partyPerformancesById, partyElementsById)
    },
    mapParties: parties => {
        const mappedParties = {}
        parties.forEach(p => mappedParties[p.id] = p)
        return mappedParties
    },
    mapPartyPerformances: partyPerformances => {
        const mappedPartyPerformances = {}
        partyPerformances.forEach(pp => mappedPartyPerformances[pp.id] = pp)
        return mappedPartyPerformances
    },
    mapPartyElements: partyElements => {
        const mappedPartyElements = {}
        partyElements.forEach(pp => mappedPartyElements[pp.id] = pp)
        return mappedPartyElements
    },
    instrumentTimeline(instrument, partiesById, measureBeats) {
        const timeline = []
        instrument.partyPerformances.forEach(pp => {
                const party = partiesById[pp.partyId]
                const startBeat = (pp.start - 1) * measureBeats + 1 - party.anacrusis
                const durationInBeats = party.duration * measureBeats + party.anacrusis + party.clausula
                for (let i = startBeat; i < startBeat + durationInBeats; i++) {
                    if (timeline[i]) {
                        throw Error(`Party Snapshot already set for postion ${i}:`, timeline[i])
                    }
                    const currentBeatOfParty = i - startBeat + 1
                    const currentPartyElements = instrument.partyElements
                        .filter(partyElement => partyElement.partyId === party.id
                            && partyElement.start <= currentBeatOfParty
                            && partyElement.end() >= currentBeatOfParty
                        )
                    const partyElementsMap = {}
                    currentPartyElements.forEach(cpe => partyElementsMap[cpe.type] = cpe.id)
                    timeline[i] = new PartySnapshot(pp.id, party.id, partyElementsMap)
                }
            }
        )
        for (let i = 0; i < timeline.length; i++) {
            if (timeline[i] === undefined) timeline[i] = null
        }
        return timeline
    }
}

export default instrumentTimelineDataFactory
