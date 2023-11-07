import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <section className="flex items-center p-14 dark:bg-gray-900 h-screen dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span className="sr-only">Error</span>4<span className="text-primary">0</span>4
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">
                        Sorry, we couldn&apos;t find this page.
                    </p>
                    <p className="mt-4 mb-8 dark:text-gray-400">
                        But dont worry, you can find plenty of other things on
                        our homepage.
                    </p>
                    <Link to='/'
                        className="rounded-lg border border-primary bg-primary px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary disabled:bg-primary">
                        Back to homepage
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Error404;
