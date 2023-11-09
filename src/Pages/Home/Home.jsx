import Banner from './Banner';
import CategoriesList from './CategoriesList';
import Featured from './Featured';
import LatestBlogs from './LatestBlogs';
import NewsLatter from './NewsLatter';
import StayConnected from './StayConnected';

const Home = () => {

    return (
        <main>
            <Banner />
            <div className="container mx-auto">
                <div className="grid grid-cols-4 gap-6 md:grid-cols-6">
                    <div className="col-span-4 p-4 ">
                        <LatestBlogs />
                    </div>
                    <div className="col-span-2">
                        <Featured />
                        <CategoriesList />
                        <StayConnected/>
                    </div>
                </div>
                <div>
                    <NewsLatter />
                </div>
            </div>
        </main>
    );
};

export default Home;
