import banner from '../../assets/thumb.png';
const Banner = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-5xl text-3xl mb-4 font-bold text-gray-900 dark:text-[#ADB5BD]">
                        Hello, I’m <span className="text-primary">Ali</span>
                        <br />
                        Welcome to my blog
                    </h1>
                    <p className="mb-8 leading-relaxed dark:text-[#b4bfd0]">
                        The fancy moon going in little artist painting. Thirty
                        days of lavender in the dreamy light inside. Other
                        perfect oh plants, for and again. I’ve honey feeling.
                    </p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-blue-500 rounded text-lg">
                            Explore
                        </button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src={banner}
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;
