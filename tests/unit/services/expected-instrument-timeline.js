import {PartySnapshot} from "@/pattern/PartySnapshot";
import {PartyPerformance} from "@/pattern/PartyPerformance";
import {Party} from "@/pattern/Party";
import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData";

const beatValues = (start, duration) => ({start, duration})

const timeline = [
    null,
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6), {}),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6), {}),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6), {}),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6), {}),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6), {}),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6), {}),

    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),

    new PartySnapshot("performance 1-2", "party1", beatValues(13,6), {}),
    new PartySnapshot("performance 1-2", "party1", beatValues(13,6), {}),
    new PartySnapshot("performance 1-2", "party1", beatValues(13,6), {}),
    new PartySnapshot("performance 1-2", "party1", beatValues(13,6), {}),
    new PartySnapshot("performance 1-2", "party1", beatValues(13,6), {}),
    new PartySnapshot("performance 1-2", "party1", beatValues(13,6), {}),

    new PartySnapshot("performance 2-2", "party2", beatValues(19,6), {}),
    new PartySnapshot("performance 2-2", "party2", beatValues(19,6), {}),
    new PartySnapshot("performance 2-2", "party2", beatValues(19,6), {}),
    new PartySnapshot("performance 2-2", "party2", beatValues(19,6), {}),
    new PartySnapshot("performance 2-2", "party2", beatValues(19,6), {}),
    new PartySnapshot("performance 2-2", "party2", beatValues(19,6), {}),
]

const partiesById = {
    "party1": new Party("party1", "first", 2, 0, 0),
    "party2": new Party("party2", "second", 2, 0, 0)
}
const partyPerformancesById = {
    "performance 1-1": new PartyPerformance("performance 1-1", 1, "party1"),
    "performance 1-2": new PartyPerformance("performance 1-2", 5, "party1"),
    "performance 2-1": new PartyPerformance("performance 2-1", 3, "party2"),
    "performance 2-2": new PartyPerformance("performance 2-2", 7, "party2")
}

const expectedTimeline = new InstrumentTimelineData(
    timeline,
    partiesById,
    partyPerformancesById,
    {}
)

export default expectedTimeline
