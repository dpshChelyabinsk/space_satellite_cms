import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import MainWrapper from "../../components/Containers/main-wrapper/MainWrapper";
import ContentContainer from "../../components/Containers/content-container/ContentContainer";
import galleryService from "../../api/services/GalleryService";
import ResponsiveGallery from 'react-responsive-gallery';
import classes from "./styles/AlbumDetails.module.css"
import CommonHeader from "../../components/Headers/CommonHeader/CommonHeader";
import Back from "../../assets/Common/arrow-back.svg";
import CommonButton from "../../components/Buttons/CommonButton/CommonButton";

const AlbumDetails = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            const data = await galleryService.getAlbumById(id);
            setAlbum(data);
        };
        fetchAlbum();
    }, [id]);

    if (!album) return <div>Загрузка...</div>;

    return (
        <MainWrapper>
            <ContentContainer>
                <div className={classes.titleBox}>
                    <div className={classes.buttonWrapper}>
                        <Link to={`/albums`}>
                            <CommonButton
                                style={{
                                    minWidth: '112px',
                                    maxHeight: '52px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <img src={Back} alt='back arrow'/>
                            </CommonButton>
                        </Link>
                    </div>
                    <div className={classes.title}>
                        <CommonHeader>{album.name}</CommonHeader>
                        <h4 className={classes.date}>{album.begining} — {album.ending}</h4>
                    </div>
                    <div className={classes.buttonWrapper}/>
                </div>

                <div className={classes.content}>
                    <ResponsiveGallery
                        useLightBox={true}
                        media={album.images}
                        mediaClassName={classes.photoItem}
                    />
                </div>
            </ContentContainer>
        </MainWrapper>
    );
};

export default AlbumDetails;