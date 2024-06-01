
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
            <Carousel autoPlay={true}>
                <div className="relative">
                    <img src={img1} className="object-center" />
                    <div className="absolute top-1/4 left-2/4 -translate-x-[50%] bg-black bg-opacity-70 p-10">
                        <h2 className="text-5xl text-white font-bold">Tach Web Apps</h2>
                    </div>
                </div>
                <div>
                    <img src={img2} className="object-center" />
                </div>
                <div>
                    <img src={img3} className="object-center" />
                </div>
                <div>
                    <img src={img4} className="object-center" />
                </div>
                <div>
                    <img src={img5} className="object-center" />
                </div>

            </Carousel>
        </div>
    );
};

export default Banner;