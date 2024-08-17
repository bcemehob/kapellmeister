import {BeatEmitter} from "@/services/BeatEmitter";

describe('BeatEmitter', () => {
    it('throws error when invalid arguments', () => {
        expect(() => new BeatEmitter(null, null, null))
            .toThrow("Tempo and duration must be numbers");
        expect(() => new BeatEmitter(123, null, null))
            .toThrow("Tempo and duration must be numbers");
        expect(() => new BeatEmitter(null, 123, null))
            .toThrow("Tempo and duration must be numbers");
        expect(() => new BeatEmitter("abc", 123, null))
            .toThrow("Tempo and duration must be numbers");
        expect(() => new BeatEmitter(123, "abc", null))
            .toThrow("Tempo and duration must be numbers");
    })
    it('compiles valid instance', () => {
        const beatEmitter = new BeatEmitter(120, 24, null)
        expect(beatEmitter.tempo).toBe(120)
        expect(beatEmitter.duration).toEqual(24)
        expect(beatEmitter.intervalBetweenBeats).toEqual(60 * 1000 / 120) // 500
        expect(beatEmitter.playing).toBeFalsy()
        expect(beatEmitter.currentBeat).toBe(0)
        expect(beatEmitter.currentSecond).toBe(0)
        expect(beatEmitter.firstBeatTime).toBe(0)
        expect(beatEmitter.pausedBeat).toBe(0)
        expect(beatEmitter.pausedSecond).toBe(0)
        expect(beatEmitter.preroll).toBeNull()
        expect(beatEmitter.timeoutId).toBeNull()
        expect(beatEmitter.secondTimeoutId).toBeNull()
    })
})
