/* eslint-disable no-unused-vars */

import { motion, AnimatePresence } from "framer-motion";
import LoadingButton from "../../../components/LoadingButton";
import useReview from "../context/review/useReview";
import useRating from "../context/rating/useRating";
import { useState } from "react";
import Constants from "../../../app/constants";
import { toast } from "react-toastify";
import useProductReviews from "../context/productReviews/useProductReviews";

function AddReviewToProduct() {
  const [showTextAreaToWriteReview] = useReview();
  const [rating, _] = useRating();
  const [reviewText, setReviewText] = useState("");
  const { setProductReviews } = useProductReviews();

  async function handleReviewSubmit() {
    if (rating === 0) {
      toast.error("Please provide a rating before submitting your review.");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Review text cannot be empty.");
      return;
    }
    try {
      const res = await fetch(
        `${Constants.BASE_URL}/products/690716ee329f24ecdb9fe8ab/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDYyZDU2ODA4MTJjNjc5ZDkwNWE4NSIsImlhdCI6MTc2MjA4ODQ2MCwiZXhwIjoxNzYyNjkzMjYwfQ.NoFtMph7R1K1espayNGvwJiYugr8C4XYgknk2V_yk60`,
          },
          body: JSON.stringify({ review: reviewText, rating: rating }),
        }
      );

      const data = await res.json();
      toast.success("Review added successfully");
      setProductReviews((prevReviews) => [data.data, ...prevReviews]);
      setReviewText("");
    } catch (error) {
      toast.error(
        "There is something wrong while adding your review, Try again later"
      );
    }
  }

  return (
    <div className="mt-8">
      <AnimatePresence>
        {showTextAreaToWriteReview && (
          <div>
            <motion.textarea
              key="review-area"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              placeholder="Write a review..."
              rows={5}
              onChange={(e) => setReviewText(e.target.value)}
              className="border border-gray-300 w-full rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
            />

            <LoadingButton
              onClick={handleReviewSubmit}
              title="Send"
              width="30%"
              style={{
                margin: "1rem 0 1rem auto",
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddReviewToProduct;
