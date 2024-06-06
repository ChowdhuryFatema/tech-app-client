import Navbar from "../../Shared/Navbar";
import Banner from "./Banner/Banner";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import TrendingProducts from "./TrendingProducts/TrendingProducts";



const Home = () => {
    return (
        <div>
            <Navbar color='text-white' bgColor="bg-[#121212b3]"></Navbar>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
        </div>
    );
};

export default Home;