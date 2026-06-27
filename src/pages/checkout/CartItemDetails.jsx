import { formatMoney } from "../../utils/money";
import axios from "../../utils/axios";
import { useState } from "react";


export function CartItemDetails({ cartItem, loadCart }) {
  const [updatingQuantity, setUpadtingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  function changingQuantity(event) {
    let newQuantity = Number(event.target.value);
    if( newQuantity > 99){
      newQuantity = 99;
    }
    setQuantity(newQuantity);
    
  }
  
  function keyInput(event) {
    if(event.key === 'Enter'){
      isUpdating();
    }else if(event.key === 'Escape'){
      const newQuantity = cartItem.quantity
      setQuantity(newQuantity);
      setUpadtingQuantity(false)
    }
  }
  
  const isUpdating = () =>{
    if(updatingQuantity){
      const updateCartItem = async ()=>{
        await axios.put(`/api/cart-items/${cartItem.productId}`,{
          quantity
        });
        await loadCart();
      }
      updateCartItem();
    }
    setUpadtingQuantity(!updatingQuantity);
  }


  const deleteCartItem = async () =>{
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }
  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {updatingQuantity? <input 
            className="input-quantity" 
            type="text" 
            value={quantity}
            onChange={changingQuantity}
            onKeyDown={keyInput}
             />:<span className="quantity-label">{cartItem.quantity}</span>}
          </span>
          <span className="update-quantity-link link-primary" onClick={isUpdating}>
            {updatingQuantity? 'Save':'Update'}
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}