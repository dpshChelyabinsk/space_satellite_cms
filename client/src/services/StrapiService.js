class StrapiService {
    constructor() {
        this.apiUrl = process.env.REACT_APP_STRAPI_API_URL || 'http://localhost:1337/api';
        this.token = process.env.REACT_APP_STRAPI_ACCESS_TOKEN || null;
    }

    // Установить токен авторизации
    setToken(token) {
        this.token = token;
    }

    // Получить токен авторизации
    getToken() {
        return this.token;
    }

    // Создать заголовки для запросов
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Отправить GET запрос
    async get(endpoint, params = {}) {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = `${this.apiUrl}/${endpoint}${queryParams ? `?${queryParams}` : ''}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка при выполнении GET запроса:', error);
            throw error;
        }
    }

    // Отправить POST запрос
    async post(endpoint, data = {}) {
        try {
            const url = `${this.apiUrl}/${endpoint}`;

            const response = await fetch(url, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка при выполнении POST запроса:', error);
            throw error;
        }
    }

    // Отправить PUT запрос
    async put(endpoint, data = {}) {
        try {
            const url = `${this.apiUrl}/${endpoint}`;

            const response = await fetch(url, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка при выполнении PUT запроса:', error);
            throw error;
        }
    }

    // Отправить DELETE запрос
    async delete(endpoint) {
        try {
            const url = `${this.apiUrl}/${endpoint}`;

            const response = await fetch(url, {
                method: 'DELETE',
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка при выполнении DELETE запроса:', error);
            throw error;
        }
    }

    // Авторизация пользователя
    async login(identifier, password) {
        try {
            const response = await this.post('auth/local', {
                identifier,
                password,
            });

            if (response.jwt) {
                this.setToken(response.jwt);
                return response;
            } else {
                throw new Error('Токен не получен');
            }
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            throw error;
        }
    }

    // Регистрация пользователя
    async register(username, email, password) {
        try {
            const response = await this.post('auth/local/register', {
                username,
                email,
                password,
            });

            if (response.jwt) {
                this.setToken(response.jwt);
                return response;
            } else {
                throw new Error('Токен не получен');
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            throw error;
        }
    }

    // Получить данные о текущем пользователе
    async getCurrentUser() {
        try {
            return await this.get('users/me');
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
            throw error;
        }
    }
}

// Экспортируем singleton-инстанс сервиса
const strapiService = new StrapiService();
export default strapiService;