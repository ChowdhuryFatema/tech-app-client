import { useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import Navbar from "../../Shared/Navbar";
import detailsImg from '../../assets/app1.jpg';
import useAuth from "../../Hooks/useAuth";
import { BiSolidUpArrow } from "react-icons/bi";
import { MdReportProblem } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const ProductDetails = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const product = products.find(pro => pro._id === id) || {};
    const { _id, image, name, description, tags = [], email, upvotes } = product;

    const handleReport = id => {
        console.log(id);

        axiosSecure.post('/reportedProduct', product)
        .then(data => {
            console.log(data);
        })
        
    }

    return (
        <div>
            <div className="min-h-[100px]">
                <Navbar bgColor="bg-white"></Navbar>
            </div>
            <div className="max-w-7xl mx-auto px-5">
                <div>
                    <img className="h-80 w-full object-cover" src={detailsImg} alt="" />
                </div>

                <div className="grid grid-cols-4 gap-5">
                    <div className="grid grid-cols-5 gap-5 my-10 col-span-3">
                        <div className="col-span-2">
                            <img className="w-full" src={image} />
                        </div>
                        <div className="space-y-4 col-span-3">
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
                            <p>{description}</p>
                            <button onClick={() => handleReport(_id)} className="btn">
                                <MdReportProblem size={24} className="text-red-500" />
                                <span>Report</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;