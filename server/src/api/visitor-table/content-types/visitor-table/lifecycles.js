'use strict';

module.exports = {
    async afterCreate(event) {
        console.log('Хук afterCreate сработал');
        try {
            const { result } = event;
            console.log('Созданный посетитель:', JSON.stringify(result, null, 2));

            const visitorId = result.id;

            const visitor = await strapi.entityService.findOne('api::visitor-table.visitor-table', visitorId, {
                populate: ['event'],
            });

            if (visitor && visitor.event && visitor.event.id) {
                const eventId = visitor.event.id;
                console.log(`Найден ID события: ${eventId}`);
                await updateEventTotalVisitors(eventId);
            } else {
                console.log('Не удалось найти связанное событие для посетителя:', JSON.stringify(visitor, null, 2));
            }
        } catch (error) {
            console.error('Ошибка в afterCreate:', error);
        }
    },

    async afterUpdate(event) {
        console.log('Хук afterUpdate сработал');
        try {
            const { result } = event;
            const visitorId = result.id;

            const visitor = await strapi.entityService.findOne('api::visitor-table.visitor-table', visitorId, {
                populate: ['event'],
            });

            if (visitor && visitor.event && visitor.event.id) {
                const eventId = visitor.event.id;
                console.log(`Найден ID события: ${eventId}`);
                await updateEventTotalVisitors(eventId);
            } else {
                console.log('Не удалось найти связанное событие для посетителя:', JSON.stringify(visitor, null, 2));
            }
        } catch (error) {
            console.error('Ошибка в afterUpdate:', error);
        }
    },

    async beforeDelete(event) {
        console.log('Хук beforeDelete сработал');
        try {
            const visitorId = event.params.where.id;
            console.log(`ID удаляемого посетителя: ${visitorId}`);

            const visitor = await strapi.entityService.findOne('api::visitor-table.visitor-table', visitorId, {
                populate: ['event'],
            });

            if (visitor && visitor.event && visitor.event.id) {
                const eventId = visitor.event.id;
                console.log(`Найден ID события: ${eventId}`);
                event.params.eventId = eventId;
            } else {
                console.log('Не удалось найти связанное событие для удаляемого посетителя');
            }
        } catch (error) {
            console.error('Ошибка в beforeDelete:', error);
        }
    },

    async afterDelete(event) {
        console.log('Хук afterDelete сработал');
        try {
            const eventId = event.params.eventId;
            if (eventId) {
                console.log(`Найден ID события: ${eventId}`);
                await updateEventTotalVisitors(eventId);
            } else {
                console.log('ID события не найден в params');
            }
        } catch (error) {
            console.error('Ошибка в afterDelete:', error);
        }
    }
};

async function updateEventTotalVisitors(eventId) {
    console.log(`Обновление totalVisitors для события ${eventId}`);
    try {
        const visitors = await strapi.entityService.findMany('api::visitor-table.visitor-table', {
            filters: { event: eventId },
        });

        console.log(`Найдено ${visitors.length} записей посетителей`);

        const totalVisitors = visitors.reduce((sum, visitor) => {
            console.log(`Посетитель ID ${visitor.id}, quantity: ${visitor.quantity || 0}`);
            return sum + (parseInt(visitor.quantity) || 0);
        }, 0);

        console.log(`Вычисленное значение totalVisitors: ${totalVisitors}`);

        const event = await strapi.entityService.findOne('api::event-table.event-table', eventId);

        console.log('-----------------------------------');
        console.log(`Событие: ${event?.title || 'Без названия'}`);
        console.log(`ID события: ${eventId}`);
        console.log(`Общее количество посетителей: ${totalVisitors}`);

        await strapi.entityService.update('api::event-table.event-table', eventId, {
            data: { totalVisitors },
        });

        console.log(`Поле totalVisitors обновлено до ${totalVisitors}`);
        console.log('-----------------------------------');
    } catch (error) {
        console.error('Ошибка при обновлении totalVisitors:', error);
    }
}

//Using logs during test, after all bugs has destroyed - remove logs