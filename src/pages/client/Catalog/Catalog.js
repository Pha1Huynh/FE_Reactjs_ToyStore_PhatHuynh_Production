import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import ToySection from '~/components/ToySection/ToySection';
import * as actions from '~/store/actions';
import './Catalog.scss';
class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllToy: true,
      isStuffedToy: false,
      isWoodedToy: false,
      listAllToy: [],
      listStuffedToy: [],
      listWoodedToy: [],
    };
  }
  async componentDidMount() {
    await this.props.getAllToy();
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps, prevStates) {
    if (this.props.allToy !== prevProps.allToy) {
      let listStuffedToy = this.buildListToy(this.props.allToy, 'TT1');
      let listWoodedToy = this.buildListToy(this.props.allToy, 'TT2');

      this.setState({
        listAllToy: this.props.allToy,
        listStuffedToy: listStuffedToy ? listStuffedToy : '',
        listWoodedToy: listWoodedToy ? listWoodedToy : '',
      });
    }
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
  setStatus = (stateTrue, stateFalse1, stateFalse2) => {
    let copyState = { ...this.state };
    copyState[stateTrue] = true;
    copyState[stateFalse1] = false;
    copyState[stateFalse2] = false;
    this.setState({
      ...copyState,
    });
  };
  render() {
    let { listAllToy, isAllToy, isStuffedToy, isWoodedToy, listStuffedToy, listWoodedToy } = this.state;

    return (
      <div className="catalog-container">
        <div className="catalog-header">
          <Header />
        </div>
        <div className="catalog-content">
          {isAllToy === true && (
            <ToySection
              name="All Toy"
              data={listAllToy}
              isCatalog={true}
              callBack={this.setStatus}
              isAllToy={isAllToy}
            />
          )}
          {isStuffedToy === true && (
            <ToySection
              name="Stuffed Animal"
              data={listStuffedToy}
              isCatalog={true}
              callBack={this.setStatus}
              isStuffedToy={isStuffedToy}
            />
          )}
          {isWoodedToy === true && (
            <ToySection
              name="Wooded Toy"
              data={listWoodedToy}
              isCatalog={true}
              callBack={this.setStatus}
              isWoodedToy={isWoodedToy}
            />
          )}
        </div>
        <div className="catalog-footer">
          <Footer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { allToy: state.client.allToy };
};
const mapDispatchToProps = (dispatch) => {
  return { getAllToy: () => dispatch(actions.fetchAllToy()) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
