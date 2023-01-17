import './ToyCategories.scss';
import { Link } from 'react-router-dom';
function ToyCategories(props) {
  let flexDirection = props.isReverse && 'row-reverse';
  return (
    <div className="categories-container" style={{ backgroundColor: props.bgColor }}>
      <div className="content-left">
        <img src={props.categoriesImg} alt="cat1" />
      </div>
      <div className="content-right">
        <p className="categories-name">{props.categoriesName}</p>
        <Link to="/catalog">
          {' '}
          <button className="categories-button">Shop now</button>
        </Link>
      </div>
    </div>
  );
}

export default ToyCategories;
