import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import FeaturedCard from "./FeaturedCard";

const FeaturedProducts = () => {
    const axiosPublic = useAxiosPublic();

    const { data: features = [], refetch } = useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const res = await axiosPublic.get('/featured')
            return res.data
        }
    })

    return (
        <div>
            <div className="max-w-7xl mx-auto px-5 my-20 ">
                <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold my-10">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {
                        features.map(feature => <FeaturedCard
                            key={feature._id}
                            feature={feature}
                            refetch={refetch}
                        ></FeaturedCard>)

                    }
                </div>
            </div>
        </div>
    );
};

export default FeaturedProducts;