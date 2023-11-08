import { Avatar, DarkThemeToggle, Dropdown, Flowbite } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import logo from '../../assets/logo.svg';
// import Loading from '../components/loading';

const Header = ({ openSide, setOpenSide }) => {
    const { user, isLoading, logOutUser, setIsLoading } =
        useContext(AuthContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // if (isLoading) {
    //     return <Loading />;
    // }
    const handlelogOutUser = async () => {
        try {
            await logOutUser();
            console.log('afterlogout');
            toast.success('LogOut success!');
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            toast.error('LogOut Error!');
        }
    };
    return (
        <Flowbite>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={() => setOpenSide(!openSide)}
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <Link className="flex items-center" to="/admin">
                                <img
                                    src={logo}
                                    className="mr-3 h-6 md:h-9 dark:invert"
                                    alt="Kotha Logo"
                                />
                            </Link>
                        </div>
                        <div className="flex md:order-2">
                            <DarkThemeToggle className="mr-2 focus:ring-0" />
                            <Link
                                to="/"
                                className="flex items-center justify-center rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 mr-2 focus:ring-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </Link>
                            {user && (
                                <Dropdown
                                    className="z-50"
                                    arrowIcon={false}
                                    inline
                                    label={
                                        <Avatar
                                            alt="User settings"
                                            img={user?.photoURL}
                                            rounded
                                        />
                                    }>
                                    <Dropdown.Header>
                                        <span className="block text-sm">
                                            {user?.displayName}
                                        </span>
                                        <span className="block truncate text-sm font-medium">
                                            {user?.email}
                                        </span>
                                    </Dropdown.Header>
                                    <Link
                                        className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white"
                                        to="/admin">
                                        Dashboard
                                    </Link>
                                    <Link
                                        className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white"
                                        to="/admin/dashboard">
                                        Profile
                                    </Link>
                                    <Dropdown.Item>Settings</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handlelogOutUser}>
                                        Sign out
                                    </Dropdown.Item>
                                </Dropdown>
                            )}
                        </div>
                    </div>
                </div>
                <Toaster />
            </nav>
        </Flowbite>
    );
};
Header.propTypes = {
    setOpenSide: PropTypes.func,
    openSide: PropTypes.bool,
};
export default Header;
