import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


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

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/reportedProduct/${id}`)
                    .then(data => {
                        console.log(data.data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Reported Product has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    })

            }
        });
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
                                    <button className="btn btn-sm bg-green-100 text-green-600">
                                        <Link to={`/productDetails/${reportedProduct._id}`}>View Details</Link>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteReport(reportedProduct._id)} >
                                        <MdDeleteForever size={32} className="text-red-500" />
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