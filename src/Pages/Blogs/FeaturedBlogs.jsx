import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

import { getTheme } from '@table-library/react-table-library/baseline';
import {
    Body,
    Cell,
    Header,
    HeaderCell,
    HeaderRow,
    Row,
    Table,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { Link } from 'react-router-dom';

const FeaturedBlogs = () => {
    const axios = useAxios();

    const {
        data: featuredPosts,
        isLoading,
    } = useQuery({
        queryKey: ['featuredPosts'],
        queryFn: () => axios.get('/featured-post'),
    });
    const theme = useTheme(getTheme());

    if (isLoading) {
        return <Loading />;
    }
    const nodes = [...featuredPosts.data];
    const data = { nodes };

    return (
        <div className="max-w-screen-lg mx-auto py-5 px-3">
            <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900  px-6 py-10 shadow-2xl rounded-xl sm:rounded-3xl sm:px-24 xl:py-20">
                <nav
                    className="flex px-5 py-3 text-gray-700 border border-white/10 rounded-lg w-fit mx-auto"
                    aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link
                                to="/"
                                className="inline-flex items-center text-sm font-medium text-gray-200 hover:text-gray-400 ">
                                <svg
                                    className="w-3 h-3 mr-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg
                                    className="w-3 h-3 mx-1 text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span
                                    href="#"
                                    className="ml-1 text-sm font-medium text-gray-200 hover:text-gray-604000 md:ml-2">
                                    Fetured Blogs
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-10 mx-auto">
                        <div className="flex justify-between">
                            <h3 className="text-4xl underline underline-offset-4 font-bold mb-10">
                                Featured Blogs
                            </h3>
                        </div>
                        <Table data={data} theme={theme}>
                        {(tableList) => (
                            <>
                                <Header>
                                    <HeaderRow>
                                        <HeaderCell>Serial</HeaderCell>
                                        <HeaderCell>Image</HeaderCell>
                                        <HeaderCell>Title</HeaderCell>
                                        <HeaderCell>Author</HeaderCell>
                                        <HeaderCell>Author Image</HeaderCell>
                                    </HeaderRow>
                                </Header>

                                <Body>
                                    {tableList.map((item, idx) => (
                                        <Row key={item._id} item={item}>
                                            <Cell>{idx+1}</Cell>
                                            <Cell><img className='w-16 rounded-xl' src={item.image}></img></Cell>
                                            <Cell>{item.title}</Cell>
                                            <Cell>
                                                {item.author}
                                            </Cell>
                                            <Cell><img className='w-16 rounded-full' src={item.authorImage} alt={item.author} /></Cell>
                                        </Row>
                                    ))}
                                </Body>
                            </>
                        )}
                    </Table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FeaturedBlogs;