export class ConductorService {
    static SQUARE = 4
    static DOUBLE = 8;

    static durationInBeats(pattern) {
        if (this.isEmpty(pattern)) return 0
        return pattern.duration * pattern.measure.beats
    }

    static durationInMeasures(pattern, beats) {
        if (this.isEmpty(pattern)) return 0
        return beats / pattern.measure.beats
    }

    static isEmpty(pattern) {
        return Object.keys(pattern).length === 0;
    }

    static calculateTimeDuration(pattern) {
        return this.calculateDuration(this.durationInBeats(pattern), pattern.tempo)
    }

    static calculateDuration(durationInBeats, tempo) {
        let minutes = Math.floor(durationInBeats / tempo)
        const beatRate = tempo / 60
        const remainder = durationInBeats - minutes * tempo
        const secondsRemainder = remainder / beatRate
        let seconds = Math.round(secondsRemainder)
        if (seconds >= 60) {
            minutes++
            seconds -= 60
        }
        let secondsStr = ('0' + seconds).slice(-2)
        return {
            seconds: minutes * 60 + seconds,
            timeString: `${minutes}:${secondsStr}`
        }
    }

    static duration(durationInSeconds) {
        const minutes = Math.floor(durationInSeconds / 60)
        const seconds = durationInSeconds % 60
        const secondsStr = ('0' + seconds).slice(-2)
        return {
            seconds: durationInSeconds,
            timeString: `${minutes}:${secondsStr}`
        }
    }

    static getClassName(pattern) {
        if (this.isEmpty(pattern)) return ""
        if (pattern.duration % (pattern.measure.beats * this.DOUBLE) === 0) return "great"
        if (pattern.duration % (pattern.measure.beats * this.SQUARE) === 0) return "good"
        if (pattern.duration % pattern.measure.beats === 0) return "ok"
        else return "not-ok"
    }
}
