import {BeatValues} from "@/pattern/BeatValues";

export const beatValues = (start: number, duration: number) => new BeatValues(start, duration)

export const snapshotElements = function (...args: string[]): Map<string, string> {
    if (args.length % 2 !== 0) throw Error("wrong arguments count")
    const result = new Map<string, string>()
    for (let i = 0; i < args.length; i += 2) {
        result.set(args[i], args[i + 1])
    }
    return result
}

