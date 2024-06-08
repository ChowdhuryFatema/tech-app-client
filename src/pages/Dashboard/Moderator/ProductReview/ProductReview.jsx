import useProducts from "../../../../Hooks/useProducts";
import { MdBlockFlipped } from "react-icons/md";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const ProductReview = () => {

    const [sortedProducts, setSortedProducts] = useState([]);
    const { products, refetch } = useProducts();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const sort = products.sort((a, b) => {
            if (a.status === 'Pending' && b.status !== 'Pending') {
              return -1;
            } else if (a.status !== 'Pending' && b.status === 'Pending') {
              return 1;
            } else if (a.status === 'Accepted' && b.status !== 'Accepted') {
              return -1;
            } else if (a.status !== 'Accepted' && b.status === 'Accepted') {
              return 1;
            } 
            else if (a.status === 'Rejected' && b.status !== 'Rejected') {
              return -1;
            } else if (a.status !== 'Rejected' && b.status === 'Rejected') {
              return 1;
            } 
            else {
              return 0;
            }
          });
        setSortedProducts(sort)
    }, [products])


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



    const handleAcceptProduct = (id, status) => {

        axiosPublic.put(`/products/${id}`, { status })
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    axiosPublic.get(`/products/${id}`)
                        .then(data => {
                            axiosPublic.post('/allProducts', data.data)
                                .then(data => {
                                    console.log(data.data);
                                    if (data.data.insertedId) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Product Accepted",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                    }
                                })

                        })
                        refetch();
                }
            })

    }


    
    const handleRejectedProduct = (id, status) => {


        axiosPublic.put(`/products/${id}`, { status })
            .then(data => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Product Rejected",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }

                axiosPublic.delete(`/allProducts/${id}`)
                .then(data => {
                    console.log(data.data);
                })
                
            })
        
    }

    return (
        <div className="px-5">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Details</th>
                            <th>Make Featured</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sortedProducts.map(product => <tr key={product._id}>

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
                                    <button className="btn btn-sm bg-green-100 text-green-600">
                                       <Link to={`/productDetails/${product._id}`}>View Details</Link>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleMakeFeatured(product._id)} className="btn btn-sm bg-blue-100 text-blue-600">
                                        Make Featured
                                    </button>
                                </td>
                                <td>
                            <button 
                            disabled={product.status === 'Accepted'} onClick={() => handleAcceptProduct(product._id, "Accepted")} 
                            className={`btn ${product.status === "Rejected" && 'text-red-500'}`}>
                                {product.status}
                            </button>
                                </td>
                                <td>
                                    <button disabled={product.status === 'Rejected'} onClick={() => handleRejectedProduct(product._id, "Rejected")} className="btn">
                                        <MdBlockFlipped size={20} className="text-red-500"/>
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