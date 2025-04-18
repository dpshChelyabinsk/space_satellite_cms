import React, {useEffect, useState} from 'react';
import classes from "./styles/Events.module.css";
import Loader from "../../components/Loaders/Loader";
import ContentContainer from "../../components/Containers/content-container/ContentContainer";
import MainWrapper from "../../components/Containers/main-wrapper/MainWrapper";
import CommonHeader from "../../components/Headers/CommonHeader/CommonHeader";
import CancelButton from "../../components/Buttons/CancelButton/CancelButton";
import GonnaEvent from "../../components/Forms/GonnaEvent/GonnaEvent";
import ModalWrapper from "../../components/Containers/modal-wrapper/ModalWrapper";
import EventCard from "../../components/Cards/Event/EventCard";
import EventFilter from "../../components/Filters/EventFilter/EventFilter";
import EventPagination from "../../components/Paginations/EventPagination/EventPagination";
import eventService from "../../api/services/EventService";
import dateManipulator from "../../utils/services/DateManipulator";

const Events = () => {
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;
    const [filter, setFilter] = useState('all');
    const [timeFilter, setTimeFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        let filtered = events;

        if (filter !== 'all') {
            filtered = filtered.filter(event => event.type === filter);
        }

        if (timeFilter !== 'all') {
            filtered = filtered.filter(event => {
                const eventTime = new Date(event.begining).toLocaleTimeString([], {
                    hour: '2-digit', minute: '2-digit'
                });
                return eventTime === timeFilter;
            });
        }

        if (dateFilter !== 'all') {
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.begining).toLocaleDateString();
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
        setCurrentPage(1);
    };

    const handleTimeFilterChange = (e) => {
        setTimeFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleDateFilterChange = (e) => {
        setDateFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        setFilter('all');
        setTimeFilter('all');
        setDateFilter('all');
        setCurrentPage(1);
    };

    const uniqueTimes = [...new Set(events.map(event => new Date(event.begining).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit'
    })))];
    const uniqueDates = [...new Set(events.map(event => new Date(event.begining).toLocaleDateString()))];

    const openModal = (eventItem) => {
        setSelectedEvent(eventItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const uniqueTypes = [...new Set(events.map(event => event.type))];

    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false); // Состояние для отображения сообщения

    useEffect(() => {
        // Устанавливаем таймер на 15 секунд
        const timeoutId = setTimeout(() => {
            // Если события не загрузились, показываем сообщение
            if (currentEvents.length === 0) {
                setShowTimeoutMessage(true);
            }
        }, 15000); // 15 секунд

        // Очищаем таймер при размонтировании компонента
        return () => clearTimeout(timeoutId);
    }, [currentEvents]);

    useEffect(() => {
        eventService.getEventsThumbnails().then(events => {
            setEvents(events);
            setFilteredEvents(events);
        });
    }, []);

    return (
        <MainWrapper>
            <ContentContainer>
                <div className={classes.eventContainer}>
                    <CommonHeader>Подберите мероприятие</CommonHeader>
                    <EventFilter
                        filter={filter}
                        timeFilter={timeFilter}
                        dateFilter={dateFilter}
                        uniqueTypes={uniqueTypes}
                        uniqueTimes={uniqueTimes}
                        uniqueDates={uniqueDates}
                        onFilterChange={handleFilterChange}
                        onTimeChange={handleTimeFilterChange}
                        onDateChange={handleDateFilterChange}
                        onReset={handleResetFilters}
                    />
                    <div className={classes.eventWrapper}>
                        {currentEvents.length > 0 ? (currentEvents.map(eventItem => {
                            const {begining, ending, type} = eventItem;
                            const startDate = dateManipulator.format(begining, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                            });

                            const endDate = ending ? ` - ${dateManipulator.format(ending, {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}` : '';
                            return (<EventCard
                                key={eventItem.documentId}
                                image={eventItem.thumbnail}
                                type={type}
                                event={() => openModal(eventItem)}
                                link={`/events/${eventItem.documentId}`}
                                startDate={startDate}
                                endDate={endDate}
                                title={eventItem.title}
                                place={eventItem.place}
                            />);
                        })) : (
                            showTimeoutMessage ? <div className={classes.notFound}>События не найдены</div> : <Loader/>
                        )}
                    </div>
                    <EventPagination
                        filteredEvents={filteredEvents}
                        eventsPerPage={eventsPerPage}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </div>
            </ContentContainer>
            {isModalOpen && (
                <ModalWrapper>
                    <GonnaEvent eventId={selectedEvent.documentId} eventName={selectedEvent.title}/>
                    <CancelButton onClick={closeModal}>Отмена</CancelButton>
                </ModalWrapper>
            )}
        </MainWrapper>
    );
};

export default Events;
