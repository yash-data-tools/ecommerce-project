import './TrackingPage.css'
import { Header } from '../component/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import dayjs from 'dayjs';


export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null)
  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    fetchTrackingData();
  }, [orderId]);


  if (!order) { return null; }
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <title>Tracking</title>
      <Header cart={cart} />

      {order.products.map((orderProduct) => {
        const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
        const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
        let deliveryPercent = (timePassedMs / totalDeliveryTimeMs)*100 ;
        // console.log(timePassedMs,totalDeliveryTimeMs, deliveryPercent);
        let isPrepared = 0 , isShipped = 0 , isDelivered = 0;
        if(deliveryPercent < 33){
          isPrepared = deliveryPercent;
        }else if(deliveryPercent >= 33 && deliveryPercent < 100){
          isShipped = deliveryPercent;
        }else if(deliveryPercent>= 100){
          deliveryPercent =  100;
          isDelivered = deliveryPercent;
        }
        // console.log(order.orderTimeMs)
        // console.log(orderProduct.estimatedDeliveryTimeMs)
        if (productId === orderProduct.productId) {
          return (
            <div key={orderProduct.productId} className="tracking-page">
              <div className="order-tracking">
                <a className="back-to-orders-link link-primary" href="/orders">
                  View all orders
                </a>

                <div className="delivery-date">
                   {deliveryPercent<100?'Arriving on':'Delivered on' } {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                </div>

                <div className="product-info">
                  {orderProduct.product.name}
                </div>

                <div className="product-info">
                  Quantity: {orderProduct.quantity}
                </div>

                <img className="product-image" src={orderProduct.product.image} />

                <div className="progress-labels-container">
                  <div className={`progress-label ${isPrepared && 'current-status'}`}>
                    Preparing
                  </div>
                  <div className={`progress-label ${isShipped && 'current-status'}`}>
                    Shipped
                  </div>
                  <div className={`progress-label ${isDelivered && 'current-status'}`}>
                    Delivered
                  </div>
                </div>

                <div className="progress-bar-container">
                  { }
                  <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}