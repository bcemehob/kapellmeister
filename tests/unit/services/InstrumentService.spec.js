import {InstrumentService} from "@/services/InstrumentService"
import {Instrument} from "@/pattern/Instrument"
import {PartPerformance} from "@/pattern/PartPerformance"
import {Part} from "@/pattern/Part"
import expectedTimeline from "./expected-instrument-timeline"
import {PartViewAtBeat} from "@/pattern/PartViewAtBeat";
import {PartElement} from "@/pattern/PartElement";

const instrument = {
    name: 'sax',
    parts: [
        {name: 'first', spans: [[73, 32], [1, 32]]},
        {name: 'second', spans: [[106, 32], [33, 32]]}
    ]
}

const parties = [
    new Part('party1', 'first', 2, 0, 0, []),
    new Part('party2', 'second', 2, 0, 0, []),
]

const partyPerformances = [
    new PartPerformance('performance 1-1', 1, 'party1'),
    new PartPerformance('performance 1-2', 5, 'party1'),
    new PartPerformance('performance 2-1', 3, 'party2'),
    new PartPerformance('performance 2-2', 7, 'party2'),
]

const partyElements = [
    new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null),
    new PartElement("element-chords-1-2", "party1", "CHORDS", 3, 2, "E7", null),
    new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
]

const instrumentNewFormat = new Instrument(null, 'sax', partyPerformances, parties, partyElements)
const beatValues = (start, duration) => ({start, duration})

describe('InstrumentService', () => {
    const service = new InstrumentService(instrument, {base: 4, beats: 4})
    const serviceNew = new InstrumentService(instrumentNewFormat, {base: 4, beats: 3})

    it('can create timeline in new format', () => {
        expect(serviceNew.instrumentTimelineData).toStrictEqual(expectedTimeline)
    })

    it('can detect upcoming party', () => {
        expect(service.upcomingPartLegacy(0)).toStrictEqual({start: 1, duration: 32, name: "first"})
        expect(service.upcomingPartLegacy(1)).toStrictEqual({start: 0, duration: 0})
        expect(service.upcomingPartLegacy(17)).toStrictEqual({start: 33, duration: 32, name: "second"})
        expect(service.upcomingPartLegacy(68)).toStrictEqual({start: 73, duration: 32, name: "first"})
        expect(service.upcomingPartLegacy(105)).toStrictEqual({start: 106, duration: 32, name: "second"})
        expect(service.upcomingPartLegacy(136)).toStrictEqual({start: 0, duration: 0})
    })

    it('can detect upcoming party new', () => {
        expect(service.upcomingPartLegacy(0)).toStrictEqual({start: 1, duration: 32, name: "first"})
        expect(service.upcomingPartLegacy(1)).toStrictEqual({start: 0, duration: 0})
        expect(service.upcomingPartLegacy(17)).toStrictEqual({start: 33, duration: 32, name: "second"})
        expect(service.upcomingPartLegacy(68)).toStrictEqual({start: 73, duration: 32, name: "first"})
        expect(service.upcomingPartLegacy(105)).toStrictEqual({start: 106, duration: 32, name: "second"})
        expect(service.upcomingPartLegacy(136)).toStrictEqual({start: 0, duration: 0})
    })

    it('can detect current party', () => {
        expect(service.currentPartLegacy(0)).toStrictEqual({start: 0, duration: 0})
        expect(service.currentPartLegacy(1)).toStrictEqual({start: 1, duration: 32, name: "first"})
        expect(service.currentPartLegacy(17)).toStrictEqual({start: 1, duration: 32, name: "first"})
        expect(service.currentPartLegacy(32)).toStrictEqual({start: 1, duration: 32, name: "first"})
        expect(service.currentPartLegacy(33)).toStrictEqual({start: 33, duration: 32, name: "second"})
        expect(service.currentPartLegacy(64)).toStrictEqual({start: 33, duration: 32, name: "second"})
        expect(service.currentPartLegacy(65)).toStrictEqual({start: 0, duration: 0})
        expect(service.currentPartLegacy(73)).toStrictEqual({start: 73, duration: 32, name: "first"})
        expect(service.currentPartLegacy(104)).toStrictEqual({start: 73, duration: 32, name: "first"})
        expect(service.currentPartLegacy(105)).toStrictEqual({start: 0, duration: 0})
        expect(service.currentPartLegacy(106)).toStrictEqual({start: 106, duration: 32, name: "second"})
        expect(service.currentPartLegacy(137)).toStrictEqual({start: 106, duration: 32, name: "second"})
        expect(service.currentPartLegacy(138)).toStrictEqual({start: 0, duration: 0})
    })

    it('can detect current party new', () => {
        expect(serviceNew.currentPart(0)).toStrictEqual(new PartViewAtBeat(null, null, null,
            new PartViewAtBeat("first", beatValues(1, 6), [
                new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
        ], null)))
        expect(serviceNew.currentPart(1))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6), [
                new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
            ],
                new PartViewAtBeat("second", beatValues(7, 6),[], null)))
        expect(serviceNew.currentPart(2))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6),[
                new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null),
                new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
            ],
                new PartViewAtBeat("second", beatValues(7, 6),[], null)))
        expect(serviceNew.currentPart(3))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6),[
                new PartElement("element-chords-1-2", "party1", "CHORDS", 3, 2, "E7", null),
                new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
            ],
                new PartViewAtBeat("second", beatValues(7, 6),[], null)))
        expect(serviceNew.currentPart(4))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6),[
                new PartElement("element-chords-1-2", "party1", "CHORDS", 3, 2, "E7", null),
                new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
            ],
                new PartViewAtBeat("second", beatValues(7, 6),[], null)))
        expect(serviceNew.currentPart(5))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6),[
                new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
            ],
                new PartViewAtBeat("second", beatValues(7, 6),[], null)))
        expect(serviceNew.currentPart(6))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6),[],
                new PartViewAtBeat("second", beatValues(7, 6),[], null)))

        expect(serviceNew.currentPart(7))
            .toStrictEqual(new PartViewAtBeat("second", beatValues(7, 6),[],
                new PartViewAtBeat("first", beatValues(13, 6), [
                    new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
                ], null)))
        expect(serviceNew.currentPart(12))
            .toStrictEqual(new PartViewAtBeat("second", beatValues(7, 6),[],
                new PartViewAtBeat("first", beatValues(13, 6), [
                    new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
                ], null)))

        expect(serviceNew.currentPart(13))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(13, 6),[
                new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
            ],
                new PartViewAtBeat("second", beatValues(19, 6),[], null)))
        expect(serviceNew.currentPart(18))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(13, 6),[],
                new PartViewAtBeat("second", beatValues(19, 6),[], null)))
        expect(serviceNew.currentPart(19))
            .toStrictEqual(new PartViewAtBeat("second", beatValues(19, 6),[],
                null))
        expect(serviceNew.currentPart(24))
            .toStrictEqual(new PartViewAtBeat("second", beatValues(19, 6),[],
                null))
    })

    it('can calculate countdown for current party', () => {
        expect(service.currentCountDown(0)).toBe(0)
        expect(service.currentCountDown(1)).toBe(8)
        expect(service.currentCountDown(12)).toBe(6)
        expect(service.currentCountDown(13)).toBe(5)
        expect(service.currentCountDown(16)).toBe(5)
        expect(service.currentCountDown(17)).toBe(4)
        expect(service.currentCountDown(29)).toBe(1)
        expect(service.currentCountDown(32)).toBe(1)
        expect(service.currentCountDown(33)).toBe(8)
    })
    it('can calculate countdown for upcoming party', () => {
        expect(service.upcomingCountDown(0)).toBe(1)
        expect(service.upcomingCountDown(1)).toBe(0)
        expect(service.upcomingCountDown(16)).toBe(0)
        expect(service.upcomingCountDown(17)).toBe(4)
        expect(service.upcomingCountDown(29)).toBe(1)
        expect(service.upcomingCountDown(32)).toBe(1)
        expect(service.upcomingCountDown(33)).toBe(0)
    })
    it('can combine object with current and upcoming countdowns', () => {
        expect(service.countDown(0)).toStrictEqual({type: 'upcoming', count: 1})
        expect(service.countDown(1)).toStrictEqual({type: 'current', count: 8})
        expect(service.countDown(12)).toStrictEqual({type: 'current', count: 6})
        expect(service.countDown(13)).toStrictEqual({type: 'current', count: 5})
        expect(service.countDown(16)).toStrictEqual({type: 'current', count: 5})
        expect(service.countDown(17)).toStrictEqual({type: 'common', count: 4})
        expect(service.countDown(29)).toStrictEqual({type: 'common', count: 1})
        expect(service.countDown(32)).toStrictEqual({type: 'common', count: 1})
        expect(service.countDown(33)).toStrictEqual({type: 'current', count: 8})
    })
    it('can calculate preroll beats', () => {
        expect(service.prerollBeats()).toBe(16)
    })

    it('can calculate preroll beats for custom measure', () => {
        const customMeasureSearvice = new InstrumentService(instrument, {base: 4, beats: 3})
        expect(customMeasureSearvice.prerollBeats()).toBe(12)
    })
})
