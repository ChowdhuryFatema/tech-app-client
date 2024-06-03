import { useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";


const ProductDetails = () => {
    const {id} = useParams();
    const {products} = useProducts();

    const product = products.find(pro => pro._id === id);

    return (
        <div>
            {product.name}
        </div>
    );
};

export default ProductDetails;