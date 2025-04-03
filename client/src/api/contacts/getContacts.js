import strapiClient from "../services/StrapiClient"

const formatPhone = (number) =>
    `+${number.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5')}`;

const getContacts = async () => {
    try {
        const res = await strapiClient.get('contact?populate=*');
        const data = res.data;

        return {
            site: {
                href: data.website.link,
                label: "Наш основной сайт",
            },
            tel: {
                href: `tel:+${data.telephone.number}`,
                label: formatPhone(data.telephone.number),
            },
            email: {
                href: `mailto:${data.mail.mail}`,
                label: data.mail.mail,
            },
            address: {
                href: "https://2gis.ru/chelyabinsk/firm/2111590606338417?m=61.39057%2C55.164772%2F18.27",
                label: "Наш адрес"
            },
            telegram: {
                href: `https://t.me/${data.telegram.username}`,
            },
            vk: {
                href: data.vk.link,
            },
            youtube: {
                href: data.youtube.link,
            },
            whatsapp: {
                href: `https://wa.me/${data.whatsapp.number}`,
            },
        };
    } catch (error) {
        console.error('Ошибка при получении контактов:', error);
        return null;
    }
};

export default getContacts;