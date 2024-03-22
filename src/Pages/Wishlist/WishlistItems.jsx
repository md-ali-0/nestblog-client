import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
import useAxios from '../../Hooks/useAxios';
import Loading from '../../components/Loading';
import WishListCard from './WishListCard';

const WishlistItems = () => {
    const { user } = useContext(AuthContext);
    const email = user.email;

    const axios = useAxios();
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['wishlist'],
        queryFn: async () => {
            const data = await axios.get(`/wishlist/all/${email}`);
            return data.data;
        },
        retry: 'true',
    });

    if (isLoading) {
        return <Loading />;
    }

    const handleWishListDelete = async (id) => {
        try {
            const isConfirm = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Remove it!',
            });
            if (isConfirm.isConfirmed) {
                await axios.delete(`/wishlist/delete/${id}`);
                Swal.fire(
                    'Removed!',
                    'Successfully Removed from Wishlist.',
                    'success',
                );
                refetch();
            } else if (isConfirm.dismiss === Swal.DismissReason.cancel) {
                {
                    Swal.fire('Cancelled', 'Your Wishlist is safe :)', 'error');
                }
            }
        } catch (error) {
            Swal.fire('Cancelled', 'Your Wishlist is safe :)', 'error');
        }
    };
    console.log(data);
    return (
        <div>
            {data && Array.isArray(data) && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {data?.map((post) => (
                            <WishListCard
                                post={post}
                                key={post.id}
                                handleWishListDelete={handleWishListDelete}
                            />
                        ))}
                    </div>
                    {data.length === 0 && (
                        <div className="flex justify-center">
                            <h3>No Wishlist Post Available</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WishlistItems;
