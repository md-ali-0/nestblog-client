import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiHeart } from 'react-icons/fi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const AllBlogs = () => {
    const { user } = useContext(AuthContext);
    const axios = useAxios();
    const [filterCategory, setFilterCategory] = useState('');
    const [serachValue, setSerachValue] = useState('');
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('/categories').then((res) => setCategories(res.data));
    }, [axios]);
    const { data: allPosts, isLoading } = useQuery({
        queryKey: ['allPosts', filterCategory],
        queryFn: () =>
            axios.get(
                `/all-blogs?email=${user.email}&category=${filterCategory}`,
            ),
    });
    if (isLoading) {
        return <Loading />;
    }
    const handleWishList = async (post) => {
        const email = user?.email;
        const addWishListBlog = { ...post, user: email };
        try {
            const res = await axios.post('/add-to-wishlist', addWishListBlog);
            if (res.data?.acknowledged) {
                toast.success('Wishlist Added!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="max-w-screen-lg mx-auto py-5 px-3">
            <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900  px-6 py-10 shadow-2xl rounded-xl sm:rounded-3xl sm:px-24 xl:py-20">
                <nav
                    className="flex px-5 py-3 text-gray-700 border border-white/10 rounded-lg w-fit mx-auto"
                    aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link
                                to="/"
                                className="inline-flex items-center text-sm font-medium text-gray-200 hover:text-gray-400 ">
                                <svg
                                    className="w-3 h-3 mr-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="w-3 h-3 mx-1 text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span className="ml-1 text-sm font-medium text-gray-200 hover:text-gray-604000 md:ml-2">
                                    Blogs
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="flex justify-center items-center py-5">
                    <div className="relative mx-auto text-gray-600">
                        <input
                            onChange={(e) => setSerachValue(e.target.value)}
                            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            type="search"
                            name="search"
                            placeholder="Search"
                        />
                    </div>
                </div>
                <div></div>
            </div>
            <div>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-10 mx-auto">
                        <div className="flex justify-between">
                            <h3 className="text-4xl underline underline-offset-4 font-bold mb-10">
                                All Blogs
                            </h3>
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="category"
                                    className="text-sm font-medium">
                                    Filter By Category :
                                </label>
                                <select
                                    onChange={(e) =>
                                        setFilterCategory(e.target.value)
                                    }
                                    className="border placeholder-gray-500 px-5 py-1.5 my-1 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400">
                                    {categories?.map((category, idx) => {
                                        return (
                                            <option
                                                key={idx}
                                                value={category.categoryName}>
                                                {category.categoryName}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-rows-2 lg:grid-cols-3 -m-4">
                            {allPosts.data
                                .filter((post) => {
                                    if (serachValue === '') {
                                        return post;
                                    } else if (
                                        post.title
                                            .toLowerCase()
                                            .includes(serachValue.toLowerCase())
                                    ) {
                                        return post;
                                    }
                                })
                                .map((post) => (
                                    <div key={post._id} className="p-4">
                                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden dark:border-gray-600">
                                            <div className="relative">
                                                <PhotoProvider>
                                                    <PhotoView src={post.image}>
                                                        <img
                                                            className=" rounded-xl left-0 top-0 w-full h-full z-0"
                                                            src={post.image}
                                                        />
                                                    </PhotoView>
                                                </PhotoProvider>
                                                {user && (
                                                    <FiHeart
                                                        onClick={() => {
                                                            handleWishList(
                                                                post,
                                                            );
                                                        }}
                                                        className="absolute top-5 right-5 text-white cursor-pointer"
                                                        size={25}
                                                    />
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 dark:text-gray-400 mb-1">
                                                    {post.category}
                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 dark:text-gray-200 mb-3">
                                                    {post.title}
                                                </h1>
                                                <p className="leading-relaxed mb-3">
                                                    {post.shortDescription}
                                                </p>
                                                <div className="flex items-center flex-wrap ">
                                                    <Link
                                                        to={`/blog/${post._id}`}
                                                        className="text-indigo-500 dark:text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">
                                                        Read More
                                                        <svg
                                                            className="w-4 h-4 ml-2"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round">
                                                            <path d="M5 12h14" />
                                                            <path d="M12 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                    <span className="text-gray-400 dark:text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200 dark:border-gray-600">
                                                        {new Date(
                                                            post.createdAt,
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AllBlogs;
