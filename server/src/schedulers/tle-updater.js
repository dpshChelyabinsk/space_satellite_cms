'use strict';

const axios = require('axios');

module.exports = {
    '0 0 * * *': async ({ strapi }) => {
        try {
            const satellite = await strapi.db.query('api::satellite.satellite').findOne();

            if (!satellite || !satellite.link) {
                console.log('Спутник не найден или отсутствует ссылка на TLE данные.');
                return;
            }

            console.log(`Начинаю обновление TLE данных из ${satellite.link} для спутника с кодом ${satellite.code}...`);

            const response = await axios.get(satellite.link);
            const tleData = response.data;
            const tleMap = parseTLEToMap(tleData);

            const tle = tleMap[satellite.code];
            if (tle) {
                await strapi.db.query('api::satellite.satellite').update({
                    where: { id: satellite.id },
                    data: {
                        name: tle.name,
                        firstLine: tle.firstLine,
                        secondLine: tle.secondLine,
                        link: satellite.link,
                    }
                });
                console.log(`✅ Спутник ${satellite.code} успешно обновлен!`);
                console.log(`✅ Новые данные: 
                  Имя: ${tle.name}
                  Первая строка: ${tle.firstLine}
                  Вторая строка: ${tle.secondLine}
                `);
            } else {
                console.log(`Данные для спутника с кодом ${satellite.code} не найдены в TLE файле.`);
                console.log(`Доступные коды спутников: ${Object.keys(tleMap).join(', ')}`);
            }

        } catch (error) {
            console.error('Ошибка при обновлении TLE данных:', error);
            console.error('Детали ошибки:', error.message);
        }
    },
};

function parseTLEToMap(tleData) {
    const lines = tleData.split('\n');
    console.log(`Получено ${lines.length} строк из файла TLE`);

    const map = {};
    for (let i = 0; i < lines.length; i += 3) {
        if (i + 2 < lines.length) {
            const name = lines[i].trim();
            const firstLine = lines[i + 1].trim();
            const secondLine = lines[i + 2].trim();

            const codeMatch = name.match(/\(([^)]+)\)/);
            const code = codeMatch?.[1]?.trim();

            if (code) {
                map[code] = { name, firstLine, secondLine };
            }
        }
    }

    console.log(`Найдено ${Object.keys(map).length} спутников по коду в TLE файле`);

    return map;
}