import {InstrumentServiceLegacy} from "@/services/InstrumentServiceLegacy"

const instrument = {
    name: 'sax',
    parties: [
        {name: 'first', spans: [[73, 32], [1, 32]]},
        {name: 'second', spans: [[106, 32], [33, 32]]}
    ]
}

describe('InstrumentService', () => {
    const service = new InstrumentServiceLegacy(instrument, {base: 4, beats: 4})


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
        const customMeasureSearvice = new InstrumentServiceLegacy(instrument, {base: 4, beats: 3})
        expect(customMeasureSearvice.prerollBeats()).toBe(12)
    })
})
