import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import AdminPieChart from "./AdminPieChart/AdminPieChart";
import useProducts from "../../../../Hooks/useProducts";
import { MdOutlinePreview } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiAlignItemBottomLine } from "react-icons/ri";


const Statistics = () => {

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { products } = useProducts();

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/productReview')
            return res.data;
        }
    })

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })


    return (
        <div className="w-full p-5 flex flex-col justify-center">
            <div className="stats shadow">

                <div className="stat py-10 place-items-center bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] *:text-white">

                    <div className="stat-title">Total Products</div>
                    <div className="stat-value">{products.length}</div>
                    <div className="stat-desc">From January 1st to February 1st</div>
                    <div className="stat-figure text-secondary">
                        <RiAlignItemBottomLine className="text-5xl" />
                    </div>
                </div>

                <div className="stat py-10 place-items-center bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] *:text-white">
                    <div className="stat-figure text-secondary">
                        <MdOutlinePreview className="text-5xl" />
                    </div>
                    <div className="stat-title">Total Reviews</div>
                    <div className="stat-value">{reviews.length}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

                <div className="stat py-10 place-items-center bg-gradient-to-r from-[#FE4880] to-[#FECDE9] *:text-white">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-5xl" />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value text-secondary">{users.length}</div>
                    <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                </div>

            </div>


            <div className="flex flex-col justify-center items-center">
                <AdminPieChart
                    products={products}
                    reviews={reviews}
                    users={users}></AdminPieChart>
            </div>
        </div>
    );
};

export default Statistics;