import {Pattern} from "@/pattern/deserialized/Pattern";
import {Measure} from "@/pattern/deserialized/Measure";

describe('Pattern', () => {
    const pattern = new Pattern('test name', 120, 8, new Measure(0, 0), [])
    it('pattern can be serialized', () => {
        expect(pattern.duration).toBe(8)
        expect(pattern.name).toBe('test name')
        expect(JSON.stringify(pattern)).toBe('{"name":"test name","tempo":120,"duration":8,"measure":{"base":0,"beats":0},"instruments":[]}')
    })

    it('pattern can create instance from compound objects', () => {
        expect(Pattern.instance({name: 'test', tempo: 120, duration: 16}, new Measure(4, 4), []))
            .toStrictEqual(
                new Pattern('test', 120, 16, new Measure(4, 4), []),
            )
    })

    it('can create empty instance', () => {
        expect(Pattern.empty())
            .toStrictEqual(
                new Pattern('', 0, 0, new Measure(0, 0), []),
            )
    })

    it('can detect if Pattern is empty', () => {
        expect(Pattern.empty().isEmpty()).toBeTruthy()
        expect(new Pattern('', 0, 0, new Measure(0, 0), []).isEmpty()).toBeTruthy()
        expect(new Pattern('some name', 110, 0, new Measure(4, 4), []).isEmpty()).toBeTruthy()

        expect(new Pattern('', 0, 1, new Measure(0, 0), []).isEmpty()).toBeFalsy()
    })

})
