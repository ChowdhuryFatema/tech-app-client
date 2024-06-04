import PropTypes from 'prop-types';
import { BiSolidUpArrow } from "react-icons/bi";
import useAuth from '../../../Hooks/useAuth';

const FeaturedCard = ({ feature }) => {
    const { user } = useAuth()
    const { image, name, tags, upvotes, email } = feature;
    console.log('user', user?.email);
    console.log('product', email);

    return (
        <div className='shadow-lg duration-500'>
            <div className="card card-side">
                <figure className='flex justify-center items-center'>
                    <img className='w-20 ml-5 rounded-2xl' src={image} alt="Movie" />
                </figure>
                <div className="card-body">
                    <div className='flex gap-5 justify-between'>
                        <h2 className="card-title font-semibold">{name}</h2>
                        <button className="flex btn flex-col justify-center border border-[#0ae0b8] bg-transparent items-center" disabled={user?.email == email}>
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
}
export default FeaturedCard;