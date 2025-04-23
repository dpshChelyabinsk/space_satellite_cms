import React, { createContext, useContext, useState, useEffect } from 'react';
import getSatelliteTLE from '../api/satellite/getSatelliteTLE';

const SatelliteContext = createContext({
    tle: null,
    loading: true,
    error: null,
});

export const SatelliteProvider = ({ children }) => {
    const [tle, setTle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSatelliteTLE()
            .then(data => {
                if (data) {
                    console.log(data)
                    setTle(data);
                } else {
                    console.log(data)
                    setError('Пустой ответ от сервера');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Не удалось загрузить TLE');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <SatelliteContext.Provider value={{ tle, loading, error }}>
            {children}
        </SatelliteContext.Provider>
    );
};

export const useSatellite = () => useContext(SatelliteContext);
