import PropTypes from 'prop-types';
import { FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WishListCard = ({ post , handleWishListDelete}) => {
    
    const { _id, title, image, category, shortDescription, createdAt} = post

    return (
        <div>
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden dark:border-gray-600">
                <div className="relative">
                    <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={image}
                        alt="blog"
                    />
                    <FiTrash
                        onClick={() => {
                            handleWishListDelete(_id);
                        }}
                        className="absolute top-5 right-5 text-red-500 bg-gray-200 shadow-xl cursor-pointer rounded p-0.5"
                        size={25}
                    />
                </div>
                <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 dark:text-gray-400 mb-1">
                        {category}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 dark:text-gray-200 mb-3">
                        {title}
                    </h1>
                    <p className="leading-relaxed mb-3">
                        {shortDescription}
                    </p>
                    <div className="flex items-center flex-wrap ">
                        <Link
                            to={`/blog/${_id}`}
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
                            {new Date(createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
WishListCard.propTypes = {
    post: PropTypes.object,
    handleWishListDelete: PropTypes.func,
};
export default WishListCard;
