import React, {useEffect, useState} from 'react';
import classes from "./styles/Events.module.css";
import {getEvents} from "../../services/eventService";
import Loader from "../../components/Loaders/Loader";
import {API_URL} from "../../config/API_CONFIG";
import ContentContainer from "../../components/Containers/content-container/ContentContainer";
import MainWrapper from "../../components/Containers/main-wrapper/MainWrapper";
import CommonHeader from "../../components/Headers/CommonHeader/CommonHeader";
import CancelButton from "../../components/Buttons/CancelButton/CancelButton";
import GonnaEvent from "../../components/Forms/GonnaEvent/GonnaEvent";
import ModalWrapper from "../../components/Containers/modal-wrapper/ModalWrapper";
import EventCard from "../../components/Cards/Event/EventCard";
import EventFilter from "../../components/Filters/EventFilter/EventFilter";
import EventPagination from "../../components/Paginations/EventPagination/EventPagination";

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
                const eventTime = new Date(event.attributes.date_start).toLocaleTimeString([], {
                    hour: '2-digit', minute: '2-digit'
                });
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

    const uniqueTimes = [...new Set(events.map(event => new Date(event.attributes.date_start).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit'
    })))];
    const uniqueDates = [...new Set(events.map(event => new Date(event.attributes.date_start).toLocaleDateString()))];

    const openModal = (eventItem) => {
        setSelectedEvent(eventItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const uniqueTypes = [...new Set(events.map(event => event.attributes.type))];

    return (<MainWrapper>
        <ContentContainer>
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
            <div className={classes.eventContainer}>
                {currentEvents.length > 0 ? (currentEvents.map(eventItem => {
                    const {date_start, date_finish, type} = eventItem.attributes;
                    const options = {
                        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
                    };
                    const startDate = new Date(date_start).toLocaleString('ru-RU', options);
                    const endDate = date_finish ? ` - ${new Date(date_finish).toLocaleString('ru-RU', options)}` : '';
                    return (<EventCard
                        key={eventItem.id}
                        image={`${API_URL}${eventItem.attributes.photo.data.attributes.url}`}
                        type={type}
                        event={() => openModal(eventItem)}
                        link={`/events/${eventItem.id}`}
                        startDate={startDate}
                        endDate={endDate}
                        title={eventItem.attributes.title}
                        place={eventItem.attributes.place}
                    />);
                })) : (<Loader/>)}
            </div>
            <EventPagination
                filteredEvents={filteredEvents}
                eventsPerPage={eventsPerPage}
                currentPage={currentPage}
                paginate={paginate}
            />
        </ContentContainer>
        {isModalOpen && (<ModalWrapper>
            <GonnaEvent eventId={selectedEvent.id} eventName={selectedEvent.attributes.title}/>
            <CancelButton onClick={closeModal}>Отмена</CancelButton>
        </ModalWrapper>)}
    </MainWrapper>);
};

export default Events;
