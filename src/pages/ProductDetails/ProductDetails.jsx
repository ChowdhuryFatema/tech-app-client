import { useNavigate, useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import Navbar from "../../Shared/Navbar";
import detailsImg from '../../assets/app1.jpg';
import useAuth from "../../Hooks/useAuth";
import { BiSolidUpArrow } from "react-icons/bi";
import { MdReportProblem } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import BannerBtn from "../../components/BannerBtn";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const ProductDetails = () => {
    const { id } = useParams();
    const { products } = useProducts();
    const { user } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const product = products.find(pro => pro._id === id) || {};
    const { _id, image, name, description, tags = [], email, upvotes } = product;


    const { data: reviews = [], refetch} = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/productReview')
            return res.data;
        }
    })

    const handleReport = id => {
        console.log(id);

        axiosSecure.post('/reportedProduct', product)
            .then(data => {
                console.log(data.data);
                Swal.fire("Successfully Added to Report");
               
            })

    }

    const handleUpvotes = id => {

        if (user) {
            axiosPublic.patch(`/productDetails/${id}`)
                .then(data => {
                    console.log(data);
                    // refetch()

                })
        } else {
            navigate('/login');
        }


    }

    return (
        <div>
            <div className="min-h-[80px]">
                <Navbar bgColor="bg-white"></Navbar>
            </div>
            <div>
                <img className="h-40 md:h-60 lg:h-80 w-full object-cover -mt-5" src={detailsImg} alt="" />
            </div>
            <div className="max-w-7xl mx-auto px-5">

                <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 my-10">
                    <div className="col-auto lg:col-span-5">
                        <div className="grid grid-cols-1 lg:grid-cols-7  gap-y-5 lg:gap-y-0 lg:gap-5 ">
                            <div className="col-span-3">
                                <img className="w-full object-cover" src={image} />
                            </div>
                            <div className="space-y-4 col-span-4">
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
                                <p>{description}</p>
                                <button onClick={() => handleReport(_id)} className="btn">
                                    <MdReportProblem size={24} className="text-red-500" />
                                    <span>Report</span>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="col-auto lg:col-span-2">
                        <section className="dark:text-gray-800">
                            <form noValidate="" className="container w-full px-5 py-8 mx-auto bg-gray-100 space-y-2 rounded-md shadow dark:bg-gray-50">
                                <h2 className="w-full text-3xl font-bold leading-tight">Contact us</h2>
                                <div>
                                    <label htmlFor="name" className="block mb-1 ml-1">Name</label>
                                    <input id="name" type="text" placeholder="Your name" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-1 ml-1">Email</label>
                                    <input id="email" type="email" placeholder="Your email" required="" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block mb-1 ml-1">Message</label>
                                    <textarea id="message" type="text" placeholder="Message..." className="block w-full p-2 rounded auto expand focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100" rows={3}></textarea>
                                </div>
                                <div className="pt-5">
                                    <BannerBtn label="Send"></BannerBtn>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>


            </div>
            <ReviewCard reviews={reviews}></ReviewCard>
            <ReviewForm refetch={refetch}></ReviewForm>
        </div>
    );
};

export default ProductDetails;