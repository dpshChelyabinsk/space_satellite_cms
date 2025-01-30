import React from 'react';
import styles from './styles/EventFilters.module.css';

const EventFilters = ({
                          filter,
                          timeFilter,
                          dateFilter,
                          uniqueTypes,
                          uniqueTimes,
                          uniqueDates,
                          onFilterChange,
                          onTimeChange,
                          onDateChange,
                          onReset
                      }) => {
    return (
        <div className={styles.filterBox}>
            <select
                className={styles.select}
                onChange={onTimeChange}
                value={timeFilter}
            >
                <option value="all">Время события</option>
                {uniqueTimes.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ))}
            </select>

            <select
                className={styles.select}
                onChange={onFilterChange}
                value={filter}
            >
                <option value="all">Тип</option>
                {uniqueTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>

            <select
                className={styles.select}
                onChange={onDateChange}
                value={dateFilter}
            >
                <option value="all">Дата</option>
                {uniqueDates.map((date, index) => (
                    <option key={index} value={date}>{date}</option>
                ))}
            </select>

            <button className={styles.resetButton} onClick={onReset}>
                Сбросить фильтры
            </button>
        </div>
    );
};

export default EventFilters;