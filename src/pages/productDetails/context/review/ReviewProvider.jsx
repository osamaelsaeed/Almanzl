import { useState } from "react";
import { ReviewContext } from "./ReviewContext";

export default function ReviewProvider({ children }) {
  const [showTextAreaToWriteReview, setShowTextAreaToWriteReview] =
    useState(false);

  return (
    <ReviewContext.Provider
      value={[showTextAreaToWriteReview, setShowTextAreaToWriteReview]}
    >
      {children}
    </ReviewContext.Provider>
  );
}
