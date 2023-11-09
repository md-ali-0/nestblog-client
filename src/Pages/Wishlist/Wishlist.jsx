import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../../components/Loading';
import WishlistItems from './WishlistItems';

const Wishlist = () => {
    const { isLoading } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <section className="text-gray-600 body-font bg-gray-100 dark:bg-gray-800">
            <div className="max-w-screen-lg px-5 py-24 mx-auto">
                <h3 className="text-4xl font-bold text-center mb-10">
                    My Wish List
                </h3>
                <WishlistItems/>
            </div>
        </section>
    );
};

export default Wishlist;
