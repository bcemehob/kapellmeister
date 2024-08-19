import {BeatEmitter} from "@/services/BeatEmitter"
import {Preroll} from "@/services/Preroll"

jest.spyOn(global, "setTimeout")
jest.spyOn(global, "clearTimeout")

afterEach(() => {
    jest.clearAllMocks()
});


const mockPrerollStart = jest.fn().mockImplementation(() => Promise.resolve())

jest.mock('@/services/Preroll', () => ({
    Preroll: jest.fn().mockImplementation(() => ({
        Preroll: "dummy",
        start: mockPrerollStart
    }))
}))


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
    it('starts BeatEmitter after Preroll', () => {
        const beatEmitter = new BeatEmitter(120, 24, 1)
        beatEmitter.start()
        expect(Preroll).toHaveBeenCalledTimes(1)
        expect(mockPrerollStart).toBeCalledTimes(1)
        expect(beatEmitter.preroll).not.toBeNull()
        expect(beatEmitter.firstBeatTime).not.toBeNull()
    })
    it('starts BeatEmitter without Preroll', () => {
        const beatEmitter = new BeatEmitter(120, 24, 0)
        beatEmitter.start()
        expect(Preroll).not.toHaveBeenCalled()
        expect(mockPrerollStart).not.toHaveBeenCalled()
        expect(beatEmitter.preroll).toBeNull()
        expect(beatEmitter.firstBeatTime).not.toBeNull()

        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
        expect(setTimeout.mock.calls).toHaveLength(2);
        let receivedInterval = setTimeout.mock.calls[0][1]
        expect(receivedInterval / 100).toBeCloseTo(5, 0)
        expect(beatEmitter.intervalBetweenBeats).toEqual(60 * 1000 / 120) // 500
        expect(beatEmitter.playing).toBeTruthy()
        expect(beatEmitter.currentBeat).toBe(1)
        expect(beatEmitter.currentSecond).toBe(1)
        expect(beatEmitter.pausedBeat).toBe(0)
        expect(beatEmitter.pausedSecond).toBe(0)
        expect(beatEmitter.timeoutId).not.toBeNull()
        expect(beatEmitter.secondTimeoutId).not.toBeNull()
    })
    it('BeatEmitter stops when currentBeat exceeds duration', () => {
        const beatEmitter = new BeatEmitter(120, 1, 0)
        beatEmitter.currentBeat = 1
        beatEmitter.start()
        expect(Preroll).not.toHaveBeenCalled()
        expect(mockPrerollStart).not.toHaveBeenCalled()
        expect(beatEmitter.preroll).toBeNull()
        expect(beatEmitter.firstBeatTime).not.toBeNull()

        expect(setTimeout).not.toHaveBeenCalled();
        expect(beatEmitter.intervalBetweenBeats).toEqual(60 * 1000 / 120) // 500
        expect(beatEmitter.playing).toBeFalsy()
        expect(beatEmitter.currentBeat).toBe(0)
        expect(beatEmitter.currentSecond).toBe(0)
        expect(beatEmitter.pausedBeat).toBe(1)
        expect(beatEmitter.pausedSecond).toBe(0)
        expect(beatEmitter.timeoutId).toBeNull()
        expect(beatEmitter.secondTimeoutId).toBeNull()
    })
})
