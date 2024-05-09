import {ConductorService} from "@/services/ConductorService";

describe('TimelineService', () => {
    it('calculates time from beats num and tempo', () => {
        expect(ConductorService.calculateDuration(256, 130)).toBe("1:58")
        expect(ConductorService.calculateDuration(0, 130)).toBe("0:00")
        expect(ConductorService.calculateDuration(1000, 100)).toBe("10:00")
        expect(ConductorService.calculateDuration(1000, 101)).toBe("9:54")
    })
})
