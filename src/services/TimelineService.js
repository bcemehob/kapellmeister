export class TimelineService {
    partySpans(instrument) {
        return instrument.parties
            .flatMap(party => party.spans.map(span => this.partySpan(party.name, span, instrument)))
            .sort((a, b) => a.start - b.start)
    }

    nextSpan(partySpan)  {
        return this.partySpans(partySpan.instrument).find(otherSpan => otherSpan.start > partySpan.start)
    }

    canStretch(partySpan) {
        if (partySpan.duration < 16) return false
        return partySpan.start + partySpan.duration < this.nextSpan(partySpan).start;

    }

    partySpan(partyName, span, instrument) {
        return {
            id: `${partyName}-${span[0]}`,
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
