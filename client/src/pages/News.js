import React, { useEffect, useState } from 'react';
import { API_URL } from "../config/API_CONFIG";
import {getData} from "../services/newsService";
import styled from "styled-components";
import Loader from "../components/Loaders/Loader";
import ContentContainer from "../components/Containers/content-container/ContentContainer";
import MainWrapper from "../components/Containers/main-wrapper/MainWrapper";

const NewsTitle = styled.h2`
  font-family: var(--font-family);
  font-weight: bold;
  font-size: 32px;
`;

const NewsDescription = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
`

const NewsItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  width: 100%;
  height: 100%;
  margin-top: 50px;
`;

const NewsItem = styled.div`
  width: 47%;
  height: 20%;
`;

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
                <NewsTitle>Наши новости</NewsTitle>
                <NewsItemWrapper>
                {news.length > 0 ? (
                    news.map(newsItem => (
                        <NewsItem key={newsItem.id}>
                            {newsItem.attributes.photo?.data && (
                                <div>
                                    <img
                                        src={`${API_URL}${newsItem.attributes.photo.data.attributes.url}`}
                                        alt={newsItem.attributes.photo.data.attributes.alternativeText || newsItem.attributes.title}
                                        style={{ width: '300px', height: 'auto' }}
                                    />
                                </div>
                            )}
                            <NewsTitle>{newsItem.attributes.title}</NewsTitle>
                            <NewsDescription>{newsItem.attributes.description}</NewsDescription>
                        </NewsItem>
                    ))
                ) : (
                    <Loader />
                )}
                </NewsItemWrapper>
            </ContentContainer>
        </MainWrapper>
    );
};

export default News;
