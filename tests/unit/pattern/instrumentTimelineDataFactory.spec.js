import instrumentTimelineDataFactory from "@/pattern/instrumentTimelineDataFactory"
import {Instrument} from "@/pattern/Instrument";
import {v4 as uuidv4} from 'uuid'
import {Party} from "@/pattern/Party";
import {PartyPerformance} from "@/pattern/PartyPerformance";
import {PartyElement} from "@/pattern/PartyElement";
import {PartySnapshot} from "@/pattern/PartySnapshot";

describe('instrumentTimelineDataFactory', () => {
    const party1 = new Party(uuidv4(), 'party1', 2, 0, 0)
    const party2 = new Party(uuidv4(), 'party2', 2, 0, 0)
    const party1Performance1 = new PartyPerformance(uuidv4(),1, party1.id)
    const party1Performance2 = new PartyPerformance(uuidv4(),5, party1.id)
    const party2Performance1 = new PartyPerformance(uuidv4(),3, party2.id)
    const party2Performance2 = new PartyPerformance(uuidv4(),8, party2.id)
    const party2Element1 = new PartyElement(uuidv4(), party2.id, 'CHORDS', 1, 4, 'Am', null)
    const party2Element2 = new PartyElement(uuidv4(), party2.id, 'CHORDS', 5, 2, 'E', null)
    const party2Element3 = new PartyElement(uuidv4(), party2.id, 'LYRICS', 5, 4, 'Foo', null)
    const instrument = new Instrument(
        uuidv4(),
        'instrument',
        [party1Performance1, party1Performance2, party2Performance1, party2Performance2],
        [party1, party2],
        [party2Element1, party2Element2, party2Element3])

    const mappedParties = () => {
        const result = {}
        result[party1.id] = party1
        result[party2.id] = party2
        return result
    }

    const mappedPartyPerformances = () => {
        const result = {}
        result[party1Performance1.id] = party1Performance1
        result[party1Performance2.id] = party1Performance2
        result[party2Performance1.id] = party2Performance1
        result[party2Performance2.id] = party2Performance2
        return result
    }

    const mappedPartyElements = () => {
        const result = {}
        result[party2Element1.id] = party2Element1
        result[party2Element2.id] = party2Element2
        result[party2Element3.id] = party2Element3
        return result
    }

    it('can map parties by ids', () => {
        expect(instrumentTimelineDataFactory.mapParties(instrument.parties)).toEqual(mappedParties())
    })
    it('can map party performances by ids', () => {
        expect(instrumentTimelineDataFactory.mapPartyPerformances(instrument.partyPerformances))
            .toEqual(mappedPartyPerformances())
    })
    it('can map party elements by ids', () => {
        expect(instrumentTimelineDataFactory.mapPartyElements(instrument.partyElements)).toEqual(mappedPartyElements())
    })
    it('can createTimeline', () => {
        expect(instrumentTimelineDataFactory.instrumentTimeline(instrument, mappedParties(), 4))
            .toEqual(expectedTimeline)
    })


    const expectedTimeline = [
        null,
        new PartySnapshot(party1Performance1.id, party1.id, {}),
        new PartySnapshot(party1Performance1.id, party1.id, {}),
        new PartySnapshot(party1Performance1.id, party1.id, {}),
        new PartySnapshot(party1Performance1.id, party1.id, {}),
        new PartySnapshot(party1Performance1.id, party1.id, {}),
        new PartySnapshot(party1Performance1.id, party1.id, {}),
        new PartySnapshot(party1Performance1.id, party1.id, {}),
        new PartySnapshot(party1Performance1.id, party1.id, {}),

        new PartySnapshot(party2Performance1.id, party2.id, {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance1.id, party2.id, {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance1.id, party2.id, {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance1.id, party2.id, {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance1.id, party2.id, {'CHORDS':party2Element2.id, 'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance1.id, party2.id, {'CHORDS':party2Element2.id, 'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance1.id, party2.id, {'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance1.id, party2.id, {'LYRICS':party2Element3.id}),

        new PartySnapshot(party1Performance2.id, party1.id, {}),
        new PartySnapshot(party1Performance2.id, party1.id, {}),
        new PartySnapshot(party1Performance2.id, party1.id, {}),
        new PartySnapshot(party1Performance2.id, party1.id, {}),
        new PartySnapshot(party1Performance2.id, party1.id, {}),
        new PartySnapshot(party1Performance2.id, party1.id, {}),
        new PartySnapshot(party1Performance2.id, party1.id, {}),
        new PartySnapshot(party1Performance2.id, party1.id, {}),

        null,
        null,
        null,
        null,

        new PartySnapshot(party2Performance2.id, party2.id, {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance2.id, party2.id, {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance2.id, party2.id, {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance2.id, party2.id, {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance2.id, party2.id, {'CHORDS':party2Element2.id, 'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance2.id, party2.id, {'CHORDS':party2Element2.id, 'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance2.id, party2.id, {'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance2.id, party2.id, {'LYRICS':party2Element3.id}),
    ]
})
