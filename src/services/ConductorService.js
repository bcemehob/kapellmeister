
export class ConductorService {

    static durationInBeats(pattern){
        return pattern.duration * pattern.measure.beats
    }
}
