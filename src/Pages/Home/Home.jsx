import Banner from './Banner';
import Featured from './Featured';
import LatestBlogs from './LatestBlogs';

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
                        <Featured/>
                        
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
