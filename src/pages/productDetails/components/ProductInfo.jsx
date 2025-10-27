import VerticalDivider from "../../../components/VerticalDivider";
import HeartIcon from "../../../assets/heart.png";
import MessageIcon from "../../../assets/message.png";
import StartIcon from "../../../assets/star.png";
import Icon from "../../../components/Icon";

function ProductInfo({ product }) {
  const { date, category, by, favoriteNumber, messageNumber, price } = product;

  return (
    <div className="flex md:flex-row flex-col  items-start md:items-stretch flex-wrap mt-4 text-gray-500">
      <span className="underline">{date}</span>
      <VerticalDivider />
      <span>{category}</span>
      <VerticalDivider />
      <span>By {by}</span>
      <VerticalDivider />
      <Icon icon={HeartIcon} title={favoriteNumber} />
      <VerticalDivider />
      <Icon icon={MessageIcon} title={messageNumber} />
      <VerticalDivider />
      <Icon icon={StartIcon} title="4.5" />
      <VerticalDivider />
      <span>{price}$</span>
    </div>
  );
}

export default ProductInfo;
