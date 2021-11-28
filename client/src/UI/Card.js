import "./StyleSheets/Card.module.css";
const Card = (props) => {
  const classses = "card " + props.className;
  return <div className={classses}>{props.children}</div>;
};

export default Card;
