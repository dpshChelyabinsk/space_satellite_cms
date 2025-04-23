import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppLoader from "./AppLoader";
import {SatelliteProvider} from "./contexts/SatelliteContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SatelliteProvider>
        <AppLoader />
    </SatelliteProvider>
);
