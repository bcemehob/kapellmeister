import {Preroll} from "@/services/Preroll";
jest.spyOn(global, "setTimeout");
jest.spyOn(global, "clearTimeout");

afterEach(() => {
    jest.clearAllMocks();
});
const onPrerollStop = jest.fn(() => {});

describe('Preroll', () => {
    const preroll = new Preroll(120, 24, onPrerollStop)
    it('compiles valid BeatEmitter', () => {
        expect(preroll.tempo).toBe(120)
        expect(preroll.duration).toEqual(24)
        expect(preroll.currentBeat).toBe(0)
        expect(preroll.firstBeatTime).toBeNull()
        expect(preroll.intervalBetweenBeats).toEqual(60 * 1000 / 120) // 500
        expect(preroll.playing).toBeFalsy()
    })
    it('will stop Preroll after start if current beat value exceeds duration', () => {
        const preroll = new Preroll(120, 0, onPrerollStop)
        expect(preroll.start()).toStrictEqual(new Promise(resolve => {}))
        let firstBeatTime = preroll.firstBeatTime
        expect(firstBeatTime).toBeLessThanOrEqual(new Date().getTime())
        expect(setTimeout).not.toHaveBeenCalled()
        expect(preroll.currentBeat).toBe(1)
        expect(preroll.timeoutId).toBeNull()
        expect(preroll.firstBeatTime).toBe(firstBeatTime)
        expect(preroll.playing).toBeFalsy()
        expect(clearTimeout).toHaveBeenCalledWith(preroll.timeoutId)
    })
})
