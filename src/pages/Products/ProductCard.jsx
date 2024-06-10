import { BiSolidUpArrow } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ProductCard = ({ product, refetch }) => {
    const { _id, name, image, upvotes, tags, email } = product;
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();



    const handleUpvotes = id => {


        if (user) {
            axiosSecure.patch(`/allProducts/${id}`)
                .then(data => {
                    console.log(data);
                    refetch()

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

        } else {
            navigate('/login');
        }


    }

    return (
        <div className="card bg-base-100 shadow-xl">
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
                    <button onClick={() => handleUpvotes(_id)} className="flex btn justify-center border border-[#0ae0b8] bg-transparent items-center" disabled={user?.email == email}>
                        <BiSolidUpArrow size={20} className='text-[#0ae0b8]' />
                        <span>{upvotes}</span>
                    </button>
                    <button className="btn bg-green-100 text-green-600">
                        <Link to={`/productDetails/${_id}`}>View Details</Link>
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