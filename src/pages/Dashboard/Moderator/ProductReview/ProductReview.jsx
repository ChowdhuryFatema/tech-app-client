import useProducts from "../../../../Hooks/useProducts";
import { FcAcceptDatabase } from "react-icons/fc";
import { MdBlockFlipped } from "react-icons/md";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const ProductReview = () => {

    const { products } = useProducts();
    const axiosPublic = useAxiosPublic();


    const handleAcceptProducts = id => {

        axiosPublic.get(`/products/${id}`)
            .then(data => {
                axiosPublic.post('/allProducts', data.data)
                    .then(data => {
                        console.log(data.data);
                        if (data.data.insertedId) {
                            Swal.fire({
                                icon: "success",
                                title: "Successfully Added",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            })
    }


    const handleMakeFeatured = id => {
        axiosPublic.get(`/products/${id}`)
            .then(data => {
                axiosPublic.post('/featured', data.data)
                    .then(data => {
                        console.log(data.data);
                        if (data.data.insertedId) {
                            Swal.fire({
                                icon: "success",
                                title: "Successfully Added",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            })
    }

    return (
        <div className="px-5">
            {products.length}

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map(product => <tr key={product._id}>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {product.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-sm bg-red-100 text-red-600">
                                        View Details
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleMakeFeatured(product._id)} className="btn btn-sm bg-red-100 text-red-600">
                                        Make Featured
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleAcceptProducts(product._id)} className="btn">
                                        <FcAcceptDatabase size={20} />
                                    </button>
                                </td>
                                <td>
                                    <button className="btn">
                                        <MdBlockFlipped size={20} />
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

export default ProductReview;