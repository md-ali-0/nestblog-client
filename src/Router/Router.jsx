import { createBrowserRouter } from "react-router-dom";
import Admin from "../Layout/Admin/Admin";
import Root from "../Layout/Root";
import About from "../Pages/About/About";
import AddPosts from "../Pages/Admin/AddPosts";
import AllPosts from "../Pages/Admin/AllPosts";
import Categories from "../Pages/Admin/Categories";
import CategoryEdit from "../Pages/Admin/CategoryEdit";
import Dashboard from "../Pages/Admin/Dashboard";
import EditPosts from "../Pages/Admin/PostEdit";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import BlogByCategory from "../Pages/Categories/BlogByCategory";
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
            {
                path: '/category/:name',
                loader: ({params})=>fetch(`http://localhost:8080/blog-by-category/${params.name}`),
                element: <BlogByCategory/>
            },
        ]
    },
    {
        path: '/admin',
        element: <Admin/>,
        children: [
            {
                path: '/admin',
                element: <Dashboard/>
            },
            {
                path: 'categories',
                element: <Categories/>
            },
            {
                path: 'edit-category/:id',
                loader: ({params})=>fetch(`http://localhost:8080/category/${params.id}`),
                element: <CategoryEdit/>
            },
            {
                path: 'add-post',
                element: <AddPosts/>
            },
            {
                path: 'all-post',
                element: <AllPosts/>
            },
            {
                path: 'edit-post/:id',
                loader: ({params})=>fetch(`http://localhost:8080/post/${params.id}`),
                element: <EditPosts/>
            },
        ]
    }
])

export default Router;