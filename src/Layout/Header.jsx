import {
    Avatar,
    Button,
    DarkThemeToggle,
    Dropdown,
    Flowbite,
    Navbar,
} from 'flowbite-react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
const Header = () => {
    const user = false;
    return (
        <Flowbite>
            <header>
                <Navbar
                    className="bg-white/60 dark:bg-[#161819] shadow-sm dark:shadow-xl backdrop-blur relative"
                    container="true">
                    <Link className="flex items-center" to="/">
                        <img
                            src={logo}
                            className="mr-3 h-6 md:h-9 dark:invert"
                            alt="Kotha Logo"
                        />
                    </Link>
                    <div className="flex md:order-2">
                        <DarkThemeToggle className="mr-2" />
                        {user ? (
                            <Dropdown
                                className="z-50"
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar
                                        alt="User settings"
                                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        rounded
                                    />
                                }>
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                        Bonnie Green
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        name@flowbite.com
                                    </span>
                                </Dropdown.Header>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item>Sign out</Dropdown.Item>
                            </Dropdown>
                        ) : (
                            <div className="flex gap-3 px-2">
                                <Button size="sm" color="blue">
                                    <Link to='/auth/login'>Login</Link>
                                </Button>
                                <Button size="sm" color="gray">
                                    <Link to='/auth/register'>Register</Link>
                                </Button>
                            </div>
                        )}
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <NavLink
                            to="/"
                            className="block py-2 pr-4 pl-3 md:p-0 bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700">
                            Home
                        </NavLink>
                        <Navbar.Link href="/blogs">All blogs</Navbar.Link>
                        <Navbar.Link href="/featured-blogs">
                            Featured Blogs
                        </Navbar.Link>
                        <Navbar.Link href="/about">About</Navbar.Link>
                        <Navbar.Link href="/contact">Contact</Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </Flowbite>
    );
};

export default Header;
