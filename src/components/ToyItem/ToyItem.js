import './ToyItem.scss';
import { useNavigate } from 'react-router-dom';

function ToyItem(props) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/detail-toy/${props.id}`;
    let propsId = props.id;
    navigate(path, {
      state: {
        id: propsId,
      },
    });
  };
  return (
    <div className="toy-item-container" onClick={routeChange}>
      <img src={props.image} alt="toy-img" className="toy-item-img"></img>
      <p className="toy-item-name">{props.name}</p>
      <p className="toy-item-price">$ {props.price}.00 USD</p>
    </div>
  );
}

export default ToyItem;
