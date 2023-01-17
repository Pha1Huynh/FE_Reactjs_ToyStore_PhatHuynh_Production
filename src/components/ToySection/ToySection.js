import './ToySection.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import ToyItem from '~/components/ToyItem/ToyItem';
import { Link } from 'react-router-dom';
function ToySection(props) {
  let { data, callBack, isAllToy, isStuffedToy, isWoodedToy } = props;

  return (
    <div className="toy-section-container">
      <div className="toy-section-header">
        <p className="title">{props.name}</p>
        {props.isCatalog === true ? (
          <p className="catalog-button">
            <p onClick={() => callBack('isAllToy', 'isStuffedToy', 'isWoodedToy')} className={isAllToy ? 'active' : ''}>
              All toy
            </p>
            <p
              onClick={() => callBack('isStuffedToy', 'isAllToy', 'isWoodedToy')}
              className={isStuffedToy ? 'active' : ''}
            >
              Stuffed Animal
            </p>
            <p
              onClick={() => callBack('isWoodedToy', 'isAllToy', 'isStuffedToy')}
              className={isWoodedToy ? 'active' : ''}
            >
              Wooded toy
            </p>
          </p>
        ) : (
          <Link to="/catalog" className="see-all-toy-button">
            See all toy <FontAwesomeIcon className="icon" icon={faRightLong} />
          </Link>
        )}
      </div>
      <div className="toy-section-strikethrough">
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
      <div className="list-toy">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return <ToyItem {...item} key={index} />;
          })}
      </div>
    </div>
  );
}

export default ToySection;
