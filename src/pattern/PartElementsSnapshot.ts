
export class PartElementsSnapshot {
    text: string[]
    chords: string[]
    lyrics: string[]
    pictures: string[]

    constructor(text: string[], chords: string[], lyrics: string[], pictures: string[]) {
        this.text = text
        this.chords = chords
        this.lyrics = lyrics
        this.pictures = pictures
    }
}
