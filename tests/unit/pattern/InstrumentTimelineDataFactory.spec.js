import {InstrumentTimelineDataFactory} from "@/pattern/instrumentTimelineDataFactory"
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
    const party2Performance2 = new PartyPerformance(uuidv4(),9, party2.id)
    const party2Element1 = new PartyElement(uuidv4(), party2.id, 'CHORDS', 1, 4, 'Am', null)
    const party2Element2 = new PartyElement(uuidv4(), party2.id, 'CHORDS', 5, 2, 'E', null)
    const party2Element3 = new PartyElement(uuidv4(), party2.id, 'LYRICS', 5, 4, 'Foo', null)
    const instrument = new Instrument(
        uuidv4(),
        'instrument',
        [party1Performance1, party1Performance2, party2Performance1, party2Performance2],
        [party1, party2],
        [party2Element1, party2Element2, party2Element3])

    const instrumentTimelineDataFactory = new InstrumentTimelineDataFactory(instrument, 4)

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
        expect(instrumentTimelineDataFactory.mapParties()).toEqual(mappedParties())
    })
    it('can map party performances by ids', () => {
        expect(instrumentTimelineDataFactory.mapPartyPerformances())
            .toEqual(mappedPartyPerformances())
    })
    it('can map party elements by ids', () => {
        expect(instrumentTimelineDataFactory.mapPartyElements()).toEqual(mappedPartyElements())
    })
    it('can create Timeline', () => {
        expect(instrumentTimelineDataFactory.instrumentTimeline())
            .toEqual(expectedTimeline)
    })

    const beatValues = (start, duration) => ({start, duration})

    const expectedTimeline = [
        new PartySnapshot(null, party1Performance1.id, null, null, null),

        new PartySnapshot(party1Performance1.id, party2Performance1.id, party1.id, beatValues(1,8), {}),
        new PartySnapshot(party1Performance1.id, party2Performance1.id, party1.id, beatValues(1,8), {}),
        new PartySnapshot(party1Performance1.id, party2Performance1.id, party1.id, beatValues(1,8), {}),
        new PartySnapshot(party1Performance1.id, party2Performance1.id, party1.id, beatValues(1,8), {}),

        new PartySnapshot(party1Performance1.id, party2Performance1.id, party1.id, beatValues(1,8), {}),
        new PartySnapshot(party1Performance1.id, party2Performance1.id, party1.id, beatValues(1,8), {}),
        new PartySnapshot(party1Performance1.id, party2Performance1.id, party1.id, beatValues(1,8), {}),
        new PartySnapshot(party1Performance1.id, party2Performance1.id, party1.id, beatValues(1,8), {}),

        new PartySnapshot(party2Performance1.id, party1Performance2.id, party2.id, beatValues(9,8), {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance1.id, party1Performance2.id, party2.id, beatValues(9,8), {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance1.id, party1Performance2.id, party2.id, beatValues(9,8), {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance1.id, party1Performance2.id, party2.id, beatValues(9,8), {'CHORDS':party2Element1.id}),

        new PartySnapshot(party2Performance1.id, party1Performance2.id, party2.id, beatValues(9,8), {'CHORDS':party2Element2.id, 'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance1.id, party1Performance2.id, party2.id, beatValues(9,8), {'CHORDS':party2Element2.id, 'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance1.id, party1Performance2.id, party2.id, beatValues(9,8), {'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance1.id, party1Performance2.id, party2.id, beatValues(9,8), {'LYRICS':party2Element3.id}),

        new PartySnapshot(party1Performance2.id, null, party1.id, beatValues(17,8), {}),
        new PartySnapshot(party1Performance2.id, null, party1.id, beatValues(17,8), {}),
        new PartySnapshot(party1Performance2.id, null, party1.id, beatValues(17,8), {}),
        new PartySnapshot(party1Performance2.id, null, party1.id, beatValues(17,8), {}),

        new PartySnapshot(party1Performance2.id, null, party1.id, beatValues(17,8), {}),
        new PartySnapshot(party1Performance2.id, null, party1.id, beatValues(17,8), {}),
        new PartySnapshot(party1Performance2.id, null, party1.id, beatValues(17,8), {}),
        new PartySnapshot(party1Performance2.id, null, party1.id, beatValues(17,8), {}),

        new PartySnapshot(null, party2Performance2.id, null, null, null),
        new PartySnapshot(null, party2Performance2.id, null, null, null),
        new PartySnapshot(null, party2Performance2.id, null, null, null),
        new PartySnapshot(null, party2Performance2.id, null, null, null),

        new PartySnapshot(null, party2Performance2.id, null, null, null),
        new PartySnapshot(null, party2Performance2.id, null, null, null),
        new PartySnapshot(null, party2Performance2.id, null, null, null),
        new PartySnapshot(null, party2Performance2.id, null, null, null),

        new PartySnapshot(party2Performance2.id, null, party2.id, beatValues(33,8), {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance2.id, null, party2.id, beatValues(33,8), {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance2.id, null, party2.id, beatValues(33,8), {'CHORDS':party2Element1.id}),
        new PartySnapshot(party2Performance2.id, null, party2.id, beatValues(33,8), {'CHORDS':party2Element1.id}),

        new PartySnapshot(party2Performance2.id, null, party2.id, beatValues(33,8), {'CHORDS':party2Element2.id, 'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance2.id, null, party2.id, beatValues(33,8), {'CHORDS':party2Element2.id, 'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance2.id, null, party2.id, beatValues(33,8), {'LYRICS':party2Element3.id}),
        new PartySnapshot(party2Performance2.id, null, party2.id, beatValues(33,8), {'LYRICS':party2Element3.id}),
    ]
})
