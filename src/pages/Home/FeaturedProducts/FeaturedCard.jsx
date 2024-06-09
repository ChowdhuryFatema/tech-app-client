import PropTypes from 'prop-types';
import { BiSolidUpArrow } from "react-icons/bi";
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

const FeaturedCard = ({ feature, refetch }) => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const { _id, image, name, tags, upvotes, email } = feature;
    const axiosPublic = useAxiosPublic()

    const handleUpvotes = id => {
        console.log(id);

        if (user) {
            axiosPublic.patch(`/featured/${id}`, { upVote: user?.email })
                .then(data => {
                    console.log(data);
                    refetch();
                })
        }
        else {
            navigate('/login')
        }



    }

    return (
        <div className='shadow-lg duration-500'>
            <div className="card card-side">
                <figure className='flex justify-center items-center'>
                    <img className='w-20 ml-5 rounded-2xl' src={image} alt="Movie" />
                </figure>
                <div className="card-body">
                    <div className='flex gap-5 justify-between'>
                        <h2 className="card-title font-semibold">{name}</h2>
                        <button onClick={() => handleUpvotes(_id)} className="flex btn flex-col justify-center border border-[#0ae0b8] bg-transparent items-center" disabled={user?.email == email}>
                            <BiSolidUpArrow size={20} className='text-[#0ae0b8]' />
                            <span className='-mt-1'>{upvotes}</span>
                        </button>
                    </div>
                    <ul className='flex gap-2 flex-wrap'>
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