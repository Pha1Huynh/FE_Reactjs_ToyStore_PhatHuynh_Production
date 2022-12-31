import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '~/components/Header/Header';
import homebg from '~/assets/images/backgound/homebg.jpg';
import headerbg from '~/assets/images/backgound/headerbg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToyCategories from '~/components/ToyCategories/ToyCategories';
import './HomePage.scss';
import cat1 from '~/assets/images/categories/cat1.png';
import cat2 from '~/assets/images/categories/cat2.png';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="homepage-main">
        <div className="homepage-container">
          <div className="homepage-header">
            <Header />
          </div>
          <div className="homepage-poster">
            <img src={headerbg} alt="headerbg"></img>
            <div className="poster-notify">
              <p className="notify-title">Say hello to Toystore</p>
              <div className="notify-des">
                <p className="first">Welcom to ToyStore</p>
                <p className="second">Manage by PhatHuynh</p>
              </div>
              <button className="notify-button">Open Catalog</button>
            </div>
          </div>
          <div className="homepage-categories">
            <ToyCategories bgColor="#ffc12c" categoriesName="Stuffed Animals" categoriesImg={cat1} />
            <ToyCategories bgColor="#fb416b" categoriesName="Wooded Toys" categoriesImg={cat2} isReverse={true} />
          </div>
          <div className="section-toy"></div>
        </div>
        <div className="homepage-background">
          <img src={homebg} alt="bg" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { dataRedux: state.users };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
