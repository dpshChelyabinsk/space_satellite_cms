import strapiClient from "./StrapiClient";

class EventService {
    baseUrl = 'event-tables';
    regUrl = 'visitor-tables';

    async getShortEventList() {
        try {
            const res = await strapiClient.get(`${this.baseUrl}`);

            const events = res.data;

            const simplified = events
                .filter(event =>
                    event.title && event.description && event.type && event.documentId && event.begining
                )
                .map(event => {
                    const { title, description, type, documentId, begining } = event;
                    return { title, description, type, documentId, begining };
                })
                .sort((a, b) => new Date(b.begining) - new Date(a.begining));

            return simplified;
        } catch (error) {
            console.error('Ошибка получения сокращённого списка событий для главной страницы:', error);
            return [];
        }
    }

    async getEventsThumbnails() {
        try {
            const res = await strapiClient.get(
                `${this.baseUrl}?populate=content&pagination[page]=1&pagination[pageSize]=1000`
            );

            const events = res.data;
            const apiBaseUrl = process.env.REACT_APP_STRAPI_API_URL.replace('/api', '');

            const thumbnailsData = events
                .filter(event =>
                    event.title &&
                    event.description &&
                    event.type &&
                    event.documentId &&
                    event.begining &&
                    event.place
                )
                .map(event => {
                    const {
                        title,
                        description,
                        type,
                        documentId,
                        begining,
                        ending,
                        place,
                        content,
                    } = event;

                    const thumbnailUrl = content?.formats?.thumbnail?.url
                        ? `${apiBaseUrl}${content.formats.thumbnail.url}`
                        : null;

                    return {
                        title,
                        description,
                        type,
                        documentId,
                        begining,
                        ending,
                        place,
                        thumbnail: thumbnailUrl,
                    };
                })
                .sort((a, b) => new Date(b.begining) - new Date(a.begining));

            return thumbnailsData;
        } catch (error) {
            console.error('Ошибка получения событий с thumbnail:', error);
            return [];
        }
    }

    async getEventById(id) {
        try {
            const res = await strapiClient.get(`${this.baseUrl}/${id}?populate=content`);
            const event = res.data;

            const {
                title,
                description,
                type,
                documentId,
                begining,
                ending,
                place,
                notice,
                content,
            } = event;

            const apiBaseUrl = process.env.REACT_APP_STRAPI_API_URL.replace('/api', '');

            const image = content?.url
                ? `${apiBaseUrl}${content.url}`
                : content?.formats?.medium?.url
                    ? `${apiBaseUrl}${content.formats.medium.url}`
                    : null;

            const parsedEvent = {
                documentId,
                title,
                description,
                begining,
                ending,
                image,
                notice,
                place,
                type,
            };

            return parsedEvent;
        } catch (error) {
            console.error(`Ошибка получения события с id ${id}:`, error);
            return null;
        }
    }

    async registerVisitor(visitorData) {
        try {
            const res = await strapiClient.post(`${this.regUrl}`, visitorData);

            return res;
        } catch (error) {
            console.error('Ошибка при записи на мероприятие:', error);
            throw error;
        }
    }
}

const eventService = new EventService();
export default eventService;