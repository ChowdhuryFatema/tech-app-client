import { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import Payment from "../MyProducts/Payment/Payment";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner";


const MyProfile = () => {

    const { user } = useAuth();
    // const [coupon, setCoupon] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0)
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

   const {data: payments=[], refetch, isLoading} = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/payments/${user?.email}`)
        return res.data;
        
    }
   })

    const { data: coupons = [] } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupon')
            return res.data;
        }
    })

   

    const handleCoupon = e => {
        e.preventDefault();
        const couponField = e.target.coupon.value;
        const coupon = couponField.toUpperCase().trim();
        // setCoupon(coupon)
        e.target.reset();

        const totalPrice = 1000;

        const isExists = coupons.find(c => c.couponCode == coupon)


        if (isExists) {
            const discountAmount = (totalPrice * isExists.discountAmount) / 100;
            const price = totalPrice - discountAmount;
            setTotalAmount(price);
        }
        else {
            const price = 1000;
            setTotalAmount(price);
        }
    }

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center space-y-4 shadow-2xl px-5">
                <div className="profile-bg flex justify-center items-center py-16 px-20">
                    <img className="rounded-full w-40 h-40 -mb-32 border-2 border-[#0ae0b8]" src={user?.photoURL} />
                </div>
                <div className="md:px-10 md:py-10 py-8">
                    <h2 className="mt-10 lg:text-lg text-sm"><span className="font-bold">Name:</span> {user?.displayName}</h2>
                    <p className="lg:text-lg text-sm"><span className="font-bold">Email:</span> {user?.email}</p>
                    
                    {/* modal  */}
                    <button disabled={payments.length > 0} className="mt-8" onClick={() => document.getElementById('my_modal_5').showModal()}>


                        <a className="relative cursor-pointer px-5 py-2 font-medium text-black group md:text-lg">
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-[#085f4f] group-hover:bg-[#0ae0b8] group-hover:skew-x-12"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-[#0ae0b8] group-hover:bg-[#0e977e] group-hover:-skew-x-12"></span>
                            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-[#0ae0b8] -rotate-12"></span>
                            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-[#0ae0b8] -rotate-12"></span>
                            <span className="relative text-white text-sm">
                                {payments.length > 0 ? 'Already Subscribed': 'Membership Subscription $1000'}
                                
                            </span>
                        </a>
                    </button>


                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg my-5">Please Provide Coupon Code</h3>


                            <form onSubmit={handleCoupon}>
                                <div className="relative">
                                    <input type="text" name="coupon" className="w-full p-3 border rounded-md outline-0" placeholder="Coupon Code" />
                                    <div onClick={() =>
                                        document.getElementById('my_modal_5').close()} >
                                        <button onClick={() =>
                                            document.getElementById('my_modal_1').showModal()} type="submit" className="btn absolute right-0 top-[1px] bg-[#0ae0b8] text-white">
                                            Submit Coupon
                                        </button>
                                    </div>
                                </div>

                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                  
                                </form>
                            </div>
                        </div>
                    </dialog>

                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box pt-10">
                            <Payment totalAmount={totalAmount} refetch={refetch}></Payment>
                            <div className="modal-action">

                            </div>
                        </div>
                    </dialog>



                </div>
            </div>
        </div>
    );
};

export default MyProfile;