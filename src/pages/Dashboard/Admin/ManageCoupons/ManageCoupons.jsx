import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import BannerBtn from "../../../../components/BannerBtn";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const ManageCoupons = () => {
    const axiosPublic = useAxiosPublic();


    const { data: coupon = [], refetch } = useQuery({
        queryKey: ['coupon'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupon')
            return res.data;
        }
    })

    const handleCoupon = e => {
        e.preventDefault();
        const form = e.target;
        const couponCodeValue = form.couponCode.value;
        const couponCode = couponCodeValue.toUpperCase().trim();
        const expiryDate = form.date.value;
        const discountAmount = form.discountAmount.value;
        const description = form.description.value;


        const newCoupon = {
            couponCode,
            expiryDate,
            discountAmount,
            description,

        }
        console.log(newCoupon)

        axiosPublic.post('/coupon', newCoupon)
            .then(data => {
                console.log(data.data);

                if (data.data.insertedId) {
                    Swal.fire({
                        text: "Added Successfully!",
                        icon: "success"
                    });
                    form.reset()
                }
                refetch();
            })
    }


    const handleDeleteCoupon = id => {


        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/coupon/${id}`)
                .then(data => {
                    console.log(data.data);
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Coupon has been deleted.",
                        icon: "success"
                      });
                    refetch()
                })
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary coupon is safe :)",
                icon: "error"
              });
            }
          });


    }


    return (
        <div className="p-10">

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Coupon Code</th>
                            <th>Discount Amount</th>
                            <th>Expiry Date</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            coupon.map((singleCoupon, idx) => <tr key={singleCoupon._id}>
                                <th>{idx + 1}</th>
                                <td>{singleCoupon.couponCode}</td>
                                <td>{singleCoupon.discountAmount}</td>
                                <td>{singleCoupon.expiryDate}</td>
                                <td>{singleCoupon.description}</td>
                                <td>
                                    <button>
                                        <Link to={`/dashboard/updateCoupon/${singleCoupon._id}`}>
                                            <FaRegEdit className="text-[#0ae0b8]" size={24} />
                                        </Link>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteCoupon(singleCoupon._id)}>
                                        <MdOutlineDeleteForever size={28} className="text-red-500" />
                                    </button>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


            <div>
                <div className="my-10">
                    <h2 className="text-red text-3xl md:text-5xl text-red font-semibold text-center">Add Coupon</h2>
                </div>
                <form onSubmit={handleCoupon} className="space-y-2 md:space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <div className="space-y-2">
                                <p className="text-lg">Coupon Code</p>
                                <input type="text" name="couponCode" placeholder="Coupon Code" className="border py-3 px-2 outline-none w-full rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg">Expiry Date</p>
                                <input type="date" name="date" className="border py-3 px-2 outline-none w-full rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg">Discount Amount</p>
                                <input type="number" name="discountAmount" placeholder="Discount Amount" className="border py-3 px-2 outline-none w-full rounded-md" />
                            </div>
                        </div>
                        <div>
                            <div className="space-y-2">
                                <p className="text-lg">Coupon code description ---</p>
                                <textarea name="description" placeholder="Coupon code description" rows={8} className="border py-3 px-2 outline-none w-full rounded-md" ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="pt-5">
                        <button type="submit">
                            <BannerBtn label="Add Coupon"></BannerBtn>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageCoupons;