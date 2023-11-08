import { useQuery } from '@tanstack/react-query';
import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const AllPosts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPost, setTotalPost] = useState(0);
    const [postPerPage, setPostPerPage] = useState(10);
    const totalPage = Math.ceil(totalPost / postPerPage);

    const onPageChange = (page) => setCurrentPage(page);
    const axios = useAxios();

    const { data: allPosts, isLoading, refetch } = useQuery({
        queryKey: ['posts', currentPage, postPerPage],
        queryFn: () =>
            axios.get(`/all-post?page=${currentPage - 1}&size=${postPerPage}`),
    });
    const handleItemPerPage = (e) => {
        setPostPerPage(e.target.value);
        setCurrentPage(1);
    };
    const handleDeletePost = async(id) => {
        try {
            const isConfirm = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            });
            if (isConfirm.isConfirmed) {
                const result = await axios.delete(`/delete-post/${id}`);
                if (result?.data?.deletedCount) {
                    Swal.fire(
                        'Deleted!',
                        'Your Post has been deleted.',
                        'success',
                    );
                    refetch();
                }
            } else if (isConfirm.dismiss === Swal.DismissReason.cancel) {
                {
                    Swal.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error',
                    );
                }
            }
        } catch (error) {
            Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        }
    };
    useEffect(() => {
        axios
            .get('/dashboard-count')
            .then((res) => setTotalPost(res.data.postCount));
    }, [axios]);
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-5 gap-2 mt-16">
                <h3 className="text-xl font-bold py-2.5">All Posts</h3>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Short Descreption
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allPosts.data.map((post) => (
                                <tr
                                    key={post._id}
                                    className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white">
                                        <img
                                            className="w-20 rounded-md"
                                            src={post.image}
                                            alt=""
                                        />
                                    </th>
                                    <td className="px-6 py-4">
                                        <h3 className="py-2">{post.title}</h3>
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.shortDescription}
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.createdAt}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/admin/edit-post/${post._id}`}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                <FiEdit
                                                    size={15}
                                                    className="inline"
                                                />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDeletePost(post._id)
                                                }
                                                className="font-medium text-red-600 dark:red-blue-500 hover:underline">
                                                <FiTrash2
                                                    size={15}
                                                    className="inline"
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
