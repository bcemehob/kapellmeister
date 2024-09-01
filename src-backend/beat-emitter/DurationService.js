module.exports = class ConductorService {
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

}
