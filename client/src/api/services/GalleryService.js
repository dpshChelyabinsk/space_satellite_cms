import strapiClient from "./StrapiClient";

class GalleryService {
    baseUrl = 'album-tables';

    async getAlbumsThumbnails() {
        try {
            const res = await strapiClient.get(
                `${this.baseUrl}?populate=content&pagination[page]=1&pagination[pageSize]=1000`
            );

            const albums = res.data;
            const imageUrl = process.env.REACT_APP_STRAPI_API_URL.replace('/api', '');

            const previewAlbums = albums
                .filter(album =>
                    album.name &&
                    album.description &&
                    album.begining &&
                    album.documentId
                )
                .map(album => {
                    const { name, description, begining, ending, content, documentId } = album;

                    const quantity = album.content.length;
                    const urls = [];
                    if (content && content.length > 0) {
                        const firstMedia = content[0];
                        urls.push(
                            firstMedia?.formats?.medium?.url
                                ? `${imageUrl}${firstMedia.formats.medium.url}`
                                : firstMedia?.url
                                    ? `${imageUrl}${firstMedia.url}`
                                    : null
                        );

                        for (let i = 1; i < 4; i++) {
                            if (content[i]) {
                                urls.push(
                                    content[i]?.formats?.small?.url
                                        ? `${imageUrl}${content[i].formats.small.url}`
                                        : content[i]?.url
                                            ? `${imageUrl}${content[i].url}`
                                            : null
                                );
                            }
                        }
                    }

                    return {
                        name,
                        description,
                        begining,
                        ending,
                        urls: urls.filter(url => url !== null),
                        documentId,
                        quantity
                    }
                })
                .sort((a, b) => new Date(b.begining) - new Date(a.begining));

            return previewAlbums;
        } catch (e) {
            console.error('Error fetching albums:', e);
            return [];
        }
    }

    async getAlbumById(id) {
        try {

        } catch (e) {
            console.log(e);
            return [];
        }
    }
}

const galleryService = new GalleryService();
export default galleryService;