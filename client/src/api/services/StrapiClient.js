class StrapiClient {
    constructor() {
        this.apiUrl = process.env.REACT_APP_STRAPI_API_URL;
        this.token = process.env.REACT_APP_STRAPI_ACCESS_TOKEN;
    }

    getHeaders() {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
        };
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.apiUrl}/${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders(),
            });
            if (!response.ok) {
                throw new Error(`GET ${endpoint} failed`);
            }
            return await response.json();
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.apiUrl}/${endpoint}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ data }),
            });
            if (!response.ok) {
                throw new Error(`POST ${endpoint} failed`);
            }
            return await response.json();
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

const strapiClient = new StrapiClient();
export default strapiClient;
