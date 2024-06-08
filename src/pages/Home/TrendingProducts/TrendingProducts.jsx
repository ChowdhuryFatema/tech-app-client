import { Link } from "react-router-dom";
import useProducts from "../../../Hooks/useProducts";
import ProductCard from "../../Products/ProductCard";


const TrendingProducts = () => {

    const { products } = useProducts();

    return (
        <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold my-10">Trending Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                {
                    products.slice(0, 6).map(product => <ProductCard
                        key={product._id}
                        product={product}></ProductCard>)
                }
            </div>
            <div className="my-20 flex justify-center items-center">
                <Link to="/products" className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-[#0ae0b8] rounded hover:bg-[#0ae0b8] group">
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#0e977e] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Show All Products</span>
                </Link>
            </div>
        </div>
    );
};

export default TrendingProducts;