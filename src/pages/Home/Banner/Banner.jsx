
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerBtn from "../../../components/BannerBtn";
import { Carousel } from 'react-responsive-carousel';

// import img2 from '../../../assets/animate-1.gif';
// import img3 from '../../../assets/banner-1.jpg';
// import img4 from '../../../assets/banner.jpg';
// import img5 from '../../../assets/banner.png';

import img1 from '../../../assets/animate.gif';
import img2 from '../../../assets/app1.jpg';
import img3 from '../../../assets/app2.jpg';
import img4 from '../../../assets/app3.jpg';
import img5 from '../../../assets/app4.jpg';



const Banner = () => {
    return (
        <div>
            <Carousel>
                <div className="relative">
                    <img src={img1} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10 w-full md:w-3/4 lg:w-1/2">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                                Tech Web <span className="text-[#0ae0b8]">Apps</span>
                            </h2>
                            <p className="text-white opacity-80">
                                TechConnect is a dynamic web app that connects tech enthusiasts and professionals through forums, tutorials, and collaborative opportunities.
                            </p>
                            <div className="pt-4">
                                <BannerBtn label="Explore"></BannerBtn>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={img2} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10 w-full md:w-3/4 lg:w-1/2">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                                Tech Web <span className="text-[#0ae0b8]">Apps</span>
                            </h2>
                            <p className="text-white opacity-80">
                                TechConnect is a dynamic web app that connects tech enthusiasts and professionals through forums, tutorials, and collaborative opportunities.
                            </p>
                            <div className="pt-4">
                                <BannerBtn label="Explore"></BannerBtn>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={img3} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10 w-full md:w-3/4 lg:w-1/2">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                                Tech Web <span className="text-[#0ae0b8]">Apps</span>
                            </h2>
                            <p className="text-white opacity-80">
                                TechConnect is a dynamic web app that connects tech enthusiasts and professionals through forums, tutorials, and collaborative opportunities.
                            </p>
                            <div className="pt-4">
                                <BannerBtn label="Explore"></BannerBtn>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={img4} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10 w-full md:w-3/4 lg:w-1/2">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                                Tech Web <span className="text-[#0ae0b8]">Apps</span>
                            </h2>
                            <p className="text-white opacity-80">
                                TechConnect is a dynamic web app that connects tech enthusiasts and professionals through forums, tutorials, and collaborative opportunities.
                            </p>
                            <div className="pt-4">
                                <BannerBtn label="Explore"></BannerBtn>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={img5} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10 w-full md:w-3/4 lg:w-1/2">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                                Tech Web <span className="text-[#0ae0b8]">Apps</span>
                            </h2>
                            <p className="text-white opacity-80">
                                TechConnect is a dynamic web app that connects tech enthusiasts and professionals through forums, tutorials, and collaborative opportunities.
                            </p>
                            <div className="pt-4">
                                <BannerBtn label="Explore"></BannerBtn>
                            </div>
                        </div>
                    </div>
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;