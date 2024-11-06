import {PartySnapshot} from "@/pattern/PartySnapshot";
import {PartyPerformance} from "@/pattern/PartyPerformance";
import {Party} from "@/pattern/Party";
import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData";
import {PartyElement} from "@/pattern/PartyElement";

const beatValues = (start, duration) => ({start, duration})

const timeline = [
    null,
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6),
        { CHORDS: "element-chords-1-1" }),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6),
        { CHORDS: "element-chords-1-1", LYRICS: "element-lyrics-1-3" }),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6),
        { CHORDS: "element-chords-1-2", LYRICS: "element-lyrics-1-3" }),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6),
        { CHORDS: "element-chords-1-2", LYRICS: "element-lyrics-1-3" }),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6),
        {LYRICS: "element-lyrics-1-3" }),
    new PartySnapshot("performance 1-1", "party1", beatValues(1,6),
        {}),

    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),
    new PartySnapshot("performance 2-1", "party2", beatValues(7,6), {}),

    new PartySnapshot("performance 1-2", "party1", beatValues(13,6),
        { CHORDS: "element-chords-1-1" }),
    new PartySnapshot("performance 1-2", "party1", beatValues(13,6),
        { CHORDS: "element-chords-1-1", LYRICS: "element-lyrics-1-3" }),
    new PartySnapshot("performance 1-2", "party1", beatValues(13,6),
        { CHORDS: "element-chords-1-2", LYRICS: "element-lyrics-1-3" }),
    new PartySnapshot("performance 1-2", "party1", beatValues(13,6),
        { CHORDS: "element-chords-1-2", LYRICS: "element-lyrics-1-3" }),
    new PartySnapshot("performance 1-2", "party1", beatValues(13,6),
        {LYRICS: "element-lyrics-1-3" }),
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

const partyElementsById = {
    "element-chords-1-1": new PartyElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null),
    "element-chords-1-2": new PartyElement("element-chords-1-2", "party1", "CHORDS", 3, 2, "E7", null),
    "element-lyrics-1-3": new PartyElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK", null),
}

const expectedTimeline = new InstrumentTimelineData(
    timeline,
    partiesById,
    partyPerformancesById,
    partyElementsById

)

export default expectedTimeline
