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

    static async pingLocalhost () {
        try {
            await fetch("http://localhost:3000/setup.js")
            return true
        } catch (error) {
            return false
        }
    }

    static async sendPatternToBackend (pattern) {
        const body = JSON.stringify(pattern)
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        console.log(body)
        const request = new Request("/api/pattern", {
            method: "POST",
            headers: headers,
            body: body,
        })

        const response = await fetch(request)
        console.log(response.status)
    }
}
