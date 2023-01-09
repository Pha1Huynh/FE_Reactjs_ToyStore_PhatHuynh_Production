import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderAdmin from '~/components/HeaderAdmin/HeaderAdmin';
import CommonUtils from '~/utils/CommonUtils';
import './ToyManage.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import * as actions from '~/store/actions';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ToyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isOpen: false,
      previewImgURL: '',
      dataNameToyInputSelect: [],
      dataToyTypeInputSelect: [],
      listToyType: [],
      listToyById: [],
      toyNameInput: '',
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
      toyType: '',
      idToy: '',
      toyTypeId: '',
    };
  }
  componentDidMount() {
    this.props.getToy();
    this.props.getToyType();
  }
  componentDidUpdate(prevProps, prevStates) {
    if (this.props.allDataShortToy !== prevProps.allDataShortToy) {
      this.setState({
        dataNameToyInputSelect: this.props.allDataShortToy,
      });
    }
    if (this.props.toyType !== prevProps.toyType) {
      let listToyType = this.buildDataSelectInput(this.props.toyType, 'allCodes');
      this.setState({
        listToyType: listToyType,
        dataToyTypeInputSelect: this.props.toyType,
      });
    }
    if (this.props.toyById !== prevProps.toyById) {
      this.setState(
        {
          listToyById: this.props.toyById,
        },
        () => this.setDataInput(),
      );
    }
  }
  buildDataSelectInput = (data, type) => {
    let result = [];
    if (type === 'dataShortToy') {
      data.map((item) => {
        let object = {};
        object.value = item.id;
        object.label = item.name;
        return result.push(object);
      });
    }
    if (type === 'allCodes') {
      data.map((item) => {
        let object = {};
        object.value = item.keyMap;
        object.label = item.value;
        return result.push(object);
      });
    }
    return result;
  };
  openModal = () => {
    this.setState({
      isShowModal: true,
    });
  };
  closeModal = () => {
    this.setState({
      isShowModal: false,
    });
  };
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
  handleOnChangeSelectToy = async (selectedOption) => {
    let id = selectedOption.value;

    this.setState({
      idToy: id,
    });
    await this.props.getToyById(id);
  };

  setDataInput = async () => {
    this.setState({
      name: '',
      image: '',
      previewImgURL: '',
      price: '',
      width: '',
      height: '',
      length: '',
      weight: '',
      toyInfo: '',
      description: '',
      contentMarkdown: '',
      contentHTML: '',
      toyTypeId: '',
    });
    let { listToyById, listToyType, idToy } = this.state;
    let name = '';
    let image = '';
    let price = '';
    let width = '';
    let height = '';
    let length = '';
    let weight = '';
    let toyInfo = '';
    let description = '';
    let contentMarkdown = '';
    let contentHTML = '';
    let toyType = '';
    let toyTypeId = '';
    let previewImgURL = '';

    if (listToyById) {
      name = listToyById.name;
      image = listToyById.image;
      previewImgURL = await CommonUtils.base64ToBlob(image);
      price = listToyById.price;
      width = listToyById.width;
      height = listToyById.height;
      length = listToyById.length;
      weight = listToyById.weight;
      toyInfo = listToyById.toyInfo;
      description = listToyById.description;
      contentMarkdown = listToyById.contentMarkdown;
      contentHTML = listToyById.contentHTML;
      toyTypeId = listToyById.toyTypeId;
      toyType = listToyType.find((item) => item.value === toyTypeId);

      this.setState({
        name: name,
        image: image,
        previewImgURL: previewImgURL,
        price: price,
        width: width,
        height: height,
        length: length,
        weight: weight,
        toyInfo: toyInfo,
        description: description,
        contentMarkdown: contentMarkdown,
        contentHTML: contentHTML,
        toyTypeId: toyTypeId,
        toyType: toyType,
      });
    }
  };
  handleOnChangeSelect = (selectedOption, name) => {
    let copyState = { ...this.state };
    let nameState = name.name;
    copyState[nameState] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleUpdateToy = async () => {
    let data = {};

    let {
      idToy,
      name,
      toyTypeId,
      toyType,
      image,
      price,
      width,
      height,
      length,
      weight,
      toyInfo,
      description,
      contentMarkdown,
      contentHTML,
    } = this.state;

    data.id = idToy;
    data.name = name;
    data.toyTypeId = toyType.value;
    data.image = image;
    data.price = price;
    data.width = width;
    data.height = height;
    data.length = length;
    data.weight = weight;
    data.toyInfo = toyInfo;
    data.description = description;
    data.contentMarkdown = contentMarkdown;
    data.contentHTML = contentHTML;

    await this.props.updateToy(data);
  };
  handleCreateNewToy = async () => {
    let data = {};
    data.name = this.state.toyNameInput;
    await this.props.createANewToy(data);
    this.closeModal();
    this.setState({
      toyNameInput: '',
    });
  };
  render() {
    console.log('check all state', this.state);

    let {
      listToyType,
      name,
      image,
      price,
      width,
      height,
      length,
      weight,
      toyInfo,
      description,
      contentMarkdown,
      contentHTML,
      dataNameToyInputSelect,
      dataToyTypeInputSelect,
      toyType,
      shortDataToy,
      toyNameInput,
    } = this.state;

    return (
      <div className="toy-manage-container">
        <HeaderAdmin />
        <p>Welcome to Toy ToyManage page</p>
        <div className="mx-3">
          <button className="btn btn-lg btn-primary px-5 mb-3" onClick={() => this.openModal()}>
            ADD NEW
          </button>
          <Modal
            isOpen={this.state.isShowModal}
            toggle={() => this.closeModal()}
            className={this.props.className}
          >
            <ModalHeader toggle={() => this.closeModal()}>Modal title</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-12 form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    onChange={(e) => this.handleOnChangeInput(e, 'toyNameInput')}
                    value={toyNameInput}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.handleCreateNewToy()}>
                Add
              </Button>{' '}
              <Button color="secondary" onClick={() => this.closeModal()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <div className="form-edit-container row mt-5">
            <p>EDIT DETAIL TOY</p>
            <div className="form-group col-12 mt-5">
              <label>Toy</label>
              <Select
                value={shortDataToy}
                onChange={this.handleOnChangeSelectToy}
                options={this.buildDataSelectInput(dataNameToyInputSelect, 'dataShortToy')}
                name="shortDataToy"
              />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Name</label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeInput(e, 'name')}
                value={name}
              />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Price</label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeInput(e, 'price')}
                value={price}
              />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Width</label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeInput(e, 'width')}
                value={width}
              />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Height</label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeInput(e, 'height')}
                value={height}
              />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Length</label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeInput(e, 'length')}
                value={length}
              />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Weight</label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeInput(e, 'weight')}
                value={weight}
              />
            </div>
            <div className="form-group col-3 mt-5">
              <label>Toy Type</label>
              <Select
                value={toyType}
                onChange={this.handleOnChangeSelect}
                name="toyType"
                options={listToyType}
              />
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
                  backgroundImage: `url(${this.state.image})`,
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
            <div className="manage-doctor-editor">
              <MdEditor
                style={{ height: '300px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
            </div>
            <div className="col-3 mb-5">
              <button className="btn btn-primary btn-lg" onClick={() => this.handleUpdateToy()}>
                Update
              </button>
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
  return {
    allDataShortToy: state.admin.allDataShortToy,
    toyType: state.admin.toyType,
    toyById: state.admin.toyById,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getToy: () => dispatch(actions.fetchDataShortToy()),
    getToyType: () => dispatch(actions.fetchAllCodesToyType()),
    getToyById: (id) => dispatch(actions.fetchToyById(id)),
    updateToy: (data) => dispatch(actions.handleUpdateToy(data)),
    createANewToy: (data) => dispatch(actions.handleCreateToy(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ToyManage);
