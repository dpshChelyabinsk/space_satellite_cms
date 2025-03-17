import React, {useEffect, useState} from 'react';
import Loader from './components/Loaders/Loader';
import Router from "./router/Router";

const AppLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader/>;
    }
    return <Router/>;
};

export default AppLoader;
