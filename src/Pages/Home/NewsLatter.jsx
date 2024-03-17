import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiErrorCircle } from 'react-icons/bi';

const NewsLatter = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = () => {
        toast.success('Thank you for subscribing to our newsletter');
        reset();
    };
    return (
        <div className="mx-auto my-5 container px-3 lg:px-8">
            <div className="relative overflow-hidden bg-gray-200 px-6 py-10 shadow rounded sm:rounded-xl sm:px-24 xl:py-20">
                <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Keep Updated
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-primary/60">
                    Keep pace with SecureCloud advancements! Join our mailing
                    list for selective, noteworthy updates.
                </p>
                <form
                    className="mx-auto mt-5 flex max-w-md gap-x-4"
                    onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        type="text"
                        {...register('email', {
                            required: 'Email is required.',
                            pattern: {
                                value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Invalid email format.',
                            },
                        })}
                        className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-primary shadow-sm ring-1 ring-inset ring-primary/20 focus:ring-2 focus:ring-inset focus:ring-primary/60 sm:text-sm sm:leading-6"
                        placeholder="Enter your email"
                    />
                    <button
                        type="submit"
                        className="flex-none rounded-md bg-primary text-white px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                        Notify me
                    </button>
                    
                </form>
                {errors.email && (
                        <span className=" text-center text-red-500 flex justify-center items-center gap-1 py-2">
                            <BiErrorCircle
                                className="inline-block ml-2"
                                size={15}
                            />{' '}
                            {errors.email?.message}
                        </span>
                    )}
                <svg
                    viewBox="0 0 1024 1024"
                    className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
                    aria-hidden="true">
                    <circle
                        cx={512}
                        cy={512}
                        r={512}
                        fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                        fillOpacity="0.7"></circle>
                    <defs>
                        <radialGradient
                            id="759c1415-0410-454c-8f7c-9a820de03641"
                            cx={0}
                            cy={0}
                            r={1}
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(512 512) rotate(90) scale(512)">
                            <stop stopColor="#7775D6" />
                            <stop
                                offset={1}
                                stopColor="#7ED321"
                                stopOpacity={0}
                            />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default NewsLatter;
