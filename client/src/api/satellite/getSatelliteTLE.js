import strapiClient from "../services/StrapiClient"

const getSatelliteTLE = async () => {
    try {
        const res = await strapiClient.get('satellite?populate=*');
        // «res.data» — это объект вида { data: { firstLine, secondLine, … }, meta: {…} }
        const payload = res.data;
        return {
            tleLine1: payload.firstLine,
            tleLine2: payload.secondLine
        };
    } catch (error) {
        console.error('Ошибка при получении данных о спутнике:', error);
        return null;
    }
};

export default getSatelliteTLE;