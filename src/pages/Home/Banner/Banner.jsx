
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/animate.gif';
import img2 from '../../../assets/animate-1.gif';
import img3 from '../../../assets/banner-1.jpg';
import img4 from '../../../assets/banner.jpg';
import img5 from '../../../assets/banner.png';


const Banner = () => {
    return (
        <div>
            <Carousel>
                <div className="relative">
                    <img src={img1} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-65 px-10 py-14 w-full md:w-3/4 lg:w-1/2">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                                Tach Web <span className="text-[#0ae0b8]">Apps</span>
                            </h2>
                            <p className="text-white opacity-80">
                                TechConnect is a dynamic web app that connects tech enthusiasts and professionals through forums, tutorials, and collaborative opportunities.
                            </p>
                            <div className="pt-4">
                                <a href="#_" className="relative px-5 py-2 font-medium text-black group">
                                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-[#085f4f] group-hover:bg-[#0ae0b8] group-hover:skew-x-12"></span>
                                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-[#0ae0b8] group-hover:bg-[#0e977e] group-hover:-skew-x-12"></span>
                                    <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-[#0ae0b8] -rotate-12"></span>
                                    <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-[#0ae0b8] -rotate-12"></span>
                                    <span className="relative group-hover:text-white">Button Text</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={img2} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                            Tach Web <span className="text-[#0ae0b8]">Apps</span>
                        </h2>
                    </div>
                </div>
                <div className="relative">
                    <img src={img3} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10">
                        <h2 className="text-5xl text-white font-bold">
                            Tach Web <span className="text-[#0ae0b8]">Apps</span>
                        </h2>
                    </div>
                </div>
                <div className="relative">
                    <img src={img4} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10">
                        <h2 className="text-5xl text-white font-bold">
                            Tach Web <span className="text-[#0ae0b8]">Apps</span>
                        </h2>

                    </div>
                </div>
                <div className="relative">
                    <img src={img5} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10">
                        <h2 className="text-5xl text-white font-bold">
                            Tach Web <span className="text-[#0ae0b8]">Apps</span>
                        </h2>
                    </div>
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;