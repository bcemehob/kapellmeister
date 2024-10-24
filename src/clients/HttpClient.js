export class HttpClient {
    static async requestPatternFromBackend (){
        try {
            const response = await fetch("/api/pattern")
            if (response.ok) return await response.json()
        } catch (error) {
            console.error("Error while fetching pattern", error)
        }
        return null
    }

    static async sendPatternToBackend (pattern) {
        const body = JSON.stringify(pattern)
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const request = new Request("/api/pattern", {
            method: "POST",
            headers: headers,
            body: body,
        })
        await fetch(request)
    }

    static async sendMessageToBackend (message) {
        const body = JSON.stringify(message)
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const request = new Request("/api/msg", {
            method: "POST",
            headers: headers,
            body: body,
        })
        await fetch(request)
    }
}
