import './CheckoutPage.css'
import { CheckoutHeader } from './CheckoutHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';



export function CheckoutPage({ cart, loadCart }) {
  
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const reloadPaymentSummary = async ()=>{
      let response = await axios.get('https://ecommerce-backend-4e2u.onrender.com/api/payment-summary');
      setPaymentSummary(response.data);
    }
    reloadPaymentSummary();
  }, [cart])

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get('https://ecommerce-backend-4e2u.onrender.com/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);

    }
    fetchCheckoutData();
  }, []);



  return (
    <>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOptions={deliveryOptions}
            cart={cart}
            loadCart={loadCart}
          />

          <PaymentSummary
            paymentSummary={paymentSummary}
            loadCart={loadCart}
          />
        </div>
      </div>
    </>
  );
}