import React from 'react';
import classes from "./styles/EventPagination.module.css"

const EventPagination = ({filteredEvents, eventsPerPage, currentPage, paginate}) => {
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    return (
        <div className={classes.container}>
            {Array.from({length: totalPages}, (_, index) => (
                <button
                    key={index} // Добавлен уникальный ключ
                    className={currentPage === index + 1 ? `${classes.buttons} ${classes.active}` : classes.buttons}
                    onClick={() => paginate(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default EventPagination;