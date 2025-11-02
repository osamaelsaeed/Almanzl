import { useState, useRef, useEffect } from "react";
import ExpandableText from "../../../components/ExpandableText";
import Rating from "../../../components/Rating";
import { MoreVertical } from "lucide-react";
import Constants from "../../../app/constants";
import { toast } from "react-toastify";
import useProductReviews from "../context/productReviews/useProductReviews";
import useReviewAreaVisibility from "../context/reviewAreaVisibility/useReviewAreaVisibility";
import useRating from "../context/rating/useRating";
import EditReviewModal from "./EditReviewModal";

function Review({ review }) {
  const { setProductReviews } = useProductReviews();
  const [__, setRating] = useRating();
  const [_, setShowTextAreaToWriteReview] = useReviewAreaVisibility();
  const [showModal, setShowModal] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function onDelete() {
    try {
      await fetch(
        `${Constants.BASE_URL}/products/690716ee329f24ecdb9fe8ab/reviews/${review._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDYyZDU2ODA4MTJjNjc5ZDkwNWE4NSIsImlhdCI6MTc2MjA4ODQ2MCwiZXhwIjoxNzYyNjkzMjYwfQ.NoFtMph7R1K1espayNGvwJiYugr8C4XYgknk2V_yk60",
          },
        }
      );
      toast.success("Review deleted successfully");
      setProductReviews((prevReviews) =>
        prevReviews.filter((r) => r._id !== review._id)
      );
    } catch (error) {
      toast.error("Failed to delete review");
      console.log(error);
    }
  }

  function onUpdate() {
    setShowTextAreaToWriteReview(true);
    setRating(+review.rating);
  }

  return (
    <div className="my-5">
      <div className="flex items-center me-auto relative">
        <img
          src={review.user.image ?? "src/assets/default.jpg"}
          alt="Reviewer"
          className="h-12 w-12 rounded-full object-cover"
        />
        <p className="ms-2 font-semibold">{review.user.name}</p>

        <div className="h-0.5 w-0.5 rounded-full bg-black mx-2"></div>
        <p className="me-auto">{formattedDate}</p>

        <Rating size={20} readonly value={+review.rating} />

        {review.user._id === "69062d5680812c679d905a85" && (
          <div ref={menuRef} className="relative ml-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <MoreVertical size={20} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-white border  shadow-md z-10">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setShowModal(true);
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete();
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <ExpandableText maxLines={2} className="mt-2">
        {review.review}
      </ExpandableText>

      {showModal && (
        <EditReviewModal review={review} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default Review;
