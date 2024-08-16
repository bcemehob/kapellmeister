import {Preroll} from "@/services/Preroll";

describe('Preroll', () => {
    const preroll = new Preroll(120, 24)
    it('compiles valid BeatEmitter', () => {
        expect(preroll.tempo).toBe(120)
        expect(preroll.duration).toEqual(24)
        expect(preroll.currentBeat).toBe(0)
        expect(preroll.firstBeatTime).toBeNull()
        expect(preroll.intervalBetweenBeats).toEqual(60 * 1000 / 120) // 500
        expect(preroll.playing).toBeFalsy()
    })
    it('can start and stop Preroll', () => {
        preroll.start()
        let firstBeatTime = preroll.firstBeatTime
        expect(firstBeatTime).toBeLessThanOrEqual(new Date().getTime())
        expect(preroll.playing).toBeTruthy()

        preroll.stop()
        expect(preroll.firstBeatTime).toBe(firstBeatTime)
        expect(preroll.playing).toBeFalsy()
    })
})
