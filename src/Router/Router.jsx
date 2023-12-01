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
import AllBlogs from "../Pages/Blogs/AllBlogs";
import BlogDetail from "../Pages/Blogs/BlogDetail";
import FeaturedBlogs from "../Pages/Blogs/FeaturedBlogs";
import UpdateComment from "../Pages/Blogs/UpdateComment";
import BlogByCategory from "../Pages/Categories/BlogByCategory";
import Contact from "../Pages/Contact/Contact";
import Error404 from "../Pages/Error/Error404";
import Home from "../Pages/Home/Home";
import Wishlist from "../Pages/Wishlist/Wishlist";
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
                loader: ({params})=>fetch(`https://kotha-server.vercel.app/blog-by-category/${params.name}`),
                element: <BlogByCategory/>
            },
            {
                path: '/all-blogs',
                element: <PrivateRouter><AllBlogs/></PrivateRouter>
            },
            {
                path: '/wishlist',
                element: <PrivateRouter><Wishlist/></PrivateRouter>
            },
            {
                path: '/featured-blogs',
                element: <PrivateRouter><FeaturedBlogs/></PrivateRouter>
            },
            {
                path: '/blog/:id',
                loader: ({params})=>fetch(`https://kotha-server.vercel.app/post/${params.id}`),
                element: <BlogDetail/>
            },
            {
                path: '/update-comment/:id',
                loader: ({params})=>fetch(`https://kotha-server.vercel.app/comment/${params.id}`),
                element: <PrivateRouter><UpdateComment/></PrivateRouter>
            }
        ]
    },
    {
        path: '/admin',
        element: <Admin/>,
        children: [
            {
                path: '/admin',
                element: <PrivateRouter><Dashboard/></PrivateRouter>
            },
            {
                path: 'categories',
                element: <PrivateRouter><Categories/></PrivateRouter>
            },
            {
                path: 'edit-category/:id',
                loader: ({params})=>fetch(`https://kotha-server.vercel.app/category/${params.id}`),
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
                loader: ({params})=>fetch(`https://kotha-server.vercel.app/post/${params.id}`),
                element: <PrivateRouter><EditPosts/></PrivateRouter>
            },
        ]
    }
])

export default Router;