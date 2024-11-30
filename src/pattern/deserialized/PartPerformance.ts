export class PartPerformance {
    id: string
    start: number
    partId: string

    constructor(id: string, start: number, partId: string) {
        this.id = id
        this.start = start
        this.partId = partId
    }

    public static instance(obj: any): PartPerformance {
        return new PartPerformance(obj.id, obj.start, obj.partId)
    }
}
