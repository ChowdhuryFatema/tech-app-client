import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";


const Statistics = () => {

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/productReview')
            return res.data;
        }
    })
    return (
        <div>
            {reviews.length}
            {users.length}
        </div>
    );
};

export default Statistics;