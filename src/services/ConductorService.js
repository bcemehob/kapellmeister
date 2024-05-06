export class ConductorService {
    static SQUARE = 4
    static DOUBLE = 8;
    static durationInBeats(pattern){
        return pattern.duration * pattern.measure.beats
    }

    static isEmpty(pattern){
        return Object.keys(pattern).length === 0;
    }
}
