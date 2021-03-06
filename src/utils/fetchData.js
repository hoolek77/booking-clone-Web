export const fetchData = async (url, method, body = null, token = null) => {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        if(token) {
            options['Authorization'] = 'Bearer ' + token
            options['x-auth-token'] = token
        }

        if(body) {
            options['body'] = 'Bearer ' + body
        }

        const response = await fetch(url, options)

        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}