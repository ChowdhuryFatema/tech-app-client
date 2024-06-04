import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";


const ReportedProducts = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const { data: reportedProducts = [], refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reportedProduct')
            return res.data;
        }
    })

    const handleDeleteReport = id => {
        axiosPublic.delete(`/reportedProduct/${id}`)
        .then(data => {
            console.log(data.data);
            refetch()
        })
    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedProducts.map((reportedProduct, idx) => <tr 
                            key={reportedProduct._id}>
                                <th>{idx + 1}</th>
                                <td>{reportedProduct.name}</td>
                                <td>
                                    <button className="btn btn-sm bg-red-100 text-red-600">
                                       <Link to={`/productDetails/${reportedProduct._id}`}>View Details</Link>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteReport(reportedProduct._id)} >
                                        <MdDeleteForever size={24} className="text-red-500" />
                                    </button>
                                    
                                </td>
                            </tr>)
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportedProducts;