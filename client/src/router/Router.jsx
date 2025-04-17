import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {About, EventDetails, Events, Albums, Home, News, NotFound, Satellite} from "../pages";
import App from "../App";
import AlbumDetails from "../pages/Albums/AlbumDetails";

const router = createBrowserRouter([{
    path: "/", element: <App/>, // Используем Layout как обёртку
    children: [{
        path: "", element: <Home/>,
    }, {
        path: "about", element: <About/>,
    }, {
        path: "events", element: <Events/>,
    }, {
        path: "events/:id", element: <EventDetails/>,
    }, {
        path: "albums", element: <Albums/>,
    },{
        path: "albums/:id", element: <AlbumDetails/>,
    }, {
        path: "news", element: <News/>,
    }, {
        path: "satellite", element: <Satellite/>,
    }, {
        path: "*", element: <NotFound/>,
    }, {
        path: "404", element: <NotFound/>,
    },],
},], {
    future: {
        v7_startTransition: true, v7_relativeSplatPath: true,
    },
});

const Router = () => {
    return (<RouterProvider router={router}/>);
};

export default Router;