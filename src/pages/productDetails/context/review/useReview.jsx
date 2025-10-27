import { useContext } from "react";
import { ReviewContext } from "./ReviewContext";

export default function useReview() {
  return useContext(ReviewContext);
}
