import React from "react";
import { About, Events, Gallery, Home, News, NotFound, Satellite, EventDetails } from '../pages/index'
import {Navigate, Route, Routes} from "react-router-dom";


const LinksRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/gallery" element={<Gallery directory="events/97aa8e93e1c4d2325a98f2b6c85ca978"/>} />
            <Route path="/news" element={<News/>} />
            <Route path="/satellite" element={<Satellite/>} />
            <Route path="/events/:id" element={<EventDetails />} />

            <Route path="*" element={<Navigate to={"/404"}/>}/>
            <Route path="/404" element={<NotFound/>}/>
        </Routes>
    );
};

export default LinksRoute;