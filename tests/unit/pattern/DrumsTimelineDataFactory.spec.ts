import {InstrumentTimelineDataFactory} from "@/pattern/InstrumentTimelineDataFactory"
import {
    drums,
    expectedDrumTimeline,
} from "./patternmodel/drumInstrument";

jest.mock('@/settings', () => ({PREROLL_MEASURES: 1}))

describe('instrumentTimelineDataFactory', () => {
    const instrumentTimelineDataFactory = new InstrumentTimelineDataFactory(drums, 4)

    it('can create Timeline for drums', () => {
        expect(instrumentTimelineDataFactory.instrumentTimeline())
            .toEqual(expectedDrumTimeline)
    })
})
