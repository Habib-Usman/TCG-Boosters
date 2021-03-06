import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProductStart,
    setProduct,
} from "../../components/redux/Products/products.actions";
import Button from "./../forms/Button";
import "./styles.scss";

const mapState = (state) => ({
    product: state.productsData.product,
});

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const { productID } = useParams();
    const { product } = useSelector(mapState);

    const { productThumbnail, productName, productPrice, productDesc } =
        product;

    useEffect(() => {
        dispatch(fetchProductStart(productID));

        return () => {
            dispatch(setProduct({}));
        };
    }, []);

    const configAddToCartBtn = {
        type: "button",
    };

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail} />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>{productName}</h1>
                    </li>
                    <li>
                        <span>$A{productPrice}</span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn}>Add to cart</Button>
                        </div>
                    </li>
                    <li>
                        <span
                            className="desc"
                            dangerouslySetInnerHTML={{ __html: productDesc }}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductCard;
