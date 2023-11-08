import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiErrorCircle } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";


const CategoryEdit = () => {
    const categoryDetails = useLoaderData();
    const {_id, categoryName, categoryDescription, categoryKeywords} = categoryDetails;
    const axios = useAxios();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.put(`/edit-category/${_id}`, data);
            if (res.data?.acknowledged) {
                toast.success('Category Edited');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-5 flex flex-col md:flex-row gap-2 mt-16">
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
                                defaultValue={categoryName}
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
                                defaultValue={categoryDescription}
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
                                defaultValue={categoryKeywords}
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
                                <span>Update Category</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryEdit;
