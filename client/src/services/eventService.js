import {API_EVENTS_URL, API_OLD_URL, API_TOKEN} from "../config/API_CONFIG";

export const getEvents = async () => {
    const res = await fetch(API_EVENTS_URL, {
        headers: {
            authorization: `Bearer ${API_TOKEN}`,
        },
    });
    const { data } = await res.json();
    return data;
};

export const getEventById = async (id, populate = '') => {
    const populateQuery = populate ? `?populate=${populate}` : '';
    const response = await fetch(`${API_OLD_URL}/api/events/${id}${populateQuery}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
};