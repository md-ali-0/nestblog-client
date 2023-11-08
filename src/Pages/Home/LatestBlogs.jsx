import { useQuery } from '@tanstack/react-query';
import { Pagination } from 'flowbite-react';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiHeart } from 'react-icons/fi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const LatestBlogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPost, setTotalPost] = useState(0);
    const [postPerPage, setPostPerPage] = useState(6);
    const totalPage = Math.ceil(totalPost / postPerPage);
    const {user} = useContext(AuthContext)
    const onPageChange = (page) => setCurrentPage(page);
    const axios = useAxios();

    const { data: allPosts, isLoading } = useQuery({
        queryKey: ['latestposts', currentPage, postPerPage],
        queryFn: () =>
            axios.get(`/all-post?page=${currentPage - 1}&size=${postPerPage}`),
    });

    const handleItemPerPage = (e) => {
        setPostPerPage(e.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        axios
            .get('/dashboard-count')
            .then((res) => setTotalPost(res.data.postCount));
    }, [axios]);
    const handleWishList = async(post)=>{
        const email = user?.email
        const addWishListBlog = {...post, user:email}
        try {
            const res = await axios.post('/add-to-wishlist', addWishListBlog);
            if (res.data?.acknowledged) {
                toast.success('Wishlist Added!');
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div>
            <h3 className="text-4xl font-bold pb-3">Latest Blogs</h3>
            {allPosts.data.map((post) => (
                <motion.div
                    initial={{ x: '10%' }}
                    animate={{ x: '0%' }}
                    key={post._id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden my-5">
                    <div className="relative">
                        <PhotoProvider>
                            <PhotoView src={post.image}>
                                <img
                                    className="w-full h-96 object-cover object-center"
                                    src={post.image}
                                />
                            </PhotoView>
                        </PhotoProvider>
                        {user&&<FiHeart onClick={()=>{handleWishList(post)}} className='absolute top-5 right-5 text-white cursor-pointer' size={25}/>}
                        
                        <span className="absolute top-5 left-5 rounded-xl bg-primary text-white px-2 py-0.5">
                            {post.category}
                        </span>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Published on{' '}
                            {new Date(post.createdAt).toDateString()} by{' '}
                            {post.author}
                        </p>
                        <p className="text-body-color dark:text-dark-6">
                            {post.shortDescription}
                        </p>
                        <Link
                            to={`/blog/${post._id}`}
                            className="text-primary hover:underline block mt-3">
                            Read more
                        </Link>
                    </div>
                </motion.div>
            ))}
            <div className="flex justify-center flex-wrap py-3 gap-2">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={onPageChange}
                    showIcons
                />
                <div>
                    <select
                        className="p-2 mt-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name=""
                        id=""
                        onChange={handleItemPerPage}
                        defaultValue={postPerPage}>
                        <option value="6">6</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default LatestBlogs;
