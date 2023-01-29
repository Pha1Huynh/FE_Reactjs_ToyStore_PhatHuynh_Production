import BeatLoader from 'react-spinners/BeatLoader';
import './Loading.scss';
function Loading(props) {
  return (
    <div className="sweet-loading">
      <BeatLoader color="#fff" />
    </div>
  );
}

export default Loading;
