import './ToySection.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import ToyItem from '~/components/ToyItem/ToyItem';
function ToySection(props) {
  return (
    <div className="toy-section-container">
      <div className="toy-section-header">
        <p className="title">{props.name}</p>
        <p className="see-all-toy-button">
          See all toy <FontAwesomeIcon className="icon" icon={faRightLong} />
        </p>
      </div>
      <div className="toy-section-strikethrough">
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
      <div className="list-toy">
        <ToyItem />
        <ToyItem />
        <ToyItem />
        <ToyItem />
      </div>
    </div>
  );
}

export default ToySection;
