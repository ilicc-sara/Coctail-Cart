import React from "react";

function CartItem(props) {
  const { picture, name, amount, handleClick, id } = props;
  return (
    <article className="cart-item">
      <img className="cartItem-img" src={picture} />
      <div className="cart-item-details">
        <h5 className="cartName">{name}</h5>
        <span className="amnt">{amount} X</span>
      </div>
      <button className="delete-btn" onClick={() => handleClick(id)}>
        X
      </button>
    </article>
  );
}

export default CartItem;
