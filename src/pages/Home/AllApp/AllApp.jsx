import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllApp = () => {
    const axiosPublic = useAxiosPublic();

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allProduct`)
            return res.data;
        }
    })
    return (
        <div className="my-10 lg:my-20">
            <Marquee>
            {
                products.map(product => <div key={product._id}>
                    <div>
                        <img className="rounded-3xl mx-5" src={product.image} alt="" />
                        <h2 className="text-center font-bold my-3">{product.name}</h2>
                    </div>
                  </div>)
            }
            </Marquee>
        </div>
    );
};

export default AllApp;