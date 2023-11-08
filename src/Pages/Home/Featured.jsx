import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const Featured = () => {
    const axios = useAxios();
    const { data: featuredPosts, isLoading } = useQuery({
        queryKey: ['featuredposts'],
        queryFn: () => axios.get('/featured-post'),
    });
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div>
            <h3 className="text-4xl font-bold pb-3">Featured Blogs</h3>
            {featuredPosts.data.slice(0,4).map((post) => (
                <motion.div
                    initial={{ x: '10%' }}
                    animate={{ x: '0%' }}
                    key={post._id}
                    className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden my-5">
                        <img
                            src={post.image}
                            alt="Featured Post"
                            className="h-36 w-32 object-fill rounded-l-lg"
                        />
                    <div className="text-gray-700 dark:text-gray-400 px-3 pt-1">
                        <h3 className="text-lg font-semibold leading-tight mb-2">
                            <Link
                                to={`/blog/${post._id}`}
                                className="hover:underline">
                                {post.title}
                            </Link>
                        </h3>
                        <p className="text-sm">
                            By
                            <span
                                className="text-blue-600 hover:underline mx-1">
                                {post.author}
                            </span>
                        </p>
                        <p className="text-sm py-2">
                        <span className="text-gray-500 dark:text-gray-400">
                                Published on {new Date(post.createdAt).toLocaleString()}
                            </span>
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Featured;
