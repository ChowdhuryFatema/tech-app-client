import { Swiper } from 'swiper/react';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import PropTypes from 'prop-types';
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import Rating from "react-rating";
import { SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


const ReviewCard = ({reviews}) => {

    const colors = ['#1a75ffb0', '#f3f', '#ffa500', '#ea97be'];

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
                        reviews.map((review, idx) => {
                            const bgColor = colors[idx % colors.length];
                            return (
                                <SwiperSlide key={idx}>
                                    <div className="card w-96 bg-base-100 shadow-xl rounded-2xl my-16">
                                        <div className="w-full py-5" style={{ backgroundColor: bgColor, borderRadius: '1rem 1rem 0 0' }}>
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
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
};

ReviewCard.propTypes = {
    reviews: PropTypes.array.isRequired,
};

export default ReviewCard;
