// import React from "react";
// import { About, Events, Gallery, Home, News, NotFound, Satellite, EventDetails } from '../pages/index'
// import {Navigate, Route, Routes} from "react-router-dom";
//
//
// const LinksRoute = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<Home/>} />
//             <Route path="/about" element={<About/>} />
//             <Route path="/events" element={<Events/>} />
//             <Route path="/gallery" element={<Gallery directory="events/97aa8e93e1c4d2325a98f2b6c85ca978"/>} />
//             <Route path="/news" element={<News/>} />
//             <Route path="/satellite" element={<Satellite/>} />
//             <Route path="/events/:id" element={<EventDetails />} />
//
//             <Route path="*" element={<Navigate to={"/404"}/>}/>
//             <Route path="/404" element={<NotFound/>}/>
//         </Routes>
//     );
// };
//
// export default LinksRoute;

import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {About, EventDetails, Events, Gallery, Home, News, NotFound, Satellite} from "../pages";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>, // Используем Layout как обёртку
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "about",
                element: <About/>,
            },
            {
                path: "events",
                element: <Events/>,
            },
            {
                path: "gallery",
                element: <Gallery directory="events/97aa8e93e1c4d2325a98f2b6c85ca978"/>,
            },
            {
                path: "news",
                element: <News/>,
            },
            {
                path: "satellite",
                element: <Satellite/>,
            },
            {
                path: "events/:id",
                element: <EventDetails/>,
            },
            {
                path: "*",
                element: <NotFound/>,
            },
            {
                path: "404",
                element: <NotFound/>,
            },
        ],
    },
], {
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
    },
});

const Router = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default Router;