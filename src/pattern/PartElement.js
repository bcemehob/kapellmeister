export class PartElement {
    constructor(id, partId, type, start, duration, text, picture) {
        this.id = id
        this.partId = partId
        this.type = type
        this.start = start
        this.duration = duration
        this.text = text
        this.picture = picture
    }

    end(){
        return this.start + this.duration - 1
    }
}
