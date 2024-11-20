import {InstrumentTimelineDataFactory} from "@/pattern/instrumentTimelineDataFactory"
import {Instrument} from "@/pattern/Instrument";
import {v4 as uuidv4} from 'uuid'
import {Part} from "@/pattern/Part";
import {PartyPerformance} from "@/pattern/PartyPerformance";
import {PartyElement} from "@/pattern/PartyElement";
import {PartSnapshot} from "@/pattern/PartSnapshot";

jest.mock('@/settings', () => ({PREROLL_MEASURES : 1}))

describe('instrumentTimelineDataFactory', () => {
    const part1 = new Part(uuidv4(), 'part1', 2, 0, 0)
    const part2 = new Part(uuidv4(), 'part2', 2, 0, 0)
    const part1Performance1 = new PartyPerformance(uuidv4(),1, part1.id)
    const part1Performance2 = new PartyPerformance(uuidv4(),5, part1.id)
    const part2Performance1 = new PartyPerformance(uuidv4(),3, part2.id)
    const part2Performance2 = new PartyPerformance(uuidv4(),9, part2.id)
    const part2Element1 = new PartyElement(uuidv4(), part2.id, 'CHORDS', 1, 4, 'Am', null)
    const part2Element2 = new PartyElement(uuidv4(), part2.id, 'CHORDS', 5, 2, 'E', null)
    const part2Element3 = new PartyElement(uuidv4(), part2.id, 'LYRICS', 5, 4, 'Foo', null)
    const instrument = new Instrument(
        uuidv4(),
        'instrument',
        [part1Performance1, part1Performance2, part2Performance1, part2Performance2],
        [part1, part2],
        [part2Element1, part2Element2, part2Element3])

    const instrumentTimelineDataFactory = new InstrumentTimelineDataFactory(instrument, 4)

    const mappedParties = () => {
        const result = {}
        result[part1.id] = part1
        result[part2.id] = part2
        return result
    }

    const mappedPartPerformances = () => {
        const result = {}
        result[part1Performance1.id] = part1Performance1
        result[part1Performance2.id] = part1Performance2
        result[part2Performance1.id] = part2Performance1
        result[part2Performance2.id] = part2Performance2
        return result
    }

    const mappedPartElements = () => {
        const result = {}
        result[part2Element1.id] = part2Element1
        result[part2Element2.id] = part2Element2
        result[part2Element3.id] = part2Element3
        return result
    }

    it('can map parts by ids', () => {
        expect(instrumentTimelineDataFactory.mapParts()).toEqual(mappedParties())
    })
    it('can map part performances by ids', () => {
        expect(instrumentTimelineDataFactory.mapPartPerformances())
            .toEqual(mappedPartPerformances())
    })
    it('can map part elements by ids', () => {
        expect(instrumentTimelineDataFactory.mapPartElements()).toEqual(mappedPartElements())
    })
    it('can create Timeline', () => {
        expect(instrumentTimelineDataFactory.instrumentTimeline())
            .toEqual(expectedTimeline)
    })

    const beatValues = (start, duration) => ({start, duration})

    const expectedTimeline = [
        new PartSnapshot(null, 1, null, null, null),

        new PartSnapshot(part1Performance1.id, null, part1.id, beatValues(1,8), {}),
        new PartSnapshot(part1Performance1.id, null, part1.id, beatValues(1,8), {}),
        new PartSnapshot(part1Performance1.id, null, part1.id, beatValues(1,8), {}),
        new PartSnapshot(part1Performance1.id, null, part1.id, beatValues(1,8), {}),

        new PartSnapshot(part1Performance1.id, 9, part1.id, beatValues(1,8), {}),
        new PartSnapshot(part1Performance1.id, 9, part1.id, beatValues(1,8), {}),
        new PartSnapshot(part1Performance1.id, 9, part1.id, beatValues(1,8), {}),
        new PartSnapshot(part1Performance1.id, 9, part1.id, beatValues(1,8), {}),

        new PartSnapshot(part2Performance1.id, null, part2.id, beatValues(9,8), {'CHORDS':part2Element1.id}),
        new PartSnapshot(part2Performance1.id, null, part2.id, beatValues(9,8), {'CHORDS':part2Element1.id}),
        new PartSnapshot(part2Performance1.id, null, part2.id, beatValues(9,8), {'CHORDS':part2Element1.id}),
        new PartSnapshot(part2Performance1.id, null, part2.id, beatValues(9,8), {'CHORDS':part2Element1.id}),

        new PartSnapshot(part2Performance1.id, 17, part2.id, beatValues(9,8), {'CHORDS':part2Element2.id, 'LYRICS':part2Element3.id}),
        new PartSnapshot(part2Performance1.id, 17, part2.id, beatValues(9,8), {'CHORDS':part2Element2.id, 'LYRICS':part2Element3.id}),
        new PartSnapshot(part2Performance1.id, 17, part2.id, beatValues(9,8), {'LYRICS':part2Element3.id}),
        new PartSnapshot(part2Performance1.id, 17, part2.id, beatValues(9,8), {'LYRICS':part2Element3.id}),

        new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17,8), {}),
        new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17,8), {}),
        new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17,8), {}),
        new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17,8), {}),

        new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17,8), {}),
        new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17,8), {}),
        new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17,8), {}),
        new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17,8), {}),

        new PartSnapshot(null, null, null, null, null),
        new PartSnapshot(null, null, null, null, null),
        new PartSnapshot(null, null, null, null, null),
        new PartSnapshot(null, null, null, null, null),

        new PartSnapshot(null, 33, null, null, null),
        new PartSnapshot(null, 33, null, null, null),
        new PartSnapshot(null, 33, null, null, null),
        new PartSnapshot(null, 33, null, null, null),

        new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33,8), {'CHORDS':part2Element1.id}),
        new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33,8), {'CHORDS':part2Element1.id}),
        new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33,8), {'CHORDS':part2Element1.id}),
        new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33,8), {'CHORDS':part2Element1.id}),

        new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33,8), {'CHORDS':part2Element2.id, 'LYRICS':part2Element3.id}),
        new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33,8), {'CHORDS':part2Element2.id, 'LYRICS':part2Element3.id}),
        new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33,8), {'LYRICS':part2Element3.id}),
        new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33,8), {'LYRICS':part2Element3.id}),
    ]
})
