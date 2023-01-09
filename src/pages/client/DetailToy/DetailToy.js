import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import Button from '~/components/Button/Button';
import toy1 from '~/assets/images/toyItems/toy1.png';
import './DetailToy.scss';
function DetailToy() {
  const location = useLocation();
  let id = location.state.id;
  const [toyId, setToyId] = useState('');
  useEffect(() => setToyId(id), [id]);

  console.log('check toyid', toyId);

  return (
    <div className="detail-toy-container">
      <div className="detail-toy-header">
        <Header />
      </div>
      <div className="detail-toy-content">
        <div className="detail-toy-main-content">
          <div className="toy-info">
            <div className="left">
              <p className="toy-name">Teddy Bear</p>
              <p className="toy-info-content">
                A successful marketing plan relies heavily on the pulling-power of advertising copy.
                Writing result-oriented ad copy is difficult, as it must appeal to, entice, and
                convince consumers to take action. There is no magic formula to write perfect ad
                copy. It is based on a number of factors.
              </p>
              <p className="toy-price">$ 30.00 USD</p>
              <div className="toy-buying">
                <input type="number" defaultValue="1" />
                <Button name="Add to cart" />
              </div>
            </div>
            <div className="right">
              <img src={toy1} alt="picture" />
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
                    The rich text element allows you to create and format headings, paragraphs,
                    blockquotes, images, and video all in one place instead of having to add and
                    format them individually. Just double-click and easily create content. A rich
                    text element can be used with static or dynamic content. For static content,
                    just drop it into any page and begin editing. For dynamic content, add a rich
                    text field to any collection and then connect a rich text element to that field
                    in the settings panel. Voila!
                  </p>
                </div>
                <div className="product-detail__main">
                  <p className="product-detail__main-text">Simple & Elegant Template</p>
                  <p className="product-detail__main-content">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book
                  </p>
                </div>
              </div>
              <div className="right">
                <div className="table-unit">
                  <div className="unit-content">
                    <p className="unit-title">Width</p>
                    <p className="unit-value">38 in</p>
                  </div>
                  <div className="unit-content">
                    <p className="unit-title">Height</p>
                    <p className="unit-value">32 in</p>
                  </div>
                  <div className="unit-content">
                    <p className="unit-title">Length</p>
                    <p className="unit-value">21.5 in</p>
                  </div>
                  <div className="unit-content">
                    <p className="unit-title">Weight</p>
                    <p className="unit-value">24 oz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="related-product"></div>
        <div className="send-email"></div>
      </div>
      <div className="detail-toy-footer">
        <Footer />
      </div>
    </div>
  );
}

export default DetailToy;
