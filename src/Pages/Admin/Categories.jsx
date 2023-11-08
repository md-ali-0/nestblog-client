import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiErrorCircle } from 'react-icons/bi';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

import { getTheme } from '@table-library/react-table-library/baseline';
import {
    Body,
    Cell,
    Header,
    HeaderCell,
    HeaderRow,
    Row,
    Table,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { Link } from 'react-router-dom';

const Categories = () => {
    const axios = useAxios();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {
        data: categories,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get('/categories'),
    });
    const theme = useTheme(getTheme());

    if (isLoading) {
        return <Loading />;
    }
    const nodes = [...categories.data.result];
    const data = { nodes };

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('/add-category', data);
            if (res.data?.acknowledged) {
                toast.success('Category Added');
                reset();
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const delteCategory = async (id) => {
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
                const result = await axios.delete(`/delete-category/${id}`);
                console.log(result);
                if (result?.data?.acknowledged) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
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
                    <Table data={data} theme={theme}>
                        {(tableList) => (
                            <>
                                <Header>
                                    <HeaderRow>
                                        <HeaderCell>Category Name</HeaderCell>
                                        <HeaderCell>Description</HeaderCell>
                                        <HeaderCell>Keyword</HeaderCell>
                                        <HeaderCell>Action</HeaderCell>
                                    </HeaderRow>
                                </Header>

                                <Body>
                                    {tableList.map((item) => (
                                        <Row key={item._id} item={item}>
                                            <Cell>{item.categoryName}</Cell>
                                            <Cell>
                                                {item.categoryDescription}
                                            </Cell>
                                            <Cell>{item.categoryKeywords}</Cell>
                                            <Cell>
                                                <div className="flex justify-center items-center gap-1">
                                                    <Link
                                                        to={`/admin/edit-category/${item._id}`}
                                                        className="bg-blue-500 rounded text-white px-1.5 py-0.5">
                                                        <FiEdit
                                                            size={15}
                                                            className="inline"
                                                        />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            delteCategory(
                                                                item._id,
                                                            )
                                                        }
                                                        className="bg-red-500 rounded text-white px-1.5 py-0.5">
                                                        <FiTrash2
                                                            size={15}
                                                            className="inline"
                                                        />
                                                    </button>
                                                </div>
                                            </Cell>
                                        </Row>
                                    ))}
                                </Body>
                            </>
                        )}
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Categories;
