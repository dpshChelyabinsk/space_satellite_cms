import React, {useEffect, useState} from 'react';
import {getData} from "../services/galaryService";
import Loader from "../components/Loaders/Loader";
import ContentContainer from "../components/Containers/content-container/ContentContainer";
import MainWrapper from "../components/Containers/main-wrapper/MainWrapper";

const Gallery = ({directory}) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const images = await getData(directory);
                setImages(images);
            } catch (error) {
                console.error('Ошибка при загрузке галереи:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [directory]);

    return (
        <MainWrapper>
            <ContentContainer>
                {loading ? (
                    <Loader/>
                ) : images.length > 0 ? (
                    images.map(image => (
                        <img
                            key={image.url}
                            src={image.url}
                            alt={`${image.id}`}
                            style={{width: '300px', height: 'auto', margin: '10px'}}
                        />
                    ))
                ) : (
                    <p>Нет изображений для отображения</p>
                )}
            </ContentContainer>
        </MainWrapper>
    );
};

export default Gallery;
