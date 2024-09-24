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
}
