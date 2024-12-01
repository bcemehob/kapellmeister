import {PatternParser} from "@/pattern/PatternParser"
import * as fs from "node:fs"
import * as path from "node:path"
import {pattern} from "./patternModel";


describe('Serializer', () => {
    const parser = new PatternParser()
    it('can create model pattern file', async () => {
        const patternStr = JSON.stringify(pattern)
        fs.writeFile(
            path.join(__dirname, "./", "pattern-model.json"),
            patternStr,
            err => console.log(err))
    })
})




