import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import Button from '~/components/Button/Button';
import toy1 from '~/assets/images/toyItems/toy1.png';
import ToySection from '~/components/ToySection/ToySection';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import './DetailToy.scss';
import './DetailToyResponsive.scss';
import Loading from '../Loading/Loading';
function DetailToy(props) {
  window.scrollTo(0, 0);
  const location = useLocation();
  let id = location && location.state && location.state.id ? location.state.id : '';

  // let id = 5;
  const [loading, setLoading] = useState(true);
  const [toyId, setToyId] = useState(id);
  const [listAllToy, setListAllToy] = useState([]);
  const [number, setNumber] = useState(1);
  const { allToy, getAllToy, toyById, getToyById, userInfo, tokens, handleAddItemToCart } = props;
  useEffect(() => setToyId(id), [id]);
  useEffect(() => {
    const handleGetAllToy = async () => {
      return await getAllToy();
    };
    handleGetAllToy();
  }, [getAllToy]);

  useEffect(() => setListAllToy(allToy), [allToy]);
  //get toy by id
  useEffect(() => {
    const handleGetToyById = async () => {
      let res = await getToyById(toyId);

      if (res && res.errCode === 0) {
        setLoading(false);
      }
    };
    handleGetToyById();
  }, [getToyById, toyId]);

  let listRelatedProduct = handleBuildRelatedProduct(listAllToy, toyId);

  return (
    <p>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="detail-toy-container">
            <div className="detail-toy-content">
              <div className="detail-toy-main-content">
                <div className="toy-info">
                  <div className="left">
                    <p className="toy-name">{toyById && toyById.name ? toyById.name : ''}</p>
                    <p className="toy-info-content">{toyById && toyById.toyInfo ? toyById.toyInfo : ''}</p>
                    <p className="toy-price">$ {toyById && toyById.price ? toyById.price : ''} USD</p>
                    <div className="toy-buying">
                      <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} />
                      <p onClick={() => handleAddToCart({ toyId, userInfo, number, handleAddItemToCart })}>
                        <Button name="Add to cart" />
                      </p>
                    </div>
                  </div>
                  <div className="right">
                    <img src={toyById && toyById.image ? toyById.image : ''} alt="picture" />
                  </div>
                </div>
                <div className="product-detail">
                  <div className="top">
                    <div className="product-detail-header">
                      <p className="product-detail-text">Product Details</p>
                      <p className="product-code">SKU: 35012</p>
                    </div>
                    <div className="toy-section-strikethrough">
                      <div className="line1"></div>
                      <div className="line2"></div>
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      <div className="product-detail__main">
                        <p className="product-detail__main-text">Add Your Product Description</p>
                        <p className="product-detail__main-content">
                          {toyById && toyById.description ? toyById.description : ''}
                        </p>
                      </div>
                      <div className="product-detail__main">
                        <p className="product-detail__main-text">Simple & Elegant Template</p>
                        <p className="product-detail__main-content">
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                          been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                          galley of type and scrambled it to make a type specimen book
                        </p>
                      </div>
                    </div>
                    <div className="right">
                      <div className="table-unit">
                        <div className="unit-content">
                          <p className="unit-title">Width</p>
                          <p className="unit-value">{toyById && toyById.width ? toyById.width : ''} in</p>
                        </div>
                        <div className="unit-content">
                          <p className="unit-title">Height</p>
                          <p className="unit-value">{toyById && toyById.height ? toyById.height : ''} in</p>
                        </div>
                        <div className="unit-content">
                          <p className="unit-title">Length</p>
                          <p className="unit-value">{toyById && toyById.length ? toyById.length : ''} in</p>
                        </div>
                        <div className="unit-content">
                          <p className="unit-title">Weight</p>
                          <p className="unit-value">{toyById && toyById.weight ? toyById.weight : ''} oz</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="related-product">
                <ToySection name="Related Products" data={listRelatedProduct} />
              </div>
              <div className="send-email"></div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </p>
  );
}
const handleAddToCart = async (state) => {
  if (state.handleAddItemToCart && state.toyId && state.userInfo && state.userInfo.id && state.number) {
    let res = await state.handleAddItemToCart({
      userId: state.userInfo.id,
      toyId: state.toyId,
      cartStatusId: 'S1',
      number: state.number,
    });
  }
};
const handleBuildRelatedProduct = (data, id) => {
  let listData = data.filter((item) => item.id !== id);
  listData = listData.slice(0, 8);
  return listData;
};
function mapStateToProps(state) {
  return {
    allToy: state.client.allToy,
    toyById: state.admin.toyById,
    userInfo: state.auth.userInfo,
    tokens: state.auth.tokens,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAllToy: () => dispatch(actions.fetchAllToy()),
    getToyById: (id) => dispatch(actions.fetchToyById(id)),
    handleAddItemToCart: (data) => dispatch(actions.handleAddItemToCart(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailToy);
