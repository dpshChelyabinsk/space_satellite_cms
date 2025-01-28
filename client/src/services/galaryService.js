import { API_URL } from "../config/API_CONFIG";

export const getData = async (directory) => {
    const res = await fetch(`${API_URL}/api/files`, {
        method: 'GET',
        headers: {
            'directory': directory,
        },
    });

    if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
    }

    const response = await res.json();
    return response.files;
};