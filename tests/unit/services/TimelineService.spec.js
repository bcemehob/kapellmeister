import {TimelineService} from "@/services/TimelineService";

const instrument = {
    name: 'sax',
    parties: [
        {name: 'first', spans: [[33, 16],[1, 16]]},
        {name: 'second', spans: [[55, 8], [17, 16]]}
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
        duration: 8,
        name: 'second',
        id: 'second-0',
        initialDuration: 8,
        initialStart: 55,
        span: [55, 8],
        instrument
    }
]
describe('TimelineService', () => {
    test('changeSpanDuration is a function', () => {
        const service = new TimelineService(64, {base: 4, beats: 4})
        expect(typeof service.changeSpanDuration).toBe("function");

    })
    it('can create spans for UI', () => {
        const service = new TimelineService(64, {base: 4, beats: 4})
        expect(service.partySpans(instrument)).toStrictEqual(expectedPartySpans);
    })
    it('can find next span for UI', () => {
        const service = new TimelineService(64, {base: 4, beats: 4})
        expect(service.nextSpan(expectedPartySpans[0])).toStrictEqual(expectedPartySpans[1]);
    })
    it('returns undefined if no next span', () => {
        const service = new TimelineService(64, {base: 4, beats: 4})
        expect(service.nextSpan(expectedPartySpans[3])).toBe(undefined);
    })
})
