import { BiSolidUpArrow } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";
import PropTypes from 'prop-types';
// import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const ProductCard = ({ product, refetch }) => {
    const { _id, name, image, upvotes, tags, email } = product;
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic();
    const upVoteInfo = {
        productId: _id,
        email: user?.email,
    }

    const handleUpvotes = id => {
        axiosSecure.put(`/allProducts/${id}`)
            .then(data => {
                console.log(data);



                axiosPublic.post('/upVote', upVoteInfo)
                .then(data => {
                    console.log(data);
                })

                // if (data.data.modifiedCount !== 1) {
                //     Swal.fire("Upvote Already Added");
                // }
                refetch();
            })

       

            
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-3xl" />
            </figure>
            <div className="card-body items-center text-center space-y-3">
                <h2 className="card-title">{name}</h2>
                <ul className='flex gap-2 flex-wrap'>
                    {
                        tags.map((tag, idx) => <li key={idx}
                            className='bg-[#a4ebde] text-[#175e51] p-1 text-sm px-2 rounded'
                        >{tag}</li>)
                    }
                </ul>

                <div className="card-actions">
                    <button onClick={() => handleUpvotes(_id)} className="flex btn flex-col justify-center border border-[#0ae0b8] bg-transparent items-center" disabled={user?.email == email}>
                        <BiSolidUpArrow size={20} className='text-[#0ae0b8]' />
                        <span className='-mt-1'>{upvotes}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object,
    refetch: PropTypes.func
}
export default ProductCard;