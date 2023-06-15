import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImage from '../../images/content/empty-cart.png';

function EmptyCart() {
    return (
      <div className="cart cart--empty">
          <h2>Кошик пустий 😕</h2>
          <p>
              Схоще, ви ще нічого не додали.
              <br/>
              Щоб замовити піцу, поверніться на головну сторінку.
          </p>
          <img src={emptyCartImage} alt="Empty cart"/>
          <Link to="/">
              <button className="button button--black">
                  <span>Повернутися</span>
              </button>
          </Link>
      </div>
    );
}

export default EmptyCart;
