import {Pattern} from "@/pattern/Pattern"
import {Measure} from "@/pattern/Measure"
import {PatternParser} from "@/pattern/PatternParser"
import * as fs from "node:fs"
import * as path from "node:path"
import {Instrument} from "@/pattern/Instrument"
import {Party} from "@/pattern/Party"
import {PartyPerformance} from "@/pattern/PartyPerformance"
import {PartyElement} from "@/pattern/PartyElement"


describe('PatternParser', () => {
    const parser = new PatternParser()
    it('can parse pattern from json', () => {
        const json = fs.readFileSync(path.join(__dirname, "./", "pattern-full.json"), "utf-8", (err, data) => {
            return data
        })
        expect(parser.parse(json)).toStrictEqual(expectedPatternFull)
    })
})

const drumParties = [
    new Party('68cb2f88-3148-4d35-8d17-6e8a7e3ed777', 'solid', 8, 0, 0, []),
    new Party('f4961912-92ba-4c8a-8d41-9b8ea4df542a', 'snare trello', 16, 2, 2, [])
]
const saxParties = [
    new Party('04467c20-2ab0-4d04-8f4a-de83662d2211', 'coo-coo', 16, 0, 0),
    new Party('520f6033-91df-44bd-a437-0a849a2f8864', 'whole legato', 16, 1, 3),
    new Party('9af52c3b-fa2f-4b40-a7d9-ddea8c5a84c2', 'fast chaos', 16, 3, 1)
]

const saxCooCooPartyElements = [
    new PartyElement('3d0dafe7-0863-4be1-b9e0-f850cfd537a1', saxParties[0].id, 'CHORDS', 1, 4, 'Am', null),
    new PartyElement('043155d4-21b5-4b54-8be5-6fb2c5edcb18', saxParties[0].id, 'CHORDS', 5, 4, 'E7', null),
    new PartyElement('c8a5daea-83ef-4ac6-adcf-221547f8bbe8', saxParties[0].id, 'CHORDS', 9, 4, 'Dm', null),
    new PartyElement('4b6a5cd1-ea72-4d79-82ae-f1455634f197', saxParties[0].id, 'CHORDS', 13, 4, 'E7', null)
]

const drumPerformances = [
    new PartyPerformance('85dac6d5-39a7-4b6b-a833-e74814f93732',  1, drumParties[0].id),
    new PartyPerformance('3ef47e4c-b728-4b02-b8b6-bdd369fa9a48', 25, drumParties[0].id),
    new PartyPerformance('607bd531-6787-4db9-86bc-2befce9bf9bf', 49, drumParties[0].id),
    new PartyPerformance('c8a95c5d-9419-465a-96b8-3b061e89e5f3', 9, drumParties[1].id),
    new PartyPerformance('6fbdff67-475a-459f-bbc5-053d537c4cc2', 41, drumParties[1].id),
]

const saxPerformances = [
    new PartyPerformance('27017e6b-f0e6-417f-a5fd-2444b2ecab80',5, saxParties[0].id),
    new PartyPerformance('22e37f73-67d0-42eb-a23d-210d89c2ac95',33, saxParties[0].id),
    new PartyPerformance('b3cde4aa-06f6-4bcb-aa2d-064b4273d126',57, saxParties[0].id),
    new PartyPerformance('a0aa6924-0b01-4ee0-9c4a-e77fc77e7280',9, saxParties[1].id),
    new PartyPerformance('941a9500-7e81-4024-af05-cef09446b9d0',41, saxParties[1].id),
    new PartyPerformance('e407e4d4-d2d2-4047-b411-595a8a17e618',25, saxParties[2].id),
    new PartyPerformance('e0a0f22d-2640-42e5-bb3b-0d1c25e06641',49, saxParties[2].id),
]

const instruments = [
    new Instrument('4ef4390b-eb61-40d9-9134-06b499f160aa', 'drum', drumPerformances, drumParties, []),
    new Instrument('9de4792d-6caf-4ad1-b668-b65328e167c4', 'saxo', saxPerformances, saxParties, saxCooCooPartyElements)
]

const expectedPatternFull = new Pattern('test name', 120, 8, new Measure(4, 3), instruments)
