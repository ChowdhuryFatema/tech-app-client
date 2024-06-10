import PropTypes from 'prop-types';
import { BiSolidUpArrow } from "react-icons/bi";
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

const FeaturedCard = ({ feature, refetch }) => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const { _id, image, name, tags, upvotes, email } = feature;
    const axiosSecure = useAxiosSecure();

    const handleUpvotes = id => {
        console.log(id);

        if (user) {
            axiosSecure.patch(`/featured/${id}`)
                .then(data => {
                    console.log(data.data);
                    refetch();


                    const upvoteInfo = {
                        email: user?.email,
                        productId: _id,
                    }

                    axiosSecure.post(`/upvotes/${_id}`, upvoteInfo)
                    .then(data => {
                        if(data.data.insertedId == null){
                            Swal.fire({
                                text: "You can add just 1 vote per product!",
                                icon: "success"
                            });
                        }
                    });


                })
               

        }
        else {
            navigate('/login')
        }

    }

    return (
        <div className='shadow-lg duration-500' data-aos="fade-up"   data-aos-duration="500">
            <div className="card card-side flex-col lg:flex-row">
                <figure className='flex justify-center items-center'>
                    <img className='w-20 ml-5 rounded-2xl' src={image} alt="Movie" />
                </figure>
                <div className="card-body space-y-3">
                    <div className='flex gap-2 justify-between'>
                        <h2 className="card-title font-semibold">{name}</h2>
                        <button onClick={() => handleUpvotes(_id)} className="flex btn-sm lg:btn flex-col justify-center border border-[#0ae0b8] bg-transparent items-center rounded-md" disabled={user?.email == email}>
                            <BiSolidUpArrow className='text-[#0ae0b8] md:text-xl' />
                            <span className='-mt-1'>{upvotes}</span>
                        </button>
                    </div>
                    <ul className='flex gap-2 flex-wrap justify-center lg:justify-start'>
                        {
                            tags.map((tag, idx) => <li key={idx}
                                className='bg-[#a4ebde] text-[#175e51] p-1 text-sm px-2 rounded'
                            >{tag}</li>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

FeaturedCard.propTypes = {
    feature: PropTypes.object,
    refetch: PropTypes.func
}
export default FeaturedCard;