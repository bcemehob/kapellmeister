import {Pattern} from "@/pattern/Pattern";
import {Measure} from "@/pattern/Measure";

describe('Pattern', () => {
    const pattern = new Pattern('test name', 120, 8, new Measure(), [])
    it('pattern', () => {
        expect(pattern.duration).toBe(8)
        expect(pattern.name).toBe('test name')
        expect(JSON.stringify(pattern)).toBe('{"name":"test name","tempo":120,"duration":8,"measure":{},"instruments":[]}')
    })
})
