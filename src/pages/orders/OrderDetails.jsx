import dayjs from "dayjs";
import buyAgain from '../../assets/images/icons/buy-again.png'
import { Fragment } from "react";
import axios from 'axios'

export function OrderDetails({ order, loadCart }) {
  window.axios = axios;
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        const addToCart = async () => {
          await axios.post('/api/cart-items', {
            productId: orderProduct.productId,
            quantity: 1
          });
          await loadCart();
        }
        return (
          <Fragment key={orderProduct.product.id}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary" onClick={addToCart}>
                <img className="buy-again-icon" src={buyAgain} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </Fragment>
        );
      })}



    </div>
  );
}