
import Navbar from "../../Shared/Navbar";
import AskedQuestions from "./AskedQuestions/AskedQuestions";
import Banner from "./Banner/Banner";
import Coupons from "./Coupons/Coupons";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import TrendingProducts from "./TrendingProducts/TrendingProducts";



const Home = () => {

    return (
        <div>
            <div className="fixed w-full top-0 left-0 z-50 ">

            <Navbar color='lg:text-white' bgColor="bg-[#121212b3]" logoColor="text-white"></Navbar>
            </div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingProducts></TrendingProducts>
            <Coupons></Coupons>
            <AskedQuestions></AskedQuestions>
        </div>
    );
};

export default Home;