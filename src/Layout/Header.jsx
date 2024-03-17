import { Avatar, DarkThemeToggle, Dropdown, Flowbite, Navbar } from 'flowbite-react';
import { useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import useAxios from '../Hooks/useAxios';
import logo from '../assets/logo.svg';

const Header = () => {
    const axios = useAxios();
    const { user, logOutUser, setIsLoading } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogOutUser = async () => {
        try {
            await logOutUser();
            const logout = await axios.post('/logout');
            if (logout.status === 200) {
                toast.success('LogOut success!');
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            toast.error('LogOut Error!');
        }
    };

    return (
        <Flowbite>
            <header>
                <Navbar
                    className="backdrop-blur relative"
                    container="true">
                    <Link className="flex items-center" to="/">
                        <img
                            src={logo}
                            className="mr-3 h-6 md:h-9 dark:invert"
                            alt="Kotha Logo"
                        />
                    </Link>
                    <div className="flex md:order-2">
                        <DarkThemeToggle className="mr-2 focus:ring-0" />
                        {user ? (
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
                                    Admin
                                </Link>
                                <Dropdown.Divider />
                                <Link
                                    className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white"
                                    to="/admin/add-post">
                                    Add Blog
                                </Link>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogOutUser}>
                                    Sign out
                                </Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <div className="flex justify-center gap-2">
                                <Link
                                    to="/login"
                                    className="inline-flex text-white bg-primary border-0 py-1.5 px-3 focus:outline-none hover:bg-blue-500 rounded text-lg">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="inline-flex text-gray-700 bg-gray-100 border-0 py-1.5 px-3 focus:outline-none hover:bg-gray-200 rounded text-lg dark:bg-[#1F2937] dark:text-gray-400">
                                    Register
                                </Link>
                            </div>
                        )}
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'block py-2 pr-4 pl-3 md:p-0 bg-primary text-white dark:text-white md:bg-transparent md:text-primary'
                                    : 'block py-2 pr-4 pl-3 md:p-0 text-gray-600 dark:text-gray-300 md:bg-transparent'
                            }>
                            Home
                        </NavLink>
                        <NavLink
                            to="/all-blogs"
                            className={({ isActive }) =>
                                isActive
                                    ? 'block py-2 pr-4 pl-3 md:p-0 bg-primary text-white dark:text-white md:bg-transparent md:text-primary'
                                    : 'block py-2 pr-4 pl-3 md:p-0 text-gray-600 dark:text-gray-300 md:bg-transparent'
                            }>
                            All blogs
                        </NavLink>
                        <NavLink
                            to="/featured-blogs"
                            className={({ isActive }) =>
                                isActive
                                    ? 'block py-2 pr-4 pl-3 md:p-0 bg-primary text-white dark:text-white md:bg-transparent md:text-primary'
                                    : 'block py-2 pr-4 pl-3 md:p-0 text-gray-600 dark:text-gray-300 md:bg-transparent'
                            }>
                            Featured Blogs
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? 'block py-2 pr-4 pl-3 md:p-0 bg-primary text-white dark:text-white md:bg-transparent md:text-primary'
                                    : 'block py-2 pr-4 pl-3 md:p-0 text-gray-600 dark:text-gray-300 md:bg-transparent'
                            }>
                            About
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? 'block py-2 pr-4 pl-3 md:p-0 bg-primary text-white dark:text-white md:bg-transparent md:text-primary'
                                    : 'block py-2 pr-4 pl-3 md:p-0 text-gray-600 dark:text-gray-300 md:bg-transparent'
                            }>
                            Contact
                        </NavLink>
                        <NavLink
                            to="/wishlist"
                            className={({ isActive }) =>
                                isActive
                                    ? 'block py-2 pr-4 pl-3 md:p-0 bg-primary text-white dark:text-white md:bg-transparent md:text-primary'
                                    : 'block py-2 pr-4 pl-3 md:p-0 text-gray-600 dark:text-gray-300 md:bg-transparent'
                            }>
                            Wishlist
                        </NavLink>
                    </Navbar.Collapse>
                </Navbar>
                <Toaster />
            </header>
        </Flowbite>
    );
};

export default Header;
