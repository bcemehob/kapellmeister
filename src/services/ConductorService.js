
export class ConductorService {

    static durationInBeats(pattern){
        return pattern.duration * pattern.measure.beats
    }

    static isEmpty(pattern){
        return Object.keys(pattern).length === 0;
    }
}
