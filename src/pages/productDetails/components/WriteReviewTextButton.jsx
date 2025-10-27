import useReview from "../context/review/useReview";

function WriteReviewTextButton() {
  const [isWritingReview, onWriteReview] = useReview();

  return (
    <button
      onClick={() => onWriteReview((prev) => !prev)}
      className={`${
        isWritingReview ? "text-red-700" : "text-[#72479C]"
      } transition duration-200 cursor-pointer text-[18px]`}
    >
      {isWritingReview ? "Close" : "Write a Review"}
    </button>
  );
}

export default WriteReviewTextButton;
