import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const AllPosts = () => {
    const axios = useAxios();
    const { data: allPosts, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: () => axios.get('/all-post'),
    });
    if (isLoading) {
        return <Loading />;
    }
    console.log(allPosts.data);
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
                                    <td className="px-6 py-4"><h3 className='py-2'>{post.title}</h3></td>
                                    <td className="px-6 py-4">{post.category}</td>
                                    <td className="px-6 py-4">{post.shortDescription}</td>
                                    <td className="px-6 py-4">{post.createdAt}</td>
                                    <td className="px-6 py-4">
                                        <a
                                            href="#"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
