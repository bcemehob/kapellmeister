import {InstrumentTimelineDataFactory} from "@/pattern/InstrumentTimelineDataFactory"
import {
    expectedTimeline,
    instrument,
    mappedPartElements,
    mappedPartPerformances,
    mappedParts
} from "./patternmodel/saxInstrument";

jest.mock('@/settings', () => ({PREROLL_MEASURES: 1}))

describe('instrumentTimelineDataFactory', () => {
    const instrumentTimelineDataFactory = new InstrumentTimelineDataFactory(instrument, 4)


    it('can map parts by ids', () => {
        expect(instrumentTimelineDataFactory.mapParts()).toEqual(mappedParts())
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
})
