import React from 'react';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {apps} from "./apps/apps";
import {AppWrapper} from "./apps/AppWrapper";
import {OpenFinProvider} from "./pages/OpenFinProvider";
import {ExternalProvider} from "./pages/ExternalProvider";


// window.fin.Platform.

const router = createBrowserRouter([
    {
        path: '/',
        element: <div>root 1</div>,
        children: []
    },
    {
        path: '/provider',
        element: <OpenFinProvider/>,
        children: []
    },
    {
        path: '/externalProvider',
        element: <ExternalProvider/>,
        children: [],
    },
    ...apps.map((a) => ({
        path: a.path,
        element: <AppWrapper {...a} />,
    }))
]);


const App = () => {
    return (
        <RouterProvider router={router}/>
    );
};

export default App;
