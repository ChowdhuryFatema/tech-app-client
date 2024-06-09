/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../Shared/Navbar";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

// const items = [1, 2, 3];


const Products = ({ itemsPerPage = 6 }) => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allProducts?search=${search}`)
            return res.data;
        }
    })

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

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
        <>
            <div className="min-h-[100px]">
                <Navbar></Navbar>
            </div>
            <div className="max-w-7xl mx-auto px-5 my-10">

                <form onSubmit={handleSearch} className="join">
                    <div>
                        <div>
                            <input className="input input-bordered join-item" placeholder="Search" name="search" />
                        </div>
                    </div>
                    <div className="indicator">
                        <button type="submit" className="btn join-item bg-[#0ae0b8] text-white">Search</button>
                    </div>
                </form>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                    {currentItems &&
                        currentItems.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                refetch={refetch}></ProductCard>
                        ))}
                </div>


                <div className="pagination">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={6}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        itemsPerPage={6}
                    />
                </div>

            </div>
        </>
    );
};

export default Products;