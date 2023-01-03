import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderAdmin from '~/components/HeaderAdmin/HeaderAdmin';

class AdminDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <HeaderAdmin />
        <p>Welcome to admin page</p>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { dataRedux: state.users };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminDefault);
