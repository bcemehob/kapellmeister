import {Part} from "@/pattern/deserialized/Part";
import {PartPerformance} from "@/pattern/deserialized/PartPerformance";
import {PartElement} from "@/pattern/deserialized/PartElement";
import {Instrument} from "@/pattern/deserialized/Instrument";
import {PartSnapshot} from "@/pattern/PartSnapshot";
import {beatValues, snapshotElements} from "../../../utils/TestUtils";
import {generateUUID} from "@/services/InstrumentService";

const part1 = new Part(generateUUID(), 'sax part 1', 2, 0, 0)
const part2 = new Part(generateUUID(), 'sax part 2', 2, 0, 0)
const part1Performance1 = new PartPerformance(generateUUID(), 1, part1.id)
const part1Performance2 = new PartPerformance(generateUUID(), 5, part1.id)
const part2Performance1 = new PartPerformance(generateUUID(), 3, part2.id)
const part2Performance2 = new PartPerformance(generateUUID(), 9, part2.id)
const part2Element1 = new PartElement(generateUUID(), part2.id, 'CHORDS', 1, 4, 'Am', null)
const part2Element2 = new PartElement(generateUUID(), part2.id, 'CHORDS', 5, 2, 'E', null)
const part2Element3 = new PartElement(generateUUID(), part2.id, 'LYRICS', 5, 4, 'Foo', null)
export const sax = new Instrument(
    generateUUID(),
    'saxophone',
    [part1Performance1, part1Performance2, part2Performance1, part2Performance2],
    [part1, part2],
    [part2Element1, part2Element2, part2Element3])

export const mappedParts = (): Map<string, Part> => {
    return new Map<string, Part>([
        [part1.id, part1],
        [part2.id, part2]
    ])
}

export const mappedPartPerformances = (): Map<string, PartPerformance> => {
    return new Map<string, PartPerformance>([
        [part1Performance1.id, part1Performance1],
        [part1Performance2.id, part1Performance2],
        [part2Performance1.id, part2Performance1],
        [part2Performance2.id, part2Performance2]
    ])
}

export const mappedPartElements = (): Map<string, PartElement> => {
    return new Map<string, PartElement>([
        [part2Element1.id, part2Element1],
        [part2Element2.id, part2Element2],
        [part2Element3.id, part2Element3]
    ])
}

export const expectedTimeline = [
    new PartSnapshot(null, 1, null, null, snapshotElements(), null),

    new PartSnapshot(part1Performance1.id, null, part1.id, beatValues(1, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance1.id, null, part1.id, beatValues(1, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance1.id, null, part1.id, beatValues(1, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance1.id, null, part1.id, beatValues(1, 8), snapshotElements(), null),

    new PartSnapshot(part1Performance1.id, 9, part1.id, beatValues(1, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance1.id, 9, part1.id, beatValues(1, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance1.id, 9, part1.id, beatValues(1, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance1.id, 9, part1.id, beatValues(1, 8), snapshotElements(), null),

    new PartSnapshot(part2Performance1.id, null, part2.id, beatValues(9, 8), snapshotElements('CHORDS', part2Element1.id), null),
    new PartSnapshot(part2Performance1.id, null, part2.id, beatValues(9, 8), snapshotElements('CHORDS', part2Element1.id), null),
    new PartSnapshot(part2Performance1.id, null, part2.id, beatValues(9, 8), snapshotElements('CHORDS', part2Element1.id), null),
    new PartSnapshot(part2Performance1.id, null, part2.id, beatValues(9, 8), snapshotElements('CHORDS', part2Element1.id), null),

    new PartSnapshot(part2Performance1.id, 17, part2.id, beatValues(9, 8), snapshotElements('CHORDS', part2Element2.id, 'LYRICS', part2Element3.id), null),
    new PartSnapshot(part2Performance1.id, 17, part2.id, beatValues(9, 8), snapshotElements('CHORDS', part2Element2.id, 'LYRICS', part2Element3.id), null),
    new PartSnapshot(part2Performance1.id, 17, part2.id, beatValues(9, 8), snapshotElements('LYRICS', part2Element3.id), null),
    new PartSnapshot(part2Performance1.id, 17, part2.id, beatValues(9, 8), snapshotElements('LYRICS', part2Element3.id), null),

    new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17, 8), snapshotElements(), null),

    new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17, 8), snapshotElements(), null),
    new PartSnapshot(part1Performance2.id, null, part1.id, beatValues(17, 8), snapshotElements(), null),

    new PartSnapshot(null, null, null, null, snapshotElements(), null),
    new PartSnapshot(null, null, null, null, snapshotElements(), null),
    new PartSnapshot(null, null, null, null, snapshotElements(), null),
    new PartSnapshot(null, null, null, null, snapshotElements(), null),

    new PartSnapshot(null, 33, null, null, snapshotElements(), null),
    new PartSnapshot(null, 33, null, null, snapshotElements(), null),
    new PartSnapshot(null, 33, null, null, snapshotElements(), null),
    new PartSnapshot(null, 33, null, null, snapshotElements(), null),

    new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33, 8), snapshotElements('CHORDS', part2Element1.id), null),
    new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33, 8), snapshotElements('CHORDS', part2Element1.id), null),
    new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33, 8), snapshotElements('CHORDS', part2Element1.id), null),
    new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33, 8), snapshotElements('CHORDS', part2Element1.id), null),

    new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33, 8), snapshotElements('CHORDS', part2Element2.id, 'LYRICS', part2Element3.id), null),
    new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33, 8), snapshotElements('CHORDS', part2Element2.id, 'LYRICS', part2Element3.id), null),
    new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33, 8), snapshotElements('LYRICS', part2Element3.id), null),
    new PartSnapshot(part2Performance2.id, null, part2.id, beatValues(33, 8), snapshotElements('LYRICS', part2Element3.id), null),
]


