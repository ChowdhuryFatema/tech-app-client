import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";


const MyProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: myProducts } = useQuery({
        queryKey: ['myProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/product/${user?.email}`)
            return res.data

        }
    })

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        myProducts.map(myProduct => <tr key={myProduct._id}>
                            <th>1</th>
                            <td>{myProduct.name}</td>
                            <td>{myProduct}</td>
                            <td>Blue</td>
                        </tr>)
                       }
                       
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;