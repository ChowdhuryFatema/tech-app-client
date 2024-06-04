import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Shared/Navbar";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";


const Products = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');

   

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allProducts?search=${search}`)
            return res.data;
        }
    })

    useEffect(() => {
        refetch()
    }, [search, refetch])

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText);
        e.target.reset();
    }

    return (
        <div className="max-w-7xl mx-auto px-5">
            <div className="min-h-[100px]">
                <Navbar bgColor="bg-white"></Navbar>
            </div>
            <form onSubmit={handleSearch} className="join">
                <div>
                    <div>
                        <input className="input input-bordered join-item" placeholder="Search" name="search"/>
                    </div>
                </div>
                <div className="indicator">
                    <button type="submit" className="btn join-item">Search</button>
                </div>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                {
                    products.map(product => <ProductCard
                        key={product._id}
                        product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Products;