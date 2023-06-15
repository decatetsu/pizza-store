import React, { useState } from 'react';
import { Button } from '../index';

function PizzaBlock({
    id,
    name,
    imageUrl,
    price,
    types,
    sizes,
    inCartCount,
    onClickAddPizza
}) {
    const availableTypes = ['тонкe', 'традиційнe'];
    const [activeType, setActiveType] = useState(types[0]);

    const availableSizes = [26, 30, 40];
    const [activeSize, setActiveSize] = useState(sizes[0]);

    function onSelectType(index) {
        setActiveType(index);
    }

    function onSelectSize(size) {
        setActiveSize(size);
    }

    function handleClickAddPizza() {
        const obj = {
            id,
            name,
            imageUrl,
            price,
            type: availableTypes[activeType],
            size: activeSize
        };
        onClickAddPizza(obj);
    }

    return (
      <div className="pizza-block">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
          <h4 className="pizza-block__title">{name}</h4>
          <div className="pizza-block__selector">
              <ul>
                  {availableTypes.map((type, index) => (
                    <li
                      key={type}
                      onClick={() => onSelectType(index)}
                      className={`${activeType === index ? 'active' : ''} ${
                        !types.includes(index) ? 'disabled' : ''
                      }`}>
                        {type}
                    </li>
                  ))}
              </ul>
              <ul>
                  {availableSizes.map((size) => (
                    <li
                      key={size}
                      onClick={() => onSelectSize(size)}
                      className={`${activeSize === size ? 'active' : ''} ${
                        !sizes.includes(size) ? 'disabled' : ''
                      }`}>
                        {size} см.
                    </li>
                  ))}
              </ul>
          </div>
          <div className="pizza-block__bottom">
              <div className="pizza-block__price">від {price} ₴</div>
              <Button className={'button--add'} onClick={handleClickAddPizza} outline>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                      />
                  </svg>
                  <span>Додати</span>
                  {inCartCount && <i>{inCartCount}</i>}
              </Button>
          </div>
      </div>
    );
}

export default PizzaBlock;
