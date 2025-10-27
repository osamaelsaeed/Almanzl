// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import LoadingButton from "../../../components/LoadingButton";
import useReview from "../context/review/useReview";

function AddReviewToProduct() {
  const [showTextAreaToWriteReview] = useReview();
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
              className="border border-gray-300 w-full rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#1E2939]"
            />
            <LoadingButton
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
