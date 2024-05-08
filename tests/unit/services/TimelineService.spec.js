import {TimelineService} from "@/services/TimelineService";

const instrument = {
    name: 'sax',
    parties: [
        {name: 'first', spans: [[33, 16],[1, 16]]},
        {name: 'second', spans: [[55, 16], [17, 16]]}
    ]
}

const expectedPartySpans = [
    {
        start: 1,
        duration: 16,
        name: 'first',
        id: 'first-1',
        initialDuration: 16,
        initialStart: 1,
        span: [1, 16],
        instrument
    },
    {
        start: 17,
        duration: 16,
        name: 'second',
        id: 'second-1',
        initialDuration: 16,
        initialStart: 17,
        span: [17, 16],
        instrument
    },
    {
        start: 33,
        duration: 16,
        name: 'first',
        id: 'first-0',
        initialDuration: 16,
        initialStart: 33,
        span: [33, 16],
        instrument
    },
    {
        start: 55,
        duration: 16,
        name: 'second',
        id: 'second-0',
        initialDuration: 16,
        initialStart: 55,
        span: [55, 16],
        instrument
    }
]
describe('TimelineService', () => {
    const service = new TimelineService(80, {base: 4, beats: 4})
    test('changeSpanDuration is a function', () => {
        expect(typeof service.changeSpanDuration).toBe("function")
    })
    it('can create spans for UI', () => {
        expect(service.partySpans(instrument)).toStrictEqual(expectedPartySpans)
    })
    it('can find next span', () => {
        expect(service.nextSpan(expectedPartySpans[0])).toStrictEqual(expectedPartySpans[1])
    })
    it('returns undefined if no next span', () => {
        expect(service.nextSpan(expectedPartySpans[3])).toBe(undefined)
    })
    it('can find previous span', () => {
        expect(service.previousSpan(expectedPartySpans[2])).toStrictEqual(expectedPartySpans[1])
    })
    it('returns undefined if no previous span', () => {
        expect(service.previousSpan(expectedPartySpans[0])).toBe(undefined);
    })
    it('detects if can increase span duration', () => {
        expectedPartySpans[0].duration = 16
        console.log(expectedPartySpans[0])
        console.log(expectedPartySpans[3])
        expect(service.canStretch(expectedPartySpans[0])).toBeTruthy()
        expect(service.canStretch(expectedPartySpans[3])).toBeTruthy()
    })
    it('detects if cannot increase span duration', () => {
        expectedPartySpans[0].duration = 17
        expect(expectedPartySpans[0].duration).toBe(17)
        expect(service.canStretch(expectedPartySpans[0])).toBeFalsy()
        expectedPartySpans[0].duration = 15
        expect(expectedPartySpans[0].duration).toBe(15)
        expect(service.canStretch(expectedPartySpans[0])).toBeFalsy()
        expectedPartySpans[3].duration = 10
        expect(service.canStretch(expectedPartySpans[3])).toBeFalsy()
        expectedPartySpans[0].duration = 16
        expectedPartySpans[3].duration = 16
    })
})
