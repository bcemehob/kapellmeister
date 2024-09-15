import {BeatEmitter} from "@/services/BeatEmitter";
import {BeatEmitterProxy} from "@/services/BeatEmitterProxy";
export class BeatEmitterProvider {
    constructor(tempo, duration, prerollBeats, serverBeatEmitterEnabled) {
        this.tempo = tempo
        this.duration = duration
        this.prerollBeats = prerollBeats
        this.serverBeatEmitterEnabled = serverBeatEmitterEnabled
    }

    get() {
        return this.serverBeatEmitterEnabled ?
            new BeatEmitterProxy(this.tempo, this.duration, this.prerollBeats) :
            new BeatEmitter(this.tempo, this.duration, this.prerollBeats)
    }
}
