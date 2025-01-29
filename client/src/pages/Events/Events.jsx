import React, { useEffect, useState } from 'react';
import Button from "../../components/UI/Button";
import GeoBox from "../../assets/Events/Geo.svg";
import { getEvents } from "../../services/eventService";
import Loader from "../../components/Loaders/Loader";
import { API_URL } from "../../config/API_CONFIG";
import { Link } from "react-router-dom";
import {
    ButtonChipWrapper, ButtonsWrapper, ButtonWrapper,
    CardItems, ChipWrapper,
    EventCard,
    EventsBox,
    FilterBox, InfoDate, InfoGeoIcon, InfoPlace, InfoPlaceBox, InfoTitle, InfoWrapper,
    PaginationBox, PaginationItem,
    ResetButton,
    Select, TypeChip
} from "../../styles/EventsPage";
import RecordBlock from "../../components/RecordBlock";
import styled from "styled-components";
import ContentContainer from "../../components/Containers/content-container/ContentContainer";
import MainWrapper from "../../components/Containers/main-wrapper/MainWrapper";
import CommonHeader from "../../components/Headers/CommonHeader/CommonHeader";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  height: fit-content;
`;

const CloseButton = styled.button`
  font-family: var(--font-family);
  font-size: 20px;
  color: #9F99A4;
  width: 20%;
  padding: 4px;
  position: relative;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 20px;
  
  &:hover{
    color: var(--pure-white);
    background-color: #FF8244;
  }
`;

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;
    const [filter, setFilter] = useState('all');
    const [timeFilter, setTimeFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEvents();
            setEvents(data);
            setFilteredEvents(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = events;

        if (filter !== 'all') {
            filtered = filtered.filter(event => event.attributes.type === filter);
        }

        if (timeFilter !== 'all') {
            filtered = filtered.filter(event => {
                const eventTime = new Date(event.attributes.date_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return eventTime === timeFilter;
            });
        }

        if (dateFilter !== 'all') {
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.attributes.date_start).toLocaleDateString();
                return eventDate === dateFilter;
            });
        }

        setFilteredEvents(filtered);
    }, [filter, timeFilter, dateFilter, events]);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Возвращаемся на первую страницу при изменении фильтра
    };

    const handleTimeFilterChange = (e) => {
        setTimeFilter(e.target.value);
        setCurrentPage(1); // Возвращаемся на первую страницу при изменении фильтра
    };

    const handleDateFilterChange = (e) => {
        setDateFilter(e.target.value);
        setCurrentPage(1); // Возвращаемся на первую страницу при изменении фильтра
    };

    const handleResetFilters = () => {
        setFilter('all');
        setTimeFilter('all');
        setDateFilter('all');
        setCurrentPage(1);
    };

    const uniqueTimes = [...new Set(events.map(event => new Date(event.attributes.date_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })))];
    const uniqueDates = [...new Set(events.map(event => new Date(event.attributes.date_start).toLocaleDateString()))];

    const openModal = (eventItem) => {
        setSelectedEvent(eventItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <MainWrapper>
            <ContentContainer>
                <CommonHeader style={{
                    width: "100%",
                    position: "inherit",
                    marginBottom: '20px'
                }}>Подберите мероприятие:
                </CommonHeader>
                <FilterBox>
                    <Select onChange={handleTimeFilterChange} value={timeFilter}>
                        <option value="all">Время события</option>
                        {uniqueTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </Select>
                    <Select onChange={handleFilterChange} value={filter}>
                        <option value="all">Тип</option>
                        <option value="лекция">Лекции</option>
                        <option value="экскурсия">Экскурсии</option>
                        <option value="собрание">Собрания</option>
                        <option value="электив">Элективы</option>
                    </Select>
                    <Select onChange={handleDateFilterChange} value={dateFilter}>
                        <option value="all">Дата</option>
                        {uniqueDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </Select>
                    <ResetButton onClick={handleResetFilters}>Сбросить фильтры</ResetButton>
                </FilterBox>
                <EventsBox>
                    {currentEvents.length > 0 ? (
                        currentEvents.map(eventItem => {
                            const { date_start, date_finish, type } = eventItem.attributes;
                            const options = {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                            };
                            const startDate = new Date(date_start).toLocaleString('ru-RU', options);
                            const endDate = date_finish ? ` - ${new Date(date_finish).toLocaleString('ru-RU', options)}` : '';
                            return (
                                <EventCard key={eventItem.id} $background={eventItem.attributes.photo?.data ? `${API_URL}${eventItem.attributes.photo.data.attributes.url}` : null}>
                                    <CardItems>
                                        <ButtonChipWrapper>
                                            <ChipWrapper>
                                                <TypeChip>
                                                    #{type}
                                                </TypeChip>
                                            </ChipWrapper>
                                            <ButtonsWrapper>
                                                <ButtonWrapper>
                                                    <Button $color={`var(--sunset-orange)`} $hoverColor={`var(--lavender-sky)`} onClick={() => openModal(eventItem)}>Записаться</Button>
                                                </ButtonWrapper>
                                                <ButtonWrapper>
                                                    <Link to={`/events/${eventItem.id}`}>
                                                        <Button $color={`var(--royal-lilac)`} $hoverColor={`var(--sunset-orange)`}>Подробнее</Button>
                                                    </Link>
                                                </ButtonWrapper>
                                            </ButtonsWrapper>
                                        </ButtonChipWrapper>
                                        <InfoWrapper>
                                            <InfoDate>{startDate}{endDate}</InfoDate>
                                            <InfoTitle>{eventItem.attributes.title}</InfoTitle>
                                            <InfoPlaceBox>
                                                <InfoGeoIcon src={GeoBox} />
                                                <InfoPlace>
                                                    {eventItem.attributes.place}
                                                </InfoPlace>
                                            </InfoPlaceBox>
                                        </InfoWrapper>
                                    </CardItems>
                                </EventCard>
                            );
                        })
                    ) : (
                        <Loader />
                    )}
                </EventsBox>
                <PaginationBox>
                    {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }, (_, index) => (
                        <PaginationItem
                            key={index + 1}
                            $active={currentPage === index + 1}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </PaginationItem>
                    ))}
                </PaginationBox>
            </ContentContainer>
            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <RecordBlock eventId={selectedEvent.id} eventName={selectedEvent.attributes.title} />
                        <CloseButton onClick={closeModal}>Отмена</CloseButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </MainWrapper>
    );
};

export default Events;
