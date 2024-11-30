import {Pattern} from "@/pattern/deserialized/Pattern";
import {Measure} from "@/pattern/deserialized/Measure";
import { sax } from "./saxInstrument";
import {drums} from "./drumInstrument";

export const pattern = new Pattern(
    "test pattern",
    120,
    10,
    new Measure(4, 4),
    [sax, drums]
)
