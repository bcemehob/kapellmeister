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
        return nextSpan && partySpan.start + partySpan.duration >= nextSpan.start
    }

    overlapsPreviousSpan(partySpan, previousSpan) {
        if (!previousSpan) previousSpan = this.previousSpan(partySpan)
        return previousSpan && partySpan.start <= previousSpan.start + previousSpan.duration
    }

    outOfBounds(partySpan) {
        return partySpan.start + partySpan.duration > this.durationInBeats
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
