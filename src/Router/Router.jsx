import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/Admin/Admin";
import Root from "../Layout/Root";
import About from "../Pages/About/About";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import AllBlogs from "../Pages/Blogs/AllBlogs";
import BlogDetail from "../Pages/Blogs/BlogDetail";
import UpdateComment from "../Pages/Blogs/UpdateComment";
import BlogByCategory from "../Pages/Categories/BlogByCategory";
import Contact from "../Pages/Contact/Contact";
import Error404 from "../Pages/Error/Error404";
import Home from "../Pages/Home/Home";
import Wishlist from "../Pages/Wishlist/Wishlist";
import AddPosts from "../Pages/dashboard/AddPosts";
import AllPosts from "../Pages/dashboard/AllPosts";
import Categories from "../Pages/dashboard/Categories";
import CategoryEdit from "../Pages/dashboard/CategoryEdit";
import Dashboard from "../Pages/dashboard/Dashboard";
import EditPosts from "../Pages/dashboard/PostEdit";
import PrivateRouter from "./PrivateRouter";

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
                element: <BlogByCategory/>
            },
            {
                path: '/my-blogs',
                element: <PrivateRouter><AllBlogs/></PrivateRouter>
            },
            {
                path: '/wishlist',
                element: <PrivateRouter><Wishlist/></PrivateRouter>
            },
            {
                path: '/blog/:id',
                loader: ({params})=>fetch(`http://localhost:8080/post/details/${params.id}`),
                element: <BlogDetail/>
            },
            {
                path: '/update-comment/:id',
                loader: ({params})=>fetch(`http://localhost:8080/comment/details/${params.id}`),
                element: <PrivateRouter><UpdateComment/></PrivateRouter>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRouter><Dashboard/></PrivateRouter>
            },
            {
                path: 'categories',
                element: <PrivateRouter><Categories/></PrivateRouter>
            },
            {
                path: 'edit-category/:id',
                loader: ({params})=>fetch(`http://localhost:8080/category/details/${params.id}`),
                element: <PrivateRouter><CategoryEdit/></PrivateRouter>
            },
            {
                path: 'add-post',
                element: <PrivateRouter><AddPosts/></PrivateRouter>
            },
            {
                path: 'all-post',
                element: <PrivateRouter><AllPosts/></PrivateRouter>
            },
            {
                path: 'edit-post/:id',
                loader: ({params})=>fetch(`http://localhost:8080/post/details/${params.id}`),
                element: <PrivateRouter><EditPosts/></PrivateRouter>
            },
        ]
    }
])

export default Router;