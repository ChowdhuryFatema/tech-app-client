
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Coupons = () => {

    const axiosPublic = useAxiosPublic();


    const { data: coupon = [] } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupon')
            return res.data;
        }
    })


    return (
        <div className='max-w-7xl mx-auto px-5'>
            <div className='coupon-bg'>
                <div className='bg-black bg-opacity-70 p-5 md:p-10 lg:p-20'>
                    <div className='grid grid-cols-1 md:grid-cols-2'>
                        <div>
                            <div className='flex items-center justify-center h-full w-full'>
                                <h2 className='uppercase text-5xl md:text-6xl lg:text-8xl font-bold text-center py-10'>
                                    <span className='text text-white'>discount</span> <br />
                                    <span className='text-yellow-500'>offer</span>
                                </h2>
                            </div>
                        </div>
                        <div>
                            <Swiper
                                effect={'flip'}
                                grabCursor={true}
                                pagination={true}
                                navigation={true}
                                modules={[EffectFlip, Pagination, Navigation]}
                                className="mySwiper"
                            >


                                {
                                    coupon.map(c => <SwiperSlide key={c._id}>
                                        <div className="card bg-base-100 shadow-xl md:py-10 md:px-5">
                                            <div className="card-body items-center text-center">
                                                <p className='text-5xl mg:text-6xl lg:text-7xl font-bold text-red-500'>{c.discountAmount}%</p>
                                            <h2 className="card-title text-2xl smd:text-3xl lg:text-4xl font-semibold ">Code:
                                                <span className="text-yellow-500">

                                                 {c.couponCode}
                                                </span>
                                            </h2>
                                                <p>{c.description}</p>
                                                <p className='font-bold'>{c.expiryDate}</p>
                                               
                                            </div>
                                        </div>
                                    </SwiperSlide>)
                                }

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coupons;