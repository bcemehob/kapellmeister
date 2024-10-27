import {v4 as uuidv4} from 'uuid'

export class Party {
    id
    name = null
    duration = 0
    anacrusis = 0

    constructor(name, duration, anacrusis) {
        this.id = uuidv4()
        this.duration = duration
        this.anacrusis = anacrusis
    }
}
