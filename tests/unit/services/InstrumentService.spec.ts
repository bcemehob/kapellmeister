import {InstrumentService} from "@/services/InstrumentService"
import {Instrument} from "@/pattern/Instrument"
import {PartPerformance} from "@/pattern/PartPerformance"
import {Part} from "@/pattern/Part"
import expectedTimeline from "./expected-instrument-timeline"
import {PartViewAtBeat} from "@/pattern/PartViewAtBeat"
import {PartElement} from "@/pattern/PartElement"
import {beatValues} from "../../utils/TestUtils"


const parts = [
    new Part('party1', 'first', 2, 0, 0),
    new Part('party2', 'second', 2, 0, 0),
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

const instrumentNewFormat = new Instrument(null, 'sax', partyPerformances, parts, partyElements)

describe('InstrumentService', () => {
    const serviceNew = new InstrumentService(instrumentNewFormat, {base: 4, beats: 3})

    it('can create timeline in new format', () => {
        expect(serviceNew.instrumentTimelineData).toStrictEqual(expectedTimeline)
    })

    it('can detect current party new', () => {
        expect(serviceNew.currentPart(0)).toStrictEqual(new PartViewAtBeat(undefined, null, null,
            new PartViewAtBeat("first", beatValues( 1, 6), [
                new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
            ], null)))
        expect(serviceNew.currentPart(1))
            .toStrictEqual(new PartViewAtBeat("first", beatValues( 1, 6), [
                    new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
                ],
                new PartViewAtBeat("second", beatValues( 7, 6), [], null)))
        expect(serviceNew.currentPart(2))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6), [
                    new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null),
                    new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
                ],
                new PartViewAtBeat("second", beatValues( 7, 6), [], null)))
        expect(serviceNew.currentPart(3))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6), [
                    new PartElement("element-chords-1-2", "party1", "CHORDS", 3, 2, "E7", null),
                    new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
                ],
                new PartViewAtBeat("second", beatValues( 7, 6), [], null)))
        expect(serviceNew.currentPart(4))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6), [
                    new PartElement("element-chords-1-2", "party1", "CHORDS", 3, 2, "E7", null),
                    new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
                ],
                new PartViewAtBeat("second", beatValues( 7, 6), [], null)))
        expect(serviceNew.currentPart(5))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6), [
                    new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
                ],
                new PartViewAtBeat("second", beatValues( 7, 6), [], null)))
        expect(serviceNew.currentPart(6))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(1, 6), [],
                new PartViewAtBeat("second", beatValues( 7, 6), [], null)))

        expect(serviceNew.currentPart(7))
            .toStrictEqual(new PartViewAtBeat("second", beatValues( 7, 6), [],
                new PartViewAtBeat("first", beatValues(13, 6), [
                    new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
                ], null)))
        expect(serviceNew.currentPart(12))
            .toStrictEqual(new PartViewAtBeat("second", beatValues( 7, 6), [],
                new PartViewAtBeat("first", beatValues(13, 6), [
                    new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
                ], null)))

        expect(serviceNew.currentPart(13))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(13, 6), [
                    new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null)
                ],
                new PartViewAtBeat("second", beatValues(19, 6), [], null)))
        expect(serviceNew.currentPart(18))
            .toStrictEqual(new PartViewAtBeat("first", beatValues(13, 6), [],
                new PartViewAtBeat("second", beatValues(19, 6), [], null)))
        expect(serviceNew.currentPart(19))
            .toStrictEqual(new PartViewAtBeat("second", beatValues(19, 6), [],
                null))
        expect(serviceNew.currentPart(24))
            .toStrictEqual(new PartViewAtBeat("second", beatValues(19, 6), [],
                null))
    })

})
