import React, { Component } from 'react';
import { connect } from 'react-redux';

class DetailToy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <>This is detaitoy</>;
  }
}
const mapStateToProps = (state) => {
  return { dataRedux: state.users };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailToy);
