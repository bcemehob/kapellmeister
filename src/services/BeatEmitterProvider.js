import {BeatEmitter} from "@/services/BeatEmitter";
import {BeatEmitterServer} from "@/services/BeatEmitterServer";
export class BeatEmitterProvider {
    constructor(tempo, duration, prerollBeats, serverBeatEmitterEnabled) {
        this.tempo = tempo
        this.duration = duration
        this.prerollBeats = prerollBeats
        this.serverBeatEmitterEnabled = serverBeatEmitterEnabled
    }

    get() {
        return this.serverBeatEmitterEnabled ?
            new BeatEmitterServer(this.tempo, this.duration, this.prerollBeats) :
            new BeatEmitter(this.tempo, this.duration, this.prerollBeats)
    }
}
