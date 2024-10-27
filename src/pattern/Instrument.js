import {v4 as uuidv4} from 'uuid'

export class Instrument {
    id
    name
    partyPerformances
    parties
    constructor(id, name, partyPerformances, parties) {
        this.id = uuidv4()
        this.name = name
        this.partyPerformances = partyPerformances
        this.parties = parties
    }
}
