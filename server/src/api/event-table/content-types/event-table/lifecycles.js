'use strict';

module.exports = {
    async beforeDelete(event) {
        console.log('Хук beforeDelete для события сработал');
        try {
            const { where } = event.params;
            const eventId = where.id;
            console.log(`Удаляется событие с ID: ${eventId}`);

            const visitors = await strapi.entityService.findMany('api::visitor-table.visitor-table', {
                filters: { event: eventId },
            });

            console.log(`Найдено ${visitors.length} связанных посетителей для удаления`);

            event.params.visitorIds = visitors.map(visitor => visitor.id);
        } catch (error) {
            console.error('Ошибка в beforeDelete события:', error);
        }
    },

    async afterDelete(event) {
        console.log('Хук afterDelete для события сработал');
        try {
            const visitorIds = event.params.visitorIds || [];

            if (visitorIds.length > 0) {
                console.log(`Начинаем удаление ${visitorIds.length} связанных посетителей`);

                for (const visitorId of visitorIds) {
                    try {
                        await strapi.entityService.delete('api::visitor-table.visitor-table', visitorId);
                        console.log(`Посетитель с ID ${visitorId} успешно удален`);
                    } catch (deleteError) {
                        console.error(`Ошибка при удалении посетителя ${visitorId}:`, deleteError);
                    }
                }

                console.log(`Удаление связанных посетителей завершено`);
            } else {
                console.log('Нет связанных посетителей для удаления');
            }
        } catch (error) {
            console.error('Ошибка в afterDelete события:', error);
        }
    }
};

//Using logs during test, after all bugs has destroyed - remove logs