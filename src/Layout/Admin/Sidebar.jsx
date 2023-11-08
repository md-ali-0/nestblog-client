import { Sidebar } from 'flowbite-react';
import PropTypes from 'prop-types';
import {
    HiOutlineMinusSm,
    HiOutlinePencilAlt,
    HiOutlinePlusSm
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const DashboardSidebar = ({ openSide }) => {
    return (
        <Sidebar
            id="logo-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform ${
                openSide ? 'transform-none' : '-translate-x-full'
            } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
            aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <li className="">
                        <NavLink
                            to="/admin"
                            aria-labelledby="flowbite-sidebar-item-:r53:"
                            className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                data-testid="flowbite-sidebar-collapse-icon"
                                className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>

                            <span
                                data-testid="flowbite-sidebar-item-content"
                                id="flowbite-sidebar-item-:r53:"
                                className="px-3 flex-1 whitespace-nowrap">
                                Dashboard
                            </span>
                        </NavLink>
                    </li>
                    <Sidebar.Collapse
                        icon={HiOutlinePencilAlt}
                        label="Blog Posts"
                        renderChevronIcon={(theme, open) => {
                            const IconComponent = open
                                ? HiOutlineMinusSm
                                : HiOutlinePlusSm;

                            return (
                                <IconComponent
                                    aria-hidden
                                    className={twMerge(
                                        theme.label.icon.open[
                                            open ? 'on' : 'off'
                                        ],
                                    )}
                                />
                            );
                        }}>
                        <li className="">
                            <NavLink
                                to="/admin/add-post"
                                aria-labelledby="flowbite-sidebar-item-:r21:"
                                className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75"
                                href="#">
                                <span
                                    data-testid="flowbite-sidebar-item-content"
                                    id="flowbite-sidebar-item-:r21:"
                                    className="px-3 flex-1 whitespace-nowrap">
                                    Add Post
                                </span>
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink
                                to="/admin/all-post"
                                aria-labelledby="flowbite-sidebar-item-:r21:"
                                className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-8 transition duration-75"
                                href="#">
                                <span
                                    data-testid="flowbite-sidebar-item-content"
                                    id="flowbite-sidebar-item-:r21:"
                                    className="px-3 flex-1 whitespace-nowrap">
                                    All Posts
                                </span>
                            </NavLink>
                        </li>
                    </Sidebar.Collapse>
                    <li className="">
                        <NavLink
                            to="/admin/categories"
                            aria-labelledby="flowbite-sidebar-item-:r53:"
                            className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                data-testid="flowbite-sidebar-collapse-icon"
                                className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                            </svg>
                            <span
                                data-testid="flowbite-sidebar-item-content"
                                id="flowbite-sidebar-item-:r53:"
                                className="px-3 flex-1 whitespace-nowrap">
                                Categories
                            </span>
                        </NavLink>
                    </li>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};
DashboardSidebar.propTypes = {
    setOpenSide: PropTypes.func,
    openSide: PropTypes.bool,
};
export default DashboardSidebar;
