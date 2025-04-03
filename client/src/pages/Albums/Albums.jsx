import ContentContainer from "../../components/Containers/content-container/ContentContainer";
import MainWrapper from "../../components/Containers/main-wrapper/MainWrapper";
import React, {useEffect, useState} from "react";
import CommonHeader from "../../components/Headers/CommonHeader/CommonHeader";
import AlbumCard from "../../components/Cards/Album/AlbumCard";
import classes from "../Events/styles/Events.module.css";
import galleryService from "../../api/services/GalleryService";

const Albums = () => {

    const [albums, setAlbums] = useState({});

    useEffect(() => {
        galleryService.getAlbumsThumbnails().then(albums => {
            setAlbums(albums);
        });
    }, []);

    return (
        <MainWrapper>
            <ContentContainer>
                <CommonHeader>Галерея</CommonHeader>
                {albums.length > 0 ? (albums.map(album => {
                    return (<AlbumCard
                        key={album.documentId}
                        name={album.name}
                        description={album.description}
                        begining={album.begining}
                        ending={album.ending}
                        link={`/albums/${album.documentId}`}
                        quantity={album.quantity}
                        photos={album.urls}
                    />);
                })) : (
                    <div className={classes.notFound}>События не найдены</div>
                )}
            </ContentContainer>
        </MainWrapper>
    );
};

export default Albums;