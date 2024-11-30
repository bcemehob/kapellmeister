export class Part {
    id: string
    name: string
    duration: number
    anacrusis: number
    clausula: number

    constructor(
        id: string,
        name: string,
        duration: number,
        anacrusis: number,
        clausula?: number
    ) {
        this.id = id
        this.name = name
        this.duration = duration
        this.anacrusis = anacrusis
        this.clausula = clausula || 0
    }

    public static instance(obj: any): Part {
        return new Part(obj.id, obj.name, obj.duration, obj.anacrusis, obj.clausula)
    }
}
