import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section className="px-3 pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-transparent">
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-between -mx-4">
                    <div className="w-full px-4 lg:w-6/12">
                        <div className="flex items-center -mx-3 sm:-mx-4">
                            <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                <div className="py-3 sm:py-4">
                                    <img
                                        src="https://i.ibb.co/gFb3ns6/image-1.jpg"
                                        alt=""
                                        className="w-full rounded-2xl"
                                    />
                                </div>
                                <div className="py-3 sm:py-4">
                                    <img
                                        src="https://i.ibb.co/rfHFq15/image-2.jpg"
                                        alt=""
                                        className="w-full rounded-2xl"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                <div className="relative z-10 my-4">
                                    <img
                                        src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                                        alt=""
                                        className="w-full rounded-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                        <div className="mt-10 lg:mt-0">
                            <span className="block mb-4 text-lg font-semibold text-primary">
                                Why Our Blog Stands Out
                            </span>
                            <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                                Elevate Customer Satisfaction with Our Insights
                            </h2>
                            <p className="mb-5 text-base text-body-color dark:text-dark-6">
                                Our blog delivers valuable insights that
                                captivate and engage readers. When crafting your
                                content, it&apos;s essential to ensure it captures
                                your audience&apos;s attention and provides relevant
                                information.
                            </p>
                            <p className="mb-8 text-base text-body-color dark:text-dark-6">
                                The choice of a domain name is a critical first
                                step in building your brand. Make a lasting
                                impression with a domain name that aligns
                                perfectly with your business identity.
                            </p>

                            <Link
                                to="/"
                                className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
