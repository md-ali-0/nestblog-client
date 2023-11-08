import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

const StayConnected = () => {
    return (
        <div>
            <h3 className="text-4xl font-bold pb-3">Stay Connected</h3>
            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-5 my-5'>
                <div className='grid grid-cols-2 gap-5'>
                <div className='flex items-center bg-blue-600 px-3 py-2 rounded gap-2'>
                    <FiFacebook className='text-white' size={25} fill='#0866FF'></FiFacebook>
                    <h3 className='text-md text-white font-semibold'>Facebook</h3>
                </div>
                <div className='flex items-center bg-pink-600 px-3 py-2 rounded gap-2'>
                    <FiInstagram className='text-white' size={25} fill='#EB4A50'></FiInstagram>
                    <h3 className='text-md text-white font-semibold'>Instagram</h3>
                </div>
                <div className='flex items-center bg-blue-700 px-3 py-2 rounded gap-2'>
                    <FiLinkedin className='text-white' size={25} fill='#0077B5'></FiLinkedin>
                    <h3 className='text-md text-white font-semibold'>Linkedin</h3>
                </div>
                <div className='flex items-center bg-blue-500 px-3 py-2 rounded gap-2'>
                    <FiTwitter className='text-white' size={25} fill='#1DA1F2'></FiTwitter>
                    <h3 className='text-md text-white font-semibold'>Twitter</h3>
                </div>
                </div>
            </div>
        </div>
    );
};

export default StayConnected;
