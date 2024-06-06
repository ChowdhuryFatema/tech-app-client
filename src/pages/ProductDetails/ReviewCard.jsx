import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Swiper } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import Rating from "react-rating";
import { SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


const ReviewCard = () => {
    const axiosPublic = useAxiosPublic();

    const colors = ['#1a75ffb0', '#f3f', '#ffa500', '#ea97be']

    const color = [];

    for (let i = 0; i < colors.length; i++) {
        color.push('#1a75ffb0', '#f3f', '#ffa500', '#ea97be');
    }

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/productReview')
            return res.data;
        }
    })

    return (
        <div className="review">
            <div className="bg-black bg-opacity-60 py-20">
                <div>
                    <h2 className="text-white text-5xl font-semibold text-center">Review</h2>
                </div>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'1'}
                    coverflowEffect={{
                        rotate: 35,
                        stretch: 100,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 0,
                        },
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >

                    {
                        reviews.map((review, idx) => <SwiperSlide key={idx}>

                            <div className="card w-96 bg-base-100 shadow-xl rounded-xl my-16">
                                <div className={`w-full bg-[${color[idx]}] rounded-t-xl`}>
                                    <figure className="-mb-14 pt-10">
                                        <img src={review.reviewerImage} className="rounded-full w-32 h-32 object-cover" />
                                    </figure>
                                </div>
                                <div className="card-body items-center text-center mt-10">
                                    <h2 className="card-title">{review.reviewerName}</h2>
                                    <p className="text-[#8a8484] text-sm">{review.description}</p>
                                    <div className="card-actions">
                                        <span>
                                            <Rating
                                                initialRating={review.rating}
                                                readonly
                                                emptySymbol={<IoIosStarOutline size={24} className="text-[#C9CAC9]" />}
                                                fullSymbol={<IoIosStar size={24} className="text-[#F2E650]" />}
                                            /></span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default ReviewCard;