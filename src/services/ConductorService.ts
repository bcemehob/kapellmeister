import {Pattern} from "@/pattern/deserialized/Pattern"
import {TimeView} from "@/services/TimeView"

export class ConductorService {
    static SQUARE: number = 4
    static DOUBLE: number = 8;

    static durationInBeats(pattern: Pattern): number {
        if (pattern.isEmpty()) return 0
        return pattern.duration * pattern.measure.beats
    }

    static durationInMeasures(pattern: Pattern, beats: number): number {
        if (pattern.isEmpty()) return 0
        return beats / pattern.measure.beats
    }

    static calculateTimeDuration(pattern: Pattern): TimeView {
        return this.calculateDuration(this.durationInBeats(pattern), pattern.tempo)
    }

    static calculateDuration(durationInBeats: number, tempo: number): TimeView {
        let minutes: number = Math.floor(durationInBeats / tempo)
        const beatRate: number = tempo / 60
        const remainder: number = durationInBeats - minutes * tempo
        const secondsRemainder: number = remainder / beatRate
        let seconds: number = Math.round(secondsRemainder)
        if (seconds >= 60) {
            minutes++
            seconds -= 60
        }
        const secondsStr: string = ('0' + seconds).slice(-2)
        const durationInSeconds: number = minutes * 60 + seconds
        return new TimeView(durationInSeconds, `${minutes}:${secondsStr}`)
    }

    static duration(durationInSeconds: number): TimeView {
        const minutes: number = Math.floor(durationInSeconds / 60)
        const seconds: number = durationInSeconds % 60
        const secondsStr: string = ('0' + seconds).slice(-2)
        return new TimeView(durationInSeconds, `${minutes}:${secondsStr}`)
    }

    static getClassName(pattern: Pattern):string {
        if (pattern.isEmpty()) return ""
        if (pattern.duration % (pattern.measure.beats * this.DOUBLE) === 0) return "great"
        if (pattern.duration % (pattern.measure.beats * this.SQUARE) === 0) return "good"
        if (pattern.duration % pattern.measure.beats === 0) return "ok"
        else return "not-ok"
    }
}
