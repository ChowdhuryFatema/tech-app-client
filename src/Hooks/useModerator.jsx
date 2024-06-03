import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useModerator = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();

    const {data: isModerator = [], isModeratorLoading} = useQuery({
        queryKey: ['isModerator', user?.email],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/moderator/${user.email}`)
            return res.data.moderator;
        }
    })

    return [isModerator, isModeratorLoading]
};

export default useModerator;