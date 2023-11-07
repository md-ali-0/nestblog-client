import { createBrowserRouter } from "react-router-dom";
import Admin from "../Layout/Admin/Admin";
import Root from "../Layout/Root";
import About from "../Pages/About/About";
import Categories from "../Pages/Admin/Categories";
import Dashboard from "../Pages/Admin/Dashboard";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Contact from "../Pages/Contact/Contact";
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
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/contact',
                element: <Contact/>
            },
        ]
    },
    {
        path: '/admin',
        element: <Admin/>,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard/>
            },
            {
                path: 'categories',
                element: <Categories/>
            }
        ]
    }
])

export default Router;