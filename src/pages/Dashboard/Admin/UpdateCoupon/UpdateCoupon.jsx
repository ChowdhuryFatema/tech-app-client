import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import BannerBtn from "../../../../components/BannerBtn";


const UpdateCoupon = () => {

    const axiosPublic = useAxiosPublic();
    const coupons = useLoaderData() || {};
    const {_id, couponCode, expiryDate, discountAmount, description} = coupons;

    const handleUpdateCoupon = e => {
        e.preventDefault();
        const form = e.target;
        const couponCodeValue = form.couponCode.value;
        const couponCode = couponCodeValue.toUpperCase().trim();
        const expiryDate = form.date.value;
        const discountAmount = form.discountAmount.value;
        const description = form.description.value;


        const updatedCoupon = {
            couponCode,
            expiryDate,
            discountAmount,
            description,

        }

        axiosPublic.put(`/coupon/${_id}`, updatedCoupon)
            .then(data => {
                console.log(data.data);

                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        text: "Updated Successfully!",
                        icon: "success"
                    });
                    form.reset()
                }
            })
    }


    return (
        <div className="p-10">
            <div className="my-10">
                <h2 className="text-red text-3xl md:text-5xl text-red font-semibold text-center">Update Coupon</h2>
            </div>
            <form onSubmit={handleUpdateCoupon} className="space-y-2 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <div className="space-y-2">
                            <p className="text-lg">Coupon Code</p>
                            <input type="text" defaultValue={couponCode} name="couponCode" placeholder="Coupon Code" className="border py-3 px-2 outline-none w-full rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-lg">Expiry Date</p>
                            <input type="date" defaultValue={expiryDate} name="date" className="border py-3 px-2 outline-none w-full rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-lg">Discount Amount</p>
                            <input type="number" defaultValue={discountAmount} name="discountAmount" placeholder="Discount Amount" className="border py-3 px-2 outline-none w-full rounded-md" />
                        </div>
                    </div>
                    <div>
                        <div className="space-y-2">
                            <p className="text-lg">Coupon code description ---</p>
                            <textarea name="description" defaultValue={description} placeholder="Coupon code description" rows={8} className="border py-3 px-2 outline-none w-full rounded-md" ></textarea>
                        </div>
                    </div>
                </div>
                <div className="pt-5">
                    <button type="submit">
                        <BannerBtn label="Update Coupon"></BannerBtn>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCoupon;