import React, { useEffect, useState } from 'react';
import classes from "./styles/News.module.css"
import { API_URL } from "../../config/API_CONFIG";
import {getData} from "../../services/newsService";
import Loader from "../../components/Loaders/Loader";
import ContentContainer from "../../components/Containers/content-container/ContentContainer";
import MainWrapper from "../../components/Containers/main-wrapper/MainWrapper";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import CommonHeader from "../../components/Headers/CommonHeader/CommonHeader";
import NewsCard from "../../components/Cards/News/NewsCard";

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setNews(data);
        };
        fetchData();
    }, []);

    return (
        <MainWrapper>
            <ContentContainer>
                <CommonHeader>Наши новости</CommonHeader>
                <div className={classes.container}>
                {news.length > 0 ? (
                    news.map(newsItem => (
                        <div className={classes.newsRow} key={newsItem.id}>
                            {newsItem.attributes.photo?.data && (
                                <NewsCard>
                                    <Zoom>
                                        <img
                                            src={`${API_URL}${newsItem.attributes.photo.data.attributes.url}`}
                                            alt={newsItem.attributes.photo.data.attributes.alternativeText || newsItem.attributes.title}
                                            style={{ width: '300px', height: 'auto' }}
                                        />
                                    </Zoom>
                                </NewsCard>
                            )}
                            <h3>{newsItem.attributes.title}</h3>
                            <p>{newsItem.attributes.description}</p>
                            <p></p>
                        </div>
                    ))
                ) : (
                    <Loader />
                )}
                </div>
            </ContentContainer>
        </MainWrapper>
    );
};

export default News;
