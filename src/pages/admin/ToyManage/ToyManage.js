import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderAdmin from '~/components/HeaderAdmin/HeaderAdmin';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ToyManage.scss';
class ToyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenmodal: false,
    };
  }
  openModal = () => {
    this.setState({
      isOpenmodal: true,
    });
  };
  closeModal = () => {
    this.setState({
      isOpenmodal: false,
    });
  };
  toggle = () => {};
  render() {
    return (
      <>
        <HeaderAdmin />
        <p>Welcome to Toy ToyManage page</p>
        <div className="mx-3">
          <button className="btn btn-lg btn-primary px-5 mb-3" onClick={() => this.openModal()}>
            ADD NEW
          </button>
          <table className="">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Peter</td>
                <td>
                  <button className="btn btn-lg btn-primary mx-3">Detail</button>
                  <button className="btn btn-lg btn-warning mx-3">Edit</button>
                  <button className="btn btn-lg btn-danger mx-3">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Modal isOpen={this.state.isOpenmodal} toggle={() => this.closeModal()} className={this.props.className}>
          <ModalHeader toggle={() => this.closeModal()}>Modal title</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.closeModal()}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={() => this.closeModal()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(ToyManage);
