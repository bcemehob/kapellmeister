import {ConductorService} from "@/services/ConductorService";

export class TimelineService {
    constructor(durationInMeasures, measure) {
        this.measure = measure
        this.durationInBeats = durationInMeasures * measure.beats
    }

    partySpans(instrument) {
        return instrument.parties
            .flatMap(party => party.spans.map((span, i) => this.partySpan(party.name, span, i, instrument)))
            .sort((a, b) => a.start - b.start)
    }

    nextSpan(partySpan) {
        return this.partySpans(partySpan.instrument)
            .find(otherSpan => otherSpan.id !== partySpan.id && otherSpan.start > partySpan.start)
    }

    previousSpan(partySpan) {
        return this.partySpans(partySpan.instrument)
            .sort((a, b) => b.start - a.start)
            .find(otherSpan => otherSpan.id !== partySpan.id && otherSpan.start < partySpan.start)
    }

    canStretch(partySpan) {
        return partySpan.duration >= 16 && !this.outOfBounds(partySpan) && !this.overlapsNextSpan(partySpan)
    }

    canMove(partySpan) {
        return partySpan.start >= 1 && !this.outOfBounds(partySpan) && !this.overlapsNextSpan(partySpan)
    }

    overlapsNextSpan(partySpan, nextSpan) {
        if (!nextSpan) nextSpan = this.nextSpan(partySpan)
        return nextSpan && partySpan.start + partySpan.duration > nextSpan.start
    }

    overlapsPreviousSpan(partySpan, previousSpan) {
        if (!previousSpan) previousSpan = this.previousSpan(partySpan)
        return previousSpan && partySpan.start <= previousSpan.start + previousSpan.duration
    }

    outOfBounds(partySpan) {
        return partySpan.start + partySpan.duration > this.durationInBeats
    }

    changeSpanDuration(partySpan, delta) {
        partySpan.duration = partySpan.initialDuration + Math.ceil(delta / 3)
        const nxSpan = this.nextSpan(partySpan)
        const measureBeats = this.measure.beats
        let remainder = partySpan.duration % measureBeats
        if (remainder > measureBeats / 2) partySpan.duration += measureBeats - remainder
        else partySpan.duration -= remainder
        if (partySpan.duration < measureBeats * ConductorService.SQUARE) {
            partySpan.duration = measureBeats * ConductorService.SQUARE
        }
        if (!nxSpan && partySpan.start + partySpan.duration > this.durationInBeats) {
            partySpan.duration = this.durationInBeats - partySpan.start + 1
        } else if (nxSpan && partySpan.start + partySpan.duration >= nxSpan.start) {
            partySpan.duration = nxSpan.start - partySpan.start
        }
    }

    changeSpanStart(partySpan, delta) {
        const nxSpan = this.nextSpan(partySpan)
        const prevSpan = this.previousSpan(partySpan)
        partySpan.start = partySpan.initialStart + Math.ceil(delta / 3)
        const measureBeats = this.measure.beats
        if (partySpan.start < 1) {
            partySpan.start = 1
        }
        let remainder = partySpan.start % measureBeats
        if (remainder > measureBeats / 2) partySpan.start += measureBeats - remainder + 1
        else partySpan.start -= remainder - 1

        if (!nxSpan && partySpan.start + partySpan.duration > this.durationInBeats) {
            partySpan.start = this.durationInBeats - partySpan.duration + 1
        } else if (nxSpan && partySpan.start + partySpan.duration >= nxSpan.start) {
            partySpan.start = nxSpan.start - partySpan.duration
        } else if (prevSpan && partySpan.start <= prevSpan.start + prevSpan.duration) {
            partySpan.start = prevSpan.start + prevSpan.duration
        }
    }

    move(partySpan, delta) {
        if (Math.abs(delta) < 6) return
        partySpan.start = partySpan.initialStart + Math.ceil(delta / 3)
        if (!this.canMove(partySpan)) {
            partySpan.start = partySpan.initialStart
            return
        }
        partySpan.span[0] = partySpan.start
    }

    partySpan(partyName, span, i, instrument) {
        return {
            id: `${partyName}-${i}`,
            name: partyName,
            start: span[0],
            duration: span[1],
            initialStart: span[0],
            initialDuration: span[1],
            instrument,
            span
        }
    }
}
