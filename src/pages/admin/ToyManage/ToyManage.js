import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderAdmin from '~/components/HeaderAdmin/HeaderAdmin';
import CommonUtils from '~/utils/CommonUtils';
import './ToyManage.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class ToyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewImgURL: '',
      //data toy
      name: '',
      image: '',
      price: '',
      width: '',
      height: '',
      length: '',
      weight: '',
      toyInfo: '',
      description: '',
      contentMarkdown: '',
      contentHTML: '',
    };
  }
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        image: base64,
      });
    }
  };
  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    let { name, image, price, width, height, length, weight, toyInfo, description, contentMarkdown, contentHTML } =
      this.state;
    console.log('check all state', this.state);
    return (
      <div className="toy-manage-container">
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
          <div className="form-edit-container row mt-5">
            <p>EDIT DETAIL TOY</p>
            <div className="form-group col-3 mt-5">
              <label>Name</label>
              <input className="form-control" onChange={(e) => this.handleOnChangeInput(e, 'name')} value={name} />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Price</label>
              <input className="form-control" onChange={(e) => this.handleOnChangeInput(e, 'price')} value={price} />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Width</label>
              <input className="form-control" onChange={(e) => this.handleOnChangeInput(e, 'width')} value={width} />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Height</label>
              <input className="form-control" onChange={(e) => this.handleOnChangeInput(e, 'height')} value={height} />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Length</label>
              <input className="form-control" onChange={(e) => this.handleOnChangeInput(e, 'length')} value={length} />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Weight</label>
              <input className="form-control" onChange={(e) => this.handleOnChangeInput(e, 'weight')} value={weight} />
            </div>
            <div className="form-group col-3 image-place">
              <label htmlFor="preview-image" className="btn btn-primary mr-3">
                <FontAwesomeIcon icon={faUpload} />
                Upload Image
              </label>
              <input
                id="preview-image"
                hidden
                type="file"
                className="form-control"
                onChange={(e) => this.handleOnChangeImage(e)}
              />
              <div
                className="preview-image"
                style={{
                  backgroundImage: `url(${this.state.previewImgURL})`,
                }}
                onClick={() => this.openPreviewImage()}
              ></div>
            </div>
            <div className="form-group col-12 mt-5">
              <label>Toy Info</label>
              <textarea
                value={toyInfo}
                className="form-control"
                onChange={(e) => this.handleOnChangeInput(e, 'toyInfo')}
              ></textarea>
            </div>
            <div className="form-group col-12 mt-5">
              <label>Description</label>
              <textarea
                value={description}
                className="form-control"
                onChange={(e) => this.handleOnChangeInput(e, 'description')}
              ></textarea>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onImageLoad={() => {
              window.dispatchEvent(new Event('resize'));
            }}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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
export default connect(mapStateToProps, mapDispatchToProps)(ToyManage);
