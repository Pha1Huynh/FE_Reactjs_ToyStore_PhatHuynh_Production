import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import homebg from '~/assets/images/backgound/homebg.jpg';
import headerbg from '~/assets/images/backgound/headerbg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToyCategories from '~/components/ToyCategories/ToyCategories';
import ToyItem from '~/components/ToyItem/ToyItem';
import ToySection from '~/components/ToySection/ToySection';
import './HomePage.scss';
import cat1 from '~/assets/images/categories/cat1.png';
import cat2 from '~/assets/images/categories/cat2.png';
import childrenbg from '~/assets/images/backgound/childrenbg.jpeg';
import link1 from '~/assets/images/listLink/link1.jpg';
import { faPaperPlane, faPlay } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import * as actions from '~/store/actions';
import './HomePageResponsive.scss';
import Loading from '../Loading/Loading';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAllToy: [],
      listStuffedToy: [],
      listWoodedToy: [],
      loading: true,
    };
  }
  async componentDidMount() {
    let res = await this.props.getAllToy();
    if (res && res.errCode === 0) {
      this.setState({
        loading: false,
      });
    }
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps, prevStates) {
    if (this.props.allToy !== prevProps.allToy) {
      let listStuffedToy = this.buildListToy(this.props.allToy, 'TT1');
      let listWoodedToy = this.buildListToy(this.props.allToy, 'TT2');

      this.setState({
        listAllToy: this.props.allToy,
        listStuffedToy: listStuffedToy ? listStuffedToy.slice(0, 4) : '',
        listWoodedToy: listWoodedToy ? listWoodedToy.slice(0, 4) : '',
      });
    }
    // if (this.props.allToy !== prevProps.allToy && this.props.allToy.length > 0) {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }
  buildListToy = (data, type) => {
    if (data && data.length > 0) {
      let result = data.filter((item, index) => {
        let result = item.toyTypeId === type;
        return result;
      });
      return result;
    }
  };
  render() {
    let { loading, listStuffedToy, listWoodedToy } = this.state;

    return (
      <>
        {loading === true ? (
          <Loading />
        ) : (
          <>
            <Header />
            <div className="homepage-main" style={{ backgroundImage: `url(${homebg})` }}>
              <div className="homepage-container">
                <div className="homepage-poster">
                  <img src={headerbg} alt="headerbg"></img>
                  <div className="poster-notify">
                    <p className="notify-title">Say hello to Toystore</p>
                    <div className="notify-des">
                      <p className="first">Welcom to ToyStore</p>
                      <p className="second">Manage by PhatHuynh</p>
                    </div>
                    <Button name="Open Catalog" />
                  </div>
                </div>
                <div className="homepage-categories">
                  <div className="categories-content">
                    <ToyCategories bgColor="#ffc12c" categoriesName="Stuffed Animals" categoriesImg={cat1} />
                    <ToyCategories
                      bgColor="#fb416b"
                      categoriesName="Wooded Toys"
                      categoriesImg={cat2}
                      isReverse={true}
                    />
                  </div>
                </div>
                <div className="section-toy">
                  <ToySection name="Stuffed Animals" data={listStuffedToy} />
                  <ToySection name="Wodded Toys" data={listWoodedToy} />
                </div>
                <div className="watch-our-story">
                  <div className="watch-content">
                    <p className="watch-sub-title">About The Shop</p>
                    <p className="watch-main-title">Watch Our Story</p>
                    <p className="watch-description">
                      There is no magic formula to write perfect ad copy. It is based on a number of factors, including
                      ad placement, demographic, even the consumer’s mood.
                    </p>
                    <button className="watch-button">
                      <FontAwesomeIcon icon={faPlay} className="play-btn" />
                    </button>
                  </div>
                </div>
                <div className="made-a-web-flow">
                  <div className="made-web-flow-container">
                    <div className="made-web-flow-header">
                      <p className="made-web-sub-title">Made for Webflow</p>
                      <p className="made-web-main-title1">Simple & Colorful Ecommerce Template for Your Business</p>
                    </div>
                    <div className="made-web-flow-content">
                      <div className="content-left">
                        <p className="made-web-title">Available for FREE!</p>
                        <div className="made-web-strike-through"></div>
                        <p className="made-web-description">
                          A successful marketing plan relies heavily on the pulling-power of advertising copy. Writing
                          result-oriented ad copy is difficult, as it must appeal to, entice, and convince consumers to
                          take action. There is no magic formula to write perfect ad copy
                        </p>
                        <Button name="Get it now" />
                      </div>
                      <div className="content-right">
                        <img src={childrenbg} alt="children" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="subscribe-newsletter">
                  <div className="subscribe-newsletter-container">
                    <div className="content-left">
                      <div className="send">
                        <FontAwesomeIcon className="send-icon" icon={faPaperPlane} />
                      </div>
                      <p className="subscribe-description">
                        Subscribe to our newsletter & get <p className="discount">10% discount!</p>
                      </p>
                    </div>
                    <div className="content-right">
                      <input placeholder="Enter your email address" />
                      <Button name="Subscribe" size="sm" />
                    </div>
                  </div>
                </div>
                <div className="instagram-info">
                  <div className="instagram-info-container">
                    <div className="instagram-info-header">
                      <p className="instagram-info-sub-header">@ElasticThemes</p>
                      <p className="instagram-info-main-header">We're on Instagram!</p>
                    </div>
                    <div className="instagram-info-content">
                      <div className="list-link">
                        <p>
                          <img src={link1} alt="link" />
                        </p>
                        <p>
                          <img src={link1} alt="link" />
                        </p>
                        <p>
                          <img src={link1} alt="link" />
                        </p>
                        <p>
                          <img src={link1} alt="link" />
                        </p>
                        <p>
                          <img src={link1} alt="link" />
                        </p>
                        <p>
                          <img src={link1} alt="link" />
                        </p>
                      </div>
                      <Button name="See More Photos" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allToy: state.client.allToy,
    tokens: state.auth.tokens,
    userInfo: state.auth.userInfo,
    cartByUserId: state.client.cartByUserId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllToy: () => dispatch(actions.fetchAllToy()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
