import { useEffect, useState } from "react";
import ProductReviewsContext from "./ProductReviewsContext";
import { useFetch } from "../../../../hooks/useFetch";

export default function ProductReviewsProvider({ children }) {
  const [productReviews, setProductReviews] = useState([]);
  const { data, loading, error } = useFetch(
    "products/690716ee329f24ecdb9fe8ab/reviews"
  );

  useEffect(() => {
    if (data) {
      setProductReviews(data.data);
    }
  }, [data]);

  return (
    <ProductReviewsContext.Provider
      value={{ productReviews, loading, error, setProductReviews }}
    >
      {children}
    </ProductReviewsContext.Provider>
  );
}
