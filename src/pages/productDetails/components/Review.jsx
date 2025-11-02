import ExpandableText from "../../../components/ExpandableText";
import Rating from "../../../components/Rating";

function Review({ review }) {
  const formattedDate = new Date(review["createdAt"]).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
    }
  );
  return (
    <div className="my-5">
      <div className="flex items-center me-auto">
        <img
          src={review.user.image ?? "src/assets/default.jpg"}
          alt="Reviewer Image"
          className="h-12 w-12 rounded-full object-cover"
        />
        <p className="ms-2 font-semibold">{review.user.name}</p>
        <div className="h-0.5 w-0.5 rounded-full bg-black mx-2"></div>
        <p className="me-auto">{formattedDate}</p>
        <Rating size={20} readonly value={+review.rating} />
      </div>

      <ExpandableText maxLines={2} className="mt-2" children={review.review} />
    </div>
  );
}

export default Review;
