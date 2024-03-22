import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiErrorCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Register = () => {
    const [show, setShow] = useState(false);
    const navigation = useNavigate()
    const {signUp} = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = async (data) => {

        const{username, name, email, password} = data
        const toastLoading = toast.loading('User Signuping...')
        try {
            const response = await signUp(username, name, email, password)
            toast.dismiss(toastLoading)
            toast.success('Sign Up Successfully')
            navigation('/dashboard')
        } catch (error) {
            console.log(error);
            toast.dismiss(toastLoading)
            toast.error(error?.response?.data)
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
                                            htmlFor="name"
                                            className="text-sm font-medium">
                                            Full Name
                                        </label>
                                        <input
                                            id='name'
                                            name='name'
                                            type="text"
                                            {...register('name', {
                                                required:
                                                    'Name is required.',
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        'Name should be at least 3 characters.',
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
                                            htmlFor="userName"
                                            className="text-sm font-medium">
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            id='username'
                                            name='username'
                                            {...register('username', {
                                                required:
                                                    'Username is required.',
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
                                            placeholder="Enter Username"
                                            className="w-full block border placeholder-gray-500 px-5 py-3 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-0 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400"
                                        />
                                        {errors.username && (
                                            <span className="text-center text-red-500 flex items-center gap-1">
                                                <BiErrorCircle
                                                    className="inline-block ml-2"
                                                    size={15}
                                                />
                                                {errors.username?.message}
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
                                            type="email"
                                            id='email'
                                            name='email'
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
                                            id='password'
                                            name='password'
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
