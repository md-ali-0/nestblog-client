import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiErrorCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import useImageUpload from '../../Hooks/useImageUpload';

const Register = () => {
    const { createUser, updateUser, logOutUser, googleLogin, setIsLoading } =
        useContext(AuthContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const axios = useAxios();
    const { uploadImage } = useImageUpload();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = async (data) => {
        const { name, picture, email, password } = data;
        const  loadingToast = toast.loading('Creating Account ... !!');
        try {
            const userResult = await createUser(email, password);
            const user = userResult.user;
            const newUser = {
                name: name,
                email: user.email,
                role: 'admin',
                createdAt: user.metadata?.creationTime,
                lastSignInTime: user.metadata?.lastSignInTime,
            };
            if (userResult.user?.email) {
                try {
                    await axios.post('/add-user', newUser)
                    const imageResult = await uploadImage(picture[0]);
                    if (imageResult) {
                        await updateUser(name, imageResult);
                        toast.dismiss(loadingToast);
                        toast.success('Successfully created!');
                        await logOutUser();
                        navigate('/login');
                    }
                } catch (error) {
                    setIsLoading(false)
                    console.log('Error image', error);
                }
            }
        } catch (error) {
            if ('auth/email-already-in-use' === error.code) {
                toast.dismiss(loadingToast);
                return toast.error('Email Already Used!');
            }
            setIsLoading(false)
            toast.dismiss(loadingToast);
            toast.error(error.code);
        }
    };
    const handleGoogleLogin = async () => {
        const  loadingToast = toast.loading('Creating Account ... !!');
        try {
            const googleLoginUser = await googleLogin();
            if (googleLoginUser.user?.email) {

                const user = googleLoginUser.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    role: 'admin',
                    createdAt: user.metadata?.creationTime,
                    lastSignInTime: user.metadata?.lastSignInTime,
                };
                await axios.put('/edit-user', newUser)
                toast.dismiss(loadingToast);
                toast.success('Successfully created!');
                await logOutUser();
                navigate('/auth/login');
            }
        } catch (error) {
            if ('auth/email-already-in-use' === error.code) {
                return toast.error('Email Already Used!');
            }
            toast.dismiss(loadingToast);
            setIsLoading(false)
            toast.error(error.code);
        }
    };
    return (
        <div className="flex flex-col mx-auto w-full min-h-screen min-w-[320px] bg-gray-100 dark:text-gray-100 dark:bg-gray-900">
            <main className="flex flex-auto flex-col max-w-full">
                <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-5 w-full">
                    <section className="py-2 w-full max-w-xl">
                        <header className="mb-10 text-center">
                            <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                                Welcome, Please Sign Up
                            </h2>
                        </header>
                        <div className="flex flex-col rounded-lg shadow-sm bg-white dark:text-gray-100 dark:bg-gray-800">
                            <div className="p-5 md:px-16 md:py-10 grow">
                                <form
                                    className="space-y-6"
                                    onSubmit={handleSubmit(onSubmit)}>
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="userName"
                                            className="text-sm font-medium">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            {...register('name', {
                                                required:
                                                    'Name is required.',
                                                minLength: {
                                                    value: 5,
                                                    message:
                                                        'Name should be at least 5 characters.',
                                                },
                                                maxLength: {
                                                    value: 15,
                                                    message:
                                                        'Name should not exceed 15 characters.',
                                                },
                                            })}
                                            placeholder="Enter Full Name"
                                            className="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                                        />
                                        {errors.name && (
                                            <span className="text-center text-red-500 flex items-center gap-1">
                                                <BiErrorCircle
                                                    className="inline-block ml-2"
                                                    size={15}
                                                />
                                                {errors.name?.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="picture"
                                            className="text-sm font-medium">
                                            Profile Picture
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            {...register('picture', {
                                                required:
                                                    'Profile Picture is required.',
                                                validate: (value) => {
                                                    const acceptFormat = [
                                                        'png',
                                                        'jpg',
                                                        'jpeg',
                                                    ];
                                                    const fileExtension =
                                                        value[0]?.name
                                                            .split('.')
                                                            .pop()
                                                            .toLowerCase();
                                                    if (
                                                        !acceptFormat.includes(
                                                            fileExtension,
                                                        )
                                                    ) {
                                                        return 'Invalid file. Select .png, .jpg, .jpeg only.';
                                                    }
                                                    return true;
                                                },
                                            })}
                                            className="w-full block border placeholder-gray-500 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                                        />
                                        {errors.picture && (
                                            <span className="text-center text-red-500 flex items-center gap-1">
                                                <BiErrorCircle
                                                    className="inline-block ml-2"
                                                    size={15}
                                                />{' '}
                                                {errors.picture?.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-medium">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            {...register('email', {
                                                required: 'Email is required.',
                                                pattern: {
                                                    value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                    message:
                                                        'Invalid email format.',
                                                },
                                            })}
                                            placeholder="Enter your email"
                                            className="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                                        />
                                        {errors.email && (
                                            <span className="text-center text-red-500 flex items-center gap-1">
                                                <BiErrorCircle
                                                    className="inline-block ml-2"
                                                    size={15}
                                                />{' '}
                                                {errors.email?.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-1 relative">
                                        <label
                                            htmlFor="password"
                                            className="text-sm font-medium">
                                            Password
                                        </label>
                                        <input
                                            type={show ? 'text' : 'password'}
                                            {...register('password', {
                                                required:
                                                    'Password is required.',
                                                minLength: {
                                                    value: 6,
                                                    message:
                                                        'Password must be at least 6 characters long.',
                                                },
                                                pattern: {
                                                    value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
                                                    message:
                                                        'Invalid password: no capitals, specials or numbers.',
                                                },
                                            })}
                                            placeholder="Enter your password"
                                            className="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                                        />
                                        <span
                                            onClick={() => setShow(!show)}
                                            className="absolute top-10 right-5 cursor-pointer">
                                            {show ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                    <line
                                                        x1="1"
                                                        y1="1"
                                                        x2="23"
                                                        y2="23"></line>
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="3"></circle>
                                                </svg>
                                            )}
                                        </span>

                                        {errors.password && (
                                            <span className="text-center text-red-500 flex items-center gap-1">
                                                <BiErrorCircle
                                                    className="inline-block ml-2"
                                                    size={15}
                                                />
                                                {errors.password.message}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 border-blue-700 bg-blue-700 text-white hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:bg-blue-700 active:border-blue-700 dark:focus:ring-blue-400 dark:focus:ring-opacity-90">
                                            <svg
                                                className="hi-mini hi-arrow-uturn-right inline-block w-5 h-5 opacity-50"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>Sign Up</span>
                                        </button>

                                        <div className="flex items-center my-5">
                                            <span
                                                aria-hidden="true"
                                                className="grow bg-gray-100 rounded h-0.5 dark:bg-gray-700/75"
                                            />
                                            <span className="text-xs font-medium text-gray-800 bg-gray-100 rounded-full px-3 py-1 dark:bg-gray-700 dark:text-gray-200">
                                                or sign up with
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="grow bg-gray-100 rounded h-0.5 dark:bg-gray-700/75"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                type="button"
                                                onClick={handleGoogleLogin}
                                                className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700">
                                                <svg
                                                    className="bi bi-facebook inline-block w-4 h-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    x="0px"
                                                    y="0px"
                                                    viewBox="0 0 48 48">
                                                    <path
                                                        fill="#FFC107"
                                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                                    <path
                                                        fill="#FF3D00"
                                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                                    <path
                                                        fill="#4CAF50"
                                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                                    <path
                                                        fill="#1976D2"
                                                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                                </svg>
                                                <span>Google</span>
                                            </button>
                                            <button
                                                type="button"
                                                
                                                className="inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-3 py-2 leading-5 text-sm border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700">
                                                <svg
                                                    className="bi bi-twitter inline-block w-4 h-4 text-[#1da1f2]"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                    aria-hidden="true">
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                                </svg>
                                                <span>Twitter</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="p-5 md:px-16 rounded-b-xl grow text-sm text-center bg-gray-50 dark:bg-gray-700/50">
                                Don’t have an account yet?
                                <Link
                                    to="/login"
                                    className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300">
                                    <span className="px-1 font-bold">
                                        Login
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Register;
