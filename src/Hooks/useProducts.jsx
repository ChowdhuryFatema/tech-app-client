import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useProducts = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();
    const {data:products=[], refetch} = useQuery({
        queryKey: ['products', user?.email],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure.get('/products');
            return res.data;
        }
    })

    return {products, refetch}
};

export default useProducts;