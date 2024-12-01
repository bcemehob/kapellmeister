export class PartElement {
    public id: string
    public partId: string
    public type: string
    public start: number
    public duration: number
    public text: string
    public picture: string | null

    constructor(
        id: string,
        partId: string,
        type: string,
        start: number,
        duration: number,
        text: string,
        picture: string | null
    ) {
        this.id = id
        this.partId = partId
        this.type = type
        this.start = start
        this.duration = duration
        this.text = text
        this.picture = picture
    }

    get end() {
        return this.start + this.duration - 1
    }

    public static instance(object: any) {
        return new PartElement(object.id, object.partId, object.type, object.start, object.duration, object.text, object.picture)
    }
}
