import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const BlogDetail = () => {
    const { user } = useContext(AuthContext);
    const blog = useLoaderData();
    const axios = useAxios();
    const {
        _id,
        author,
        category,
        image,
        shortDescription,
        longDescription,
        authorImage,
        createdBy,
        title,
        createdAt,
    } = blog;
    const {
        data: comments,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['comments'],
        queryFn: () => axios.get(`/comments?postId=${_id}`),
    });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const commentHandler = (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        const newComment = {
            comment,
            postId: _id,
            name: user.displayName,
            authorImage: user.photoURL,
            email: user.email,
        };
        axios
            .post('/add-comment', newComment)
            .then(() => {
                toast.success('comment add successfully');
                e.target.reset();
                refetch();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="max-w-screen-lg mx-auto py-5 px-3">
            <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900  px-6 py-10 shadow-2xl rounded-xl sm:rounded-3xl sm:px-24 xl:py-20">
                <nav
                    className="flex px-5 py-3 text-gray-700 border border-white/10 rounded-lg w-fit mx-auto"
                    aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link
                                to="/"
                                className="inline-flex items-center text-sm font-medium text-gray-200 hover:text-gray-400 ">
                                <svg
                                    className="w-3 h-3 mr-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="w-3 h-3 mx-1 text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span className="ml-1 text-sm font-medium text-gray-200 hover:text-gray-604000 md:ml-2">
                                    Blog Details
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div>
                <main className="mt-10">
                    <div
                        className="mb-4 md:mb-0 w-full max-w-screen-lg mx-auto relative"
                        style={{ height: '24em' }}>
                        <PhotoProvider>
                            <PhotoView src={image}>
                                <img
                                    className=" rounded-xl left-0 top-0 w-full h-full z-0"
                                    src={image}
                                />
                            </PhotoView>
                        </PhotoProvider>
                        <div className="p-4 absolute bottom-0 left-0 z-20">
                            <span className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
                                {category}
                            </span>
                            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                                {title}
                            </h2>
                            <div className="flex mt-3">
                                <PhotoProvider>
                                    <PhotoView src={authorImage}>
                                        <img
                                            className="h-10 w-10 rounded-full mr-2 object-cover"
                                            src={authorImage}
                                            alt=""
                                        />
                                    </PhotoView>
                                </PhotoProvider>
                                <div>
                                    <p className="font-semibold text-gray-200 text-sm">
                                        {author}
                                    </p>
                                    <p className="font-semibold text-gray-400 text-xs">
                                        {new Date(createdAt).toDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {user && (
                        <div className="m-5">
                            {createdBy == user.email ? (
                                <Link
                                    className="bg-blue-500 rounded text-white px-1 py-0.5"
                                    to={`/admin/edit-post/${_id}`}>
                                    Edit
                                </Link>
                            ) : null}
                        </div>
                    )}
                    <div className="px-5 lg:px-10 py-5 mt-12 bg-white dark:bg-gray-800 dark:text-white/50 max-w-screen-lg shadow-xl rounded-xl text-gray-700 mx-auto text-lg leading-relaxed">
                        <p className="pb-6">{shortDescription}</p>
                    </div>
                    <div className="px-5 lg:px-10 py-5 mt-12 bg-white dark:bg-gray-800 dark:text-white/50 max-w-screen-lg shadow-xl rounded-xl text-gray-700 mx-auto text-lg leading-relaxed">
                        <p className="pb-6">{longDescription}</p>
                    </div>
                </main>
                <section className="bg-white dark:bg-gray-800 py-5 my-5 lg:py-16 max-w-screen-lg shadow-xl rounded-xl">
                    <div className="max-w-2xl mx-auto px-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                Write Comments
                            </h2>
                        </div>
                        {user ? (
                            <div>
                                {createdBy !== user?.email ? (
                                    <form
                                        className="mb-6"
                                        onSubmit={commentHandler}>
                                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                            <label
                                                htmlFor="comment"
                                                className="sr-only">
                                                Your comment
                                            </label>
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                rows={6}
                                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                placeholder="Write a comment..."
                                                required=""
                                                defaultValue={''}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                            Post comment
                                        </button>
                                    </form>
                                ) : (
                                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <p>
                                        You Don&apos;t have persmisson to
                                        Comment.
                                    </p>
                                    </div>
                                )}
                            </div>
                        ): (
                            <p>
                                You need to sign in to comment.
                            </p>
                        )}
                    </div>
                </section>

                <div className="max-w-screen-lg mt-10 bg-white dark:bg-gray-800 dark:text-white/50 shadow-xl rounded-xl p-5">
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    {comments.data.length > 0 ? (
                        comments.data.map((comment) => (
                            <article
                                key={comment._id}
                                className="p-6 text-base">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                            <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src={comment.authorImage}
                                                alt={comment.name}
                                            />
                                            {comment.name}
                                        </p>
                                    </div>
                                    {user && (
                                        <div>
                                            {comment.email == user.email ? (
                                                <Link
                                                    className="bg-blue-500 rounded text-white px-1 py-0.5"
                                                    to={`/update-comment/${comment._id}`}>
                                                    Edit
                                                </Link>
                                            ) : null}
                                        </div>
                                    )}
                                </footer>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {comment.comment}
                                </p>
                            </article>
                        ))
                    ) : (
                        <p>No comments available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
