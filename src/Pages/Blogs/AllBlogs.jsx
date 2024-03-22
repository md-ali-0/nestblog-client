import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FiHeart } from 'react-icons/fi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const AllBlogs = () => {
    const { user, isLoading: loading } = useAuth()

    const email = user.email;
    const axios = useAxios();

    const { data = [] } = useQuery({
        queryKey: ['myPosts'],
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(
                `/post/my-posts/${email}`,
            );
            return data;
        },
        retry: 'true',
    });
    if (loading) {
        return <Loading />;
    }

    const handleWishList = async (post) => {
        const email = user?.email;
        const addWishListBlog = { ...post, wishlistBy: email };
        try {
            const res = await axios.post('/wishlist/add', addWishListBlog);
            toast.success('Wishlist Added!');
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
            </div>
            <div>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-10 mx-auto">
                        <div className="flex justify-between">
                            <h3 className="text-4xl underline underline-offset-4 font-bold mb-10">
                                All Blogs
                            </h3>
                        </div>
                        <div>
                        <div className="grid grid-cols-1 md:grid-rows-2 lg:grid-cols-3 -m-4">
                            {data &&
                                data?.map((post) => (
                                        <div
                                            key={post.id}
                                            className="p-4">
                                            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden dark:border-gray-600">
                                                <div className="relative">
                                                    <PhotoProvider>
                                                        <PhotoView
                                                            src={
                                                                post.image
                                                            }>
                                                            <img
                                                                className=" rounded-xl left-0 top-0 w-full h-full z-0"
                                                                src={
                                                                    post.image
                                                                }
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
                                                        {
                                                            post.shortDescription
                                                        }
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
                                                                strokeWidth={
                                                                    2
                                                                }
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
                        {data.length === 0 && (
                            <div className="flex justify-center">
                                <h3>No Wishlist Post Available</h3>
                            </div>
                        )}
                    </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AllBlogs;
