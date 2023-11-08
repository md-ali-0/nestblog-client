import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const axios = useAxios();

    const {
        data: wishlist,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ['wishlist'],
        queryFn: () => axios.get(`/get-wish-list?email=${user.email}`),
    });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    if (isLoading) {
        return <Loading />;
    }
    const handleWishListDelete = async (id) => {
        
        try {
            const isConfirm = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Remove it!',
            });
            if (isConfirm.isConfirmed) {
                const result = await axios.delete(`/delete-to-wishlist/${id}`);
                if (result?.data?.deletedCount) {
                    Swal.fire(
                        'Removed!',
                        'Successfully Removed from Wishlist.',
                        'success',
                    );
                    refetch();
                } else{
                    Swal.fire('Erorr', 'Something Went Wrong :)', 'error');
                }
            } else if (isConfirm.dismiss === Swal.DismissReason.cancel) {
                {
                    Swal.fire(
                        'Cancelled',
                        'Your Wishlist is safe :)',
                        'error',
                    );
                }
            }
        } catch (error) {
            Swal.fire('Cancelled', 'Your Wishlist is safe :)', 'error');
        }
    };
    return (
        <section className="text-gray-600 body-font bg-gray-100 dark:bg-gray-800">
            <div className="max-w-screen-lg px-5 py-24 mx-auto">
                <h3 className="text-4xl font-bold text-center mb-10">
                    My Wish List
                </h3>
                <div className="flex flex-wrap -m-4">
                    {wishlist.data.map((post) => (
                        <div key={post._id} className="p-4 md:w-1/3">
                            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden dark:border-gray-600">
                                <div className="relative">
                                    <img
                                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                                        src={post.image}
                                        alt="blog"
                                    />
                                    {user && (
                                        <FiTrash
                                            onClick={() => {
                                                handleWishListDelete(post._id);
                                            }}
                                            className="absolute top-5 right-5 text-red-500 bg-gray-200 shadow-xl cursor-pointer rounded p-0.5"
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
    );
};

export default Wishlist;
