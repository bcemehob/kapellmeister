import {PartSnapshot} from "@/pattern/PartSnapshot"
import {PartPerformance} from "@/pattern/PartPerformance"
import {Part} from "@/pattern/Part"
import {InstrumentTimelineData} from "@/pattern/InstrumentTimelineData"
import {PartElement} from "@/pattern/PartElement"
import {beatValues, snapshotElements} from "../../utils/TestUtils";


const timeline = [
    new PartSnapshot(null, 1, null, null, snapshotElements()),

    new PartSnapshot("performance 1-1", 7, "party1", beatValues(1,6), snapshotElements( "CHORDS", "element-chords-1-1")),
    new PartSnapshot("performance 1-1", 7, "party1", beatValues(1,6), snapshotElements( "CHORDS", "element-chords-1-1", "LYRICS", "element-lyrics-1-3")),
    new PartSnapshot("performance 1-1", 7, "party1", beatValues(1,6), snapshotElements( "CHORDS", "element-chords-1-2", "LYRICS", "element-lyrics-1-3" )),
    new PartSnapshot("performance 1-1", 7, "party1", beatValues(1,6), snapshotElements( "CHORDS", "element-chords-1-2", "LYRICS", "element-lyrics-1-3" )),
    new PartSnapshot("performance 1-1", 7, "party1", beatValues(1,6), snapshotElements( "LYRICS", "element-lyrics-1-3" )),
    new PartSnapshot("performance 1-1", 7, "party1", beatValues(1,6), snapshotElements()),

    new PartSnapshot("performance 2-1", 13, "party2", beatValues(7,6), snapshotElements()),
    new PartSnapshot("performance 2-1", 13, "party2", beatValues(7,6), snapshotElements()),
    new PartSnapshot("performance 2-1", 13, "party2", beatValues(7,6), snapshotElements()),
    new PartSnapshot("performance 2-1", 13, "party2", beatValues(7,6), snapshotElements()),
    new PartSnapshot("performance 2-1", 13, "party2", beatValues(7,6), snapshotElements()),
    new PartSnapshot("performance 2-1", 13, "party2", beatValues(7,6), snapshotElements()),

    new PartSnapshot("performance 1-2", 19, "party1", beatValues(13,6), snapshotElements( "CHORDS", "element-chords-1-1")),
    new PartSnapshot("performance 1-2", 19, "party1", beatValues(13,6), snapshotElements( "CHORDS", "element-chords-1-1", "LYRICS", "element-lyrics-1-3")),
    new PartSnapshot("performance 1-2", 19, "party1", beatValues(13,6), snapshotElements( "CHORDS", "element-chords-1-2", "LYRICS", "element-lyrics-1-3" )),
    new PartSnapshot("performance 1-2", 19, "party1", beatValues(13,6), snapshotElements( "CHORDS", "element-chords-1-2", "LYRICS", "element-lyrics-1-3" )),
    new PartSnapshot("performance 1-2", 19, "party1", beatValues(13,6), snapshotElements( "LYRICS", "element-lyrics-1-3" )),
    new PartSnapshot("performance 1-2", 19, "party1", beatValues(13,6), snapshotElements()),

    new PartSnapshot("performance 2-2", null, "party2", beatValues(19,6), snapshotElements()),
    new PartSnapshot("performance 2-2", null, "party2", beatValues(19,6), snapshotElements()),
    new PartSnapshot("performance 2-2", null, "party2", beatValues(19,6), snapshotElements()),
    new PartSnapshot("performance 2-2", null, "party2", beatValues(19,6), snapshotElements()),
    new PartSnapshot("performance 2-2", null, "party2", beatValues(19,6), snapshotElements()),
    new PartSnapshot("performance 2-2", null, "party2", beatValues(19,6), snapshotElements()),
]

const partsById = new Map<string, Part>()
partsById.set("party1",new Part("party1", "first", 2, 0, 0))
partsById.set("party2",new Part("party2", "second", 2, 0, 0))


const partPerformancesById = new Map<string, PartPerformance>()
partPerformancesById.set("performance 1-1", new PartPerformance("performance 1-1", 1, "party1"))
partPerformancesById.set("performance 1-2", new PartPerformance("performance 1-2", 5, "party1"))
partPerformancesById.set("performance 2-1", new PartPerformance("performance 2-1", 3, "party2"))
partPerformancesById.set("performance 2-2", new PartPerformance("performance 2-2", 7, "party2"))


const partElementsById = new Map<string, PartElement>()
partElementsById.set("element-chords-1-1", new PartElement("element-chords-1-1", "party1", "CHORDS", 1, 2, "Am", null))
partElementsById.set("element-chords-1-2", new PartElement("element-chords-1-2", "party1", "CHORDS", 3, 2, "E7", null))
partElementsById.set("element-lyrics-1-3", new PartElement("element-lyrics-1-3", "party1", "LYRICS", 2, 4, "BO-OT-TA-AK",null))

const expectedTimeline = InstrumentTimelineData.instance({
        timeline,
        partsById,
        partPerformancesById,
        partElementsById
    }
)

export default expectedTimeline
