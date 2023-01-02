import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faPinterest, faYoutube } from '@fortawesome/free-brands-svg-icons';
function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-contact">
            <p className="phone">Call Us: +84 1234891654</p>
            <p className="email">Email: huynhtanphatleo@gmail.com</p>
          </div>
          <div className="footer-social-list">
            <p className="social-link">
              <FontAwesomeIcon className="social-icon" icon={faFacebook} />
              <FontAwesomeIcon className="social-icon" icon={faTwitter} />
              <FontAwesomeIcon className="social-icon" icon={faPinterest} />
              <FontAwesomeIcon className="social-icon" icon={faInstagram} />
              <FontAwesomeIcon className="social-icon" icon={faYoutube} />
            </p>
          </div>
        </div>
        <div className="footer-strike-through"></div>
        <div className="footer-bottom">
          <p className="create-by">
            Created with love by <p className="name">PhatHuynh</p>
          </p>
          <div className="more-detail">
            <p className="powered">
              Powered by <u>PhatHuynh</u>
            </p>
            <ul>
              <li>Style Guide</li>
              <li>Licensing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
