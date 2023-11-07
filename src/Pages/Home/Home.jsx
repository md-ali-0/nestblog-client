import Banner from './Banner';

const Home = () => {
    return (
        <main>
            <Banner />
            <div className="container mx-auto">
                <div className="grid grid-cols-4 gap-6 md:grid-cols-6">
                    <div className="col-span-4 p-4 ">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <img
                                src="https://placeimg.com/400/250/nature"
                                alt="News Image"
                                className="w-full h-48 object-cover object-center"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-dark dark:text-white mb-2">
                                    Latest News Headline
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    Published on January 15, 2023 by Author Name
                                </p>
                                <p className="text-body-color dark:text-dark-6">
                                    This is a brief description of the latest
                                    news. It can provide a summary of the
                                    article or the most important points to
                                    catch the reader's attention.
                                </p>
                                <a
                                    href="#"
                                    className="text-primary hover:underline block mt-3">
                                    Read more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 bg-white dark:bg-gray-800 p-4 rounded shadow-md"></div>
                </div>
            </div>
        </main>
    );
};

export default Home;
