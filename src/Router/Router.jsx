import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Error404 from "../Pages/Error/Error404";
import Home from "../Pages/Home/Home";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <Error404/>,
        children: [
            {
                path: '/',
                element: <Home/>
            }
        ]
    }
])

export default Router;