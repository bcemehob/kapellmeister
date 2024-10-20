import {BeatEmitter} from "@/services/BeatEmitter"
import {Preroll} from "@/services/Preroll"

jest.spyOn(global, "setTimeout")
jest.spyOn(global, "clearTimeout")

afterEach(() => {
    jest.clearAllMocks()
});

let mockCurrentBeat = 12

const mockPrerollStart = jest.fn().mockImplementation(() => Promise.resolve())

jest.mock('@/services/Preroll', () => ({
    Preroll: jest.fn().mockImplementation(() => ({
        Preroll: "dummy",
        start: mockPrerollStart,
        currentBeat: mockCurrentBeat,
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

        assertSetTimeout()
        assertBeatEmitterStarted(beatEmitter)
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
        expect(clearTimeout).not.toHaveBeenCalled()
    })
    it('BeatEmitter stops when currentSecond exceeds duration', () => {
        const beatEmitter = new BeatEmitter(120, 1, 0)
        beatEmitter.currentSecond = 2

        beatEmitter.start()

        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
        expect(setTimeout.mock.calls).toHaveLength(1);
        let receivedInterval = setTimeout.mock.calls[0][1]
        expect(receivedInterval / 100).toBeCloseTo(5, 0)
        expect(clearTimeout).toHaveBeenCalledTimes(1)
        expect(clearTimeout.mock.calls[0][0]).not.toBeNull()
    })
    it('BeatEmitter can be stopped', () => {
        const beatEmitter = new BeatEmitter(120, 24, 0)

        beatEmitter.start()

        assertSetTimeout()
        assertBeatEmitterStarted(beatEmitter)
        const beatTimeoutId = beatEmitter.timeoutId
        const secondTimeoutId = beatEmitter.secondTimeoutId

        beatEmitter.stop()

        assertClearTimeout(beatTimeoutId, secondTimeoutId)
        assertBeatEmitterStopped(beatEmitter)
    })
    it('BeatEmitter can be paused', () => {
        const beatEmitter = new BeatEmitter(120, 24, 0)

        beatEmitter.start()

        assertSetTimeout()
        assertBeatEmitterStarted(beatEmitter)
        const beatTimeoutId = beatEmitter.timeoutId

        const secondTimeoutId = beatEmitter.secondTimeoutId

        beatEmitter.pause()

        assertClearTimeout(beatTimeoutId, secondTimeoutId)
        assertBeatEmitterPaused(beatEmitter)
    })
    it('BeatEmitter can be started again after pause', () => {
        const beatEmitter = new BeatEmitter(120, 24, 0)

        beatEmitter.start()

        assertSetTimeout()
        assertBeatEmitterStarted(beatEmitter)
        const beatTimeoutId = beatEmitter.timeoutId
        const secondTimeoutId = beatEmitter.secondTimeoutId

        beatEmitter.pause()

        assertClearTimeout(beatTimeoutId, secondTimeoutId)
        assertBeatEmitterPaused(beatEmitter)

        beatEmitter.start()
        assertBeatEmitterStartedAfterPause(beatEmitter)
    })
    it('BeatEmitter can go to particular beat', () => {
        const beatEmitter = new BeatEmitter(120, 24, 0)

        beatEmitter.start()

        assertBeatEmitterStarted(beatEmitter)
        const beatTimeoutId = beatEmitter.timeoutId
        const secondTimeoutId = beatEmitter.secondTimeoutId

        beatEmitter.goToBeat(3, 120)

        assertClearTimeout(beatTimeoutId, secondTimeoutId)
        expect(setTimeout.mock.calls).toHaveLength(4);
        assertBeatEmitterStartedFrom4thBeat(beatEmitter)
    })
    it('BeatEmitter can reset preroll', () => {
        const beatEmitter = new BeatEmitter(120, 24, 2)

        beatEmitter.resetPreroll(4)

        expect(Preroll).toHaveBeenCalledTimes(2)
        expect(Preroll).toHaveBeenNthCalledWith(1, 120, 2)
        expect(Preroll).toHaveBeenNthCalledWith(2, 120, 4)
    })
    it('BeatEmitter can get current preroll beat', () => {
        const beatEmitter = new BeatEmitter(120, 24, 2)

        expect(beatEmitter.getCurrentPrerollBeat()).toBe(12)

        expect(Preroll).toHaveBeenCalledTimes(1)
        expect(Preroll).toHaveBeenCalledWith( 120, 2)
    })
    it('BeatEmitter can detect if preroll is playing', () => {
        const beatEmitter = new BeatEmitter(120, 24, 2)

        expect(beatEmitter.isPrerollPlaying()).toBeTruthy()

        expect(Preroll).toHaveBeenCalledTimes(1)
        expect(Preroll).toHaveBeenCalledWith( 120, 2)
    })
    it('BeatEmitter can detect if preroll is not playing', () => {
        mockCurrentBeat = 0
        const beatEmitter = new BeatEmitter(120, 24, 2)

        expect(beatEmitter.isPrerollPlaying()).toBeFalsy()

        expect(Preroll).toHaveBeenCalledTimes(1)
        expect(Preroll).toHaveBeenCalledWith( 120, 2)
    })
})

function assertSetTimeout() {
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
    console.log(setTimeout.mock.calls)
    expect(setTimeout.mock.calls).toHaveLength(2);
    let receivedInterval = setTimeout.mock.calls[0][1]
    expect(receivedInterval / 100).toBeCloseTo(5, 0)
    let receivedSecondInterval = setTimeout.mock.calls[1][1]
    expect(receivedSecondInterval / 1000).toBeCloseTo(1, 0)
}

function assertClearTimeout(beatTimeoutId, secondTimeoutId) {
    expect(clearTimeout).toHaveBeenCalledTimes(2)
    expect(clearTimeout).toHaveBeenNthCalledWith(1, beatTimeoutId)
    expect(clearTimeout).toHaveBeenNthCalledWith(2, secondTimeoutId)
}

function assertBeatEmitterStarted(beatEmitter) {
    expect(beatEmitter.firstBeatTime).not.toBeNull()
    expect(beatEmitter.intervalBetweenBeats).toEqual(60 * 1000 / 120) // 500
    expect(beatEmitter.playing).toBeTruthy()
    expect(beatEmitter.currentBeat).toBe(1)
    expect(beatEmitter.currentSecond).toBe(1)
    expect(beatEmitter.pausedBeat).toBe(0)
    expect(beatEmitter.pausedSecond).toBe(0)
    expect(beatEmitter.timeoutId).not.toBeNull()
    expect(beatEmitter.secondTimeoutId).not.toBeNull()
}

function assertBeatEmitterPaused(beatEmitter) {
    expect(beatEmitter.firstBeatTime).not.toBeNull()
    expect(beatEmitter.intervalBetweenBeats).toEqual(60 * 1000 / 120) // 500
    expect(beatEmitter.playing).toBeFalsy()
    expect(beatEmitter.currentBeat).toBe(1)
    expect(beatEmitter.currentSecond).toBe(1)
    expect(beatEmitter.pausedBeat).toBe(0)
    expect(beatEmitter.pausedSecond).toBe(0)
    expect(beatEmitter.timeoutId).toBeNull()
    expect(beatEmitter.secondTimeoutId).toBeNull()
}

function assertBeatEmitterStartedAfterPause(beatEmitter) {
    expect(beatEmitter.playing).toBeTruthy()
    expect(beatEmitter.currentBeat).toBe(2)
    expect(beatEmitter.currentSecond).toBe(2)
    expect(beatEmitter.pausedBeat).toBe(1)
    expect(beatEmitter.pausedSecond).toBe(1)
    expect(beatEmitter.timeoutId).not.toBeNull()
    expect(beatEmitter.secondTimeoutId).not.toBeNull()
}
function assertBeatEmitterStartedFrom4thBeat(beatEmitter) {
    expect(beatEmitter.playing).toBeTruthy()
    expect(beatEmitter.currentBeat).toBe(4)
    expect(beatEmitter.currentSecond).toBe(3)
    expect(beatEmitter.pausedBeat).toBe(3)
    expect(beatEmitter.pausedSecond).toBe(2)
    expect(beatEmitter.timeoutId).not.toBeNull()
    expect(beatEmitter.secondTimeoutId).not.toBeNull()
}

function assertBeatEmitterStopped(beatEmitter) {
    expect(beatEmitter.firstBeatTime).not.toBeNull()
    expect(beatEmitter.intervalBetweenBeats).toEqual(60 * 1000 / 120) // 500
    expect(beatEmitter.playing).toBeFalsy()
    expect(beatEmitter.currentBeat).toBe(0)
    expect(beatEmitter.currentSecond).toBe(0)
    expect(beatEmitter.pausedBeat).toBe(0)
    expect(beatEmitter.pausedSecond).toBe(0)
    expect(beatEmitter.timeoutId).toBeNull()
    expect(beatEmitter.secondTimeoutId).toBeNull()
}
