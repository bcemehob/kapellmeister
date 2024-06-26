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
    const service = new TimelineService(20, {base: 4, beats: 4})
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
    it('detects if can change span start', () => {
        expect(service.canMove(expectedPartySpans[0])).toBeTruthy()
        expect(service.canMove(expectedPartySpans[3])).toBeTruthy()
    })
    it('detects if cannot change span start', () => {
        expectedPartySpans[0].start = 0
        expect(service.canMove(expectedPartySpans[0])).toBeFalsy()
        expectedPartySpans[0].start = 2
        expect(service.canMove(expectedPartySpans[0])).toBeFalsy()
        expectedPartySpans[3].start = 70
        expect(service.canMove(expectedPartySpans[3])).toBeFalsy()
        expectedPartySpans[0].start = 1
        expectedPartySpans[3].start = 55
    })
    it('can change span duration', () => {
        service.changeSpanDuration(expectedPartySpans[3], 9)
        expect(expectedPartySpans[3].duration).toBe( 16 + 4)
        expect(expectedPartySpans[3].span).toStrictEqual([55, 16 + 4])
        expectedPartySpans[3].duration = 16
        expectedPartySpans[3].span = [55,16]
        service.changeSpanDuration(expectedPartySpans[3], 5)
        expect(expectedPartySpans[3].duration).toBe(16)
        expect(expectedPartySpans[3].span).toStrictEqual([55, 16])
    })
    it('can change span start', () => {
        expectedPartySpans[3].start = 55
        service.changeSpanStart(expectedPartySpans[3], -27)
        expect(expectedPartySpans[3].start).toBe( 49)
        expectedPartySpans[3].start = 55
        service.changeSpanStart(expectedPartySpans[3], 27)
        expect(expectedPartySpans[3].start).toBe(55 + 27 / 3 + 1)
        expect(expectedPartySpans[3].span).toStrictEqual([55 + 27 / 3 + 1,16])
        expectedPartySpans[3].start = 55
        expectedPartySpans[3].span = [55,16]
        expectedPartySpans[0].start = 2
        service.changeSpanStart(expectedPartySpans[0], -9)
        expect(expectedPartySpans[0].start).toBe(1)
        service.changeSpanStart(expectedPartySpans[2], 25)
        expect(expectedPartySpans[2].start).toBe(33 + 6)
        expect(expectedPartySpans[2].span).toStrictEqual([33 + 6,16])
        expectedPartySpans[2].start = 33
        expectedPartySpans[2].span = [33,16]
    })

    it('can move span by mouse drag', () => {
        expectedPartySpans[3].start = 55
        service.move(expectedPartySpans[3], -2)
        expect(expectedPartySpans[3].start).toBe( 55)
        expect(expectedPartySpans[3].span).toStrictEqual( [55,16])
        service.move(expectedPartySpans[3], -12)
        expect(expectedPartySpans[3].start).toBe(51)
        expect(expectedPartySpans[3].span).toStrictEqual( [51,16])
        service.move(expectedPartySpans[3], -100)
        expect(expectedPartySpans[3].start).toBe(55)
        expect(expectedPartySpans[3].span).toStrictEqual( [51,16])
        service.move(expectedPartySpans[0], -9)
        expect(expectedPartySpans[0].start).toBe(1)
        expect(expectedPartySpans[0].span).toStrictEqual( [1,16])
        service.move(expectedPartySpans[2], 25)
        expect(expectedPartySpans[2].start).toBe(33)
        expect(expectedPartySpans[2].span).toStrictEqual( [33,16])
        expectedPartySpans[2].start = 33
        expectedPartySpans[3].start = 55
        expectedPartySpans[3].span = [55,16]

    })
    it('can stretch span by mouse drag', () => {
        service.stretch(expectedPartySpans[3], -2)
        expect(expectedPartySpans[3].duration).toBe( 16)
        expect(expectedPartySpans[3].span).toStrictEqual( [55,16])
        service.stretch(expectedPartySpans[3], -100)
        expect(expectedPartySpans[3].duration).toBe( 16)
        expect(expectedPartySpans[3].span).toStrictEqual( [55,16])
        service.stretch(expectedPartySpans[3], 100)
        expect(expectedPartySpans[3].duration).toBe( 16)
        expect(expectedPartySpans[3].span).toStrictEqual( [55,16])
        service.stretch(expectedPartySpans[3], 12)
        expect(expectedPartySpans[3].duration).toBe(16 + 4)
        expect(expectedPartySpans[3].span).toStrictEqual( [55,16+4])
        service.stretch(expectedPartySpans[0], 9)
        expect(expectedPartySpans[0].duration).toBe(16)
        expect(expectedPartySpans[0].span).toStrictEqual( [1,16])
        service.stretch(expectedPartySpans[2], 125)
        expect(expectedPartySpans[2].duration).toBe(16)
        expect(expectedPartySpans[2].span).toStrictEqual( [33,16])
        service.stretch(expectedPartySpans[2], 15)
        expect(expectedPartySpans[2].duration).toBe(16+5)
        expect(expectedPartySpans[2].span).toStrictEqual( [33,16+5])
        expectedPartySpans[2].duration = 16
        expectedPartySpans[3].duration = 16
        expectedPartySpans[3].span = [55,16]

    })

})
