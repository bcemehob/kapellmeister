import {ConductorService} from "@/services/ConductorService"
import {TimeView} from "@/services/TimeView"
import {Pattern} from "@/pattern/deserialized/Pattern"
import {Measure} from "@/pattern/deserialized/Measure"

const pattern = (duration: number, measureBeats: number): Pattern => {
    return new Pattern("", 111, duration, new Measure(4, measureBeats), [])
}

describe('TimelineService', () => {
    it('calculates time from beats num and tempo', () => {
        expect(ConductorService.calculateDuration(256, 130))
            .toStrictEqual(new TimeView(118, "1:58"))
        expect(ConductorService.calculateDuration(0, 130))
            .toStrictEqual(new TimeView( 0, "0:00"))
        expect(ConductorService.calculateDuration(1000, 100))
            .toStrictEqual(new TimeView( 600, "10:00"))
        expect(ConductorService.calculateDuration(1000, 101))
            .toStrictEqual(new TimeView(594, "9:54"))
    })
    it('calculates time from seconds', () => {
        expect(ConductorService.duration(61))
            .toStrictEqual(new TimeView(61, "1:01"))
        expect(ConductorService.duration(0))
            .toStrictEqual(new TimeView(0, "0:00"))
        expect(ConductorService.duration(1000))
            .toStrictEqual(new TimeView(1000, "16:40"))
    })
    it('can detect measurement class name', () => {
        expect(ConductorService.getClassName(Pattern.empty())).toBe("")
        expect(ConductorService.getClassName(pattern(111, 4))).toBe("not-ok")
        expect(ConductorService.getClassName(pattern(68, 4))).toBe("ok")
        expect(ConductorService.getClassName(pattern(80, 4))).toBe("good")
        expect(ConductorService.getClassName(pattern(96, 4))).toBe("great")
    })
})
