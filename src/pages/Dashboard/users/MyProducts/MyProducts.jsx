import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";


const MyProducts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: myProducts = [] } = useQuery({
        queryKey: ['myProduct'],
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
                            <th>Up votes</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts.map((myProduct, idx) => <tr key={myProduct._id}>
                                <th>{idx + 1}</th>
                                <td>{myProduct.name}</td>
                                <td>{myProduct.upvotes}</td>
                                <td>{myProduct.status}</td>
                                <td>
                                    <button>
                                        <Link to={`/dashboard/update/${myProduct._id}`}> 
                                            <FaRegEdit size={24} />
                                        </Link>
                                    </button>
                                </td>
                                <td><MdOutlineDeleteForever size={28} className="text-red-500" /></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;