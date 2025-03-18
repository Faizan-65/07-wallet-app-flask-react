const API_URL = 'http://localhost:5000'

export const signupUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        const data = await response.json()
        if (data.success){
            return {
                success: data.success,
                message: data.message
            }
        }
        return {
            success: data.success,
            error: data.error,
        }
        
    } catch (error) {
        console.error("Signup error:", error)
        return {
            success: false,
            error: "Network error - couldn't connect to server"
        }
    }
}