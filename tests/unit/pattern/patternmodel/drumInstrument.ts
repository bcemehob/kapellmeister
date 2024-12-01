import {Part} from "@/pattern/deserialized/Part";
import {PartPerformance} from "@/pattern/deserialized/PartPerformance";
import {PartElement} from "@/pattern/deserialized/PartElement";
import {Instrument} from "@/pattern/deserialized/Instrument";
import {PartSnapshot} from "@/pattern/PartSnapshot";
import {beatValues, snapshotElements} from "../../../utils/TestUtils";
import {generateUUID} from "@/services/InstrumentService";

const part1 = new Part(generateUUID(), 'drum part 1', 1, 0, 0)
const part2 = new Part(generateUUID(), 'drum part 2', 1, 0, 0)
const perf1 = new PartPerformance(generateUUID(), 1, part1.id)
const perf2 = new PartPerformance(generateUUID(), 2, part2.id)
const perf3 = new PartPerformance(generateUUID(), 3, part1.id)
const perf4 = new PartPerformance(generateUUID(), 4, part2.id)
const perf5 = new PartPerformance(generateUUID(), 5, part1.id)
const perf6 = new PartPerformance(generateUUID(), 6, part2.id)
const perf7 = new PartPerformance(generateUUID(), 7, part1.id)
const perf8 = new PartPerformance(generateUUID(), 8, part2.id)
const perf9 = new PartPerformance(generateUUID(), 9, part1.id)
const perf10 = new PartPerformance(generateUUID(), 10, part2.id)
const partElement1 = new PartElement(generateUUID(), part1.id, 'PATTERN', 1, 4, '1___1___', null)
const partElement2 = new PartElement(generateUUID(), part2.id, 'PATTERN', 1, 4, '1_1_1_1_', null)
export const drums = new Instrument(
    generateUUID(),
    'drums',
    [perf1, perf2, perf3, perf4, perf5, perf6, perf7, perf8, perf9, perf10],
    [part1, part2],
    [partElement1, partElement2])

export const mappedParts = (): Map<string, Part> => {
    return new Map<string, Part>([
        [part1.id, part1],
        [part2.id, part2]
    ])
}

export const mappedPartPerformances = (): Map<string, PartPerformance> => {
    return new Map<string, PartPerformance>([
        [perf1.id, perf1],
        [perf2.id, perf2],
        [perf3.id, perf3],
        [perf4.id, perf4],
        [perf5.id, perf5],
        [perf6.id, perf6],
        [perf7.id, perf7],
        [perf8.id, perf8],
        [perf9.id, perf9],
        [perf10.id, perf10],
    ])
}

export const mappedPartElements = (): Map<string, PartElement> => {
    return new Map<string, PartElement>([
        [partElement2.id, partElement2],
    ])
}

export const expectedDrumTimeline = [
    new PartSnapshot(null, 1, null, null, snapshotElements()),

    new PartSnapshot(perf1.id, 5, part1.id, beatValues(1, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf1.id, 5, part1.id, beatValues(1, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf1.id, 5, part1.id, beatValues(1, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf1.id, 5, part1.id, beatValues(1, 4), snapshotElements('PATTERN', partElement1.id)),

    new PartSnapshot(perf2.id, 9, part2.id, beatValues(5, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf2.id, 9, part2.id, beatValues(5, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf2.id, 9, part2.id, beatValues(5, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf2.id, 9, part2.id, beatValues(5, 4), snapshotElements('PATTERN', partElement2.id)),

    new PartSnapshot(perf3.id, 13, part1.id, beatValues(9, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf3.id, 13, part1.id, beatValues(9, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf3.id, 13, part1.id, beatValues(9, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf3.id, 13, part1.id, beatValues(9, 4), snapshotElements('PATTERN', partElement1.id)),

    new PartSnapshot(perf4.id, 17, part2.id, beatValues(13, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf4.id, 17, part2.id, beatValues(13, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf4.id, 17, part2.id, beatValues(13, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf4.id, 17, part2.id, beatValues(13, 4), snapshotElements('PATTERN', partElement2.id)),

    new PartSnapshot(perf5.id, 21, part1.id, beatValues(17, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf5.id, 21, part1.id, beatValues(17, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf5.id, 21, part1.id, beatValues(17, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf5.id, 21, part1.id, beatValues(17, 4), snapshotElements('PATTERN', partElement1.id)),

    new PartSnapshot(perf6.id, 25, part2.id, beatValues(21, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf6.id, 25, part2.id, beatValues(21, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf6.id, 25, part2.id, beatValues(21, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf6.id, 25, part2.id, beatValues(21, 4), snapshotElements('PATTERN', partElement2.id)),

    new PartSnapshot(perf7.id, 29, part1.id, beatValues(25, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf7.id, 29, part1.id, beatValues(25, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf7.id, 29, part1.id, beatValues(25, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf7.id, 29, part1.id, beatValues(25, 4), snapshotElements('PATTERN', partElement1.id)),

    new PartSnapshot(perf8.id, 33, part2.id, beatValues(29, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf8.id, 33, part2.id, beatValues(29, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf8.id, 33, part2.id, beatValues(29, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf8.id, 33, part2.id, beatValues(29, 4), snapshotElements('PATTERN', partElement2.id)),

    new PartSnapshot(perf9.id, 37, part1.id, beatValues(33, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf9.id, 37, part1.id, beatValues(33, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf9.id, 37, part1.id, beatValues(33, 4), snapshotElements('PATTERN', partElement1.id)),
    new PartSnapshot(perf9.id, 37, part1.id, beatValues(33, 4), snapshotElements('PATTERN', partElement1.id)),

    new PartSnapshot(perf10.id, null, part2.id, beatValues(37, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf10.id, null, part2.id, beatValues(37, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf10.id, null, part2.id, beatValues(37, 4), snapshotElements('PATTERN', partElement2.id)),
    new PartSnapshot(perf10.id, null, part2.id, beatValues(37, 4), snapshotElements('PATTERN', partElement2.id)),
]


