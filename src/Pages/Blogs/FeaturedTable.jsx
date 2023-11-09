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
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';

const FeaturedTable = ({ user }) => {
    const email = user.email;

    const axios = useAxios();
    const {
        data: featuredPosts,
        isLoading,
    } = useQuery({
        queryKey: ['featuredPosts'],
        queryFn: async () => {
            const data = await axios.get(`/featured-post/${email}`);
            return data.data;
        },
    });
    console.log(featuredPosts);
    const theme = useTheme(getTheme());

    if (isLoading) {
        return <Loading />;
    }

    const nodes = [...featuredPosts];
    const data = { nodes };
    return (
        <div>
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
                            {tableList?.map((item, idx) => (
                                <Row key={item._id} item={item}>
                                    <Cell>{idx + 1}</Cell>
                                    <Cell>
                                        <img
                                            className="w-16 rounded-xl"
                                            src={item.image}></img>
                                    </Cell>
                                    <Cell>{item.title}</Cell>
                                    <Cell>{item.author}</Cell>
                                    <Cell>
                                        <img
                                            className="w-16 rounded-full"
                                            src={item.authorImage}
                                            alt={item.author}
                                        />
                                    </Cell>
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>
        </div>
    );
};
FeaturedTable.propTypes = {
    user: PropTypes.object.isRequired,
};
export default FeaturedTable;
