import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiErrorCircle } from 'react-icons/bi';
import { useLoaderData } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';

const UpdateComment = () => {
    const comment = useLoaderData();
    const axios = useAxios();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = async (data) => {
        try {
            console.log(comment.id);
            const res = await axios.put(`/comment/update/${comment.id}`, data);
            toast.success('Comment Edited');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Update Comment
                </h2>
            </div>
            <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                        Your comment
                    </label>
                    <textarea
                        id="comment"
                        {...register('comment', {
                            required: 'comment Name is required.',
                        })}
                        rows={6}
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..."
                        required=""
                        defaultValue={comment.comment}
                    />
                    {errors.comment && (
                        <span className="text-center text-red-500 flex items-center gap-1">
                            <BiErrorCircle
                                className="inline-block ml-2"
                                size={15}
                            />{' '}
                            {errors.comment?.message}
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Update comment
                </button>
            </form>
        </div>
    );
};

export default UpdateComment;
