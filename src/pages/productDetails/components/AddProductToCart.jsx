import LoadingButton from "../../../components/LoadingButton";
import ProductQuantityProvider from "../context/productQuantity/ProductQuantityProvider";
import ProductQuantity from "./ProductQuantity";

export default function AddProductToCart({ product }) {
  const handleSubmit = () =>
    new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <ProductQuantityProvider>
      <div className="flex justify-center items-center gap-5">
        <ProductQuantity product={product} />
        <LoadingButton
          title="Add to Cart"
          onClick={handleSubmit}
          width="50%"
          style={{
            margin: "2rem auto",
          }}
        />
      </div>
    </ProductQuantityProvider>
  );
}
