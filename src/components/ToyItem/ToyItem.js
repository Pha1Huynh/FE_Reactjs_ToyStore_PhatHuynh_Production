import toy1 from '~/assets/images/toyItems/toy1.png';
import './ToyItem.scss';
function ToyItem(props) {
  return (
    <div className="toy-item-container">
      <img src={toy1} alt="toy-img" className="toy-item-img"></img>
      <p className="toy-item-name">Mega Plush Toy</p>
      <p className="toy-item-price">$ 38.00 USD</p>
    </div>
  );
}

export default ToyItem;
