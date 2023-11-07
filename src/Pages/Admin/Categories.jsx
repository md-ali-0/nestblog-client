
import { useForm } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';

const Categories = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-5 flex gap-2 mt-16">
                <div className="border-gray-200 p-5 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 md:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <label
                                htmlFor="categoryName"
                                className="text-xk font-medium">
                                Category Name:
                            </label>
                            <input
                                type="text"
                                {...register('categoryName', {
                                    required: 'Category Name is required.',
                                })}
                                placeholder="Enter Category Name"
                                className="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                            />
                            {errors.categoryName && (
                                <span className="text-center text-red-500 flex items-center gap-1">
                                    <BiErrorCircle
                                        className="inline-block ml-2"
                                        size={15}
                                    />{' '}
                                    {errors.categoryName?.message}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="categoryName"
                                className="text-xk font-medium">
                                Category Description:
                            </label>
                            <input
                                type="text"
                                {...register('categoryDescription', {
                                    required:
                                        'Category Description is required.',
                                })}
                                placeholder="Enter Category Description"
                                className="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                            />
                            {errors.categoryDescription && (
                                <span className="text-center text-red-500 flex items-center gap-1">
                                    <BiErrorCircle
                                        className="inline-block ml-2"
                                        size={15}
                                    />{' '}
                                    {errors.categoryDescription?.message}
                                </span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="categoryName"
                                className="text-xk font-medium">
                                Category Keywords :
                            </label>
                            <input
                                type="text"
                                {...register('categoryKeywords', {
                                    required: 'Category Keywords is required.',
                                })}
                                placeholder="Enter Category Keywords"
                                className="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                            />
                            {errors.categoryKeywords && (
                                <span className="text-center text-red-500 flex items-center gap-1">
                                    <BiErrorCircle
                                        className="inline-block ml-2"
                                        size={15}
                                    />{' '}
                                    {errors.categoryKeywords?.message}
                                </span>
                            )}
                        </div>
                        <div className="py-2">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-plus">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>Add Category</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="border-gray-200 rounded-lg p-5 bg-white dark:bg-gray-800 dark:border-gray-700 md:w-1/2">
                    sss
                </div>
            </div>
        </div>
    );
};

export default Categories;
