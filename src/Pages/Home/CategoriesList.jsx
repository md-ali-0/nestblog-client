import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const CategoriesList = () => {
    const axios = useAxios();
    const {
        data: categories,
        isLoading,
    } = useQuery({
        queryKey: ['categoriesHome'],
        queryFn: () => axios.get('/category/all'),
    });
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div>
            <div className="">
                <h3 className="text-4xl font-bold pb-3">Categories</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden my-5">
                <ul className="px-5 flex flex-wrap gap-2 py-3.5">
                    {
                        categories.data.map(category=>(
                        <li key={category._id} className="flex border border-primary/60 rounded-xl py-1 px-2">
                            <Link to={`/category/${category.name}`}
                                
                                className="text-gray-800 font-semibold hover:text-blue-500 dark:text-gray-100">
                                {category.name}
                            </Link>
                        </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default CategoriesList;
