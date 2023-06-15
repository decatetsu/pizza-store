import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPizzas } from '../../redux/actions/pizzas';
import { setCategory, setSortBy } from '../../redux/actions/filters';
import { Categories, PizzaBlock, SortPopup } from '../components';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock.jsx';
import { addPizzaToCart } from '../../redux/actions/cart';

const categoryNames = ['Фірмові', 'Без м\'яса', 'Гострі', 'М\'ясні', 'Без цибулі'];
const sortItems = [
    {
        name: 'популярністю',
        type: 'popular',
        order: 'desc'
    },
    {
        name: 'ціною',
        type: 'price',
        order: 'desc'
    },
    {
        name: 'назвою',
        type: 'name',
        order: 'asc'
    },
];

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ pizzas }) => pizzas.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const {
        category,
        sortBy
    } = useSelector(({ filters }) => filters);

    // Эквивалент
    // const { items } = useSelector(({ pizzas }) => ({
    //     items: pizzas.items,
    // }));

    useEffect(() => {
        dispatch(fetchPizzas(category, sortBy));
    }, [category, sortBy]);

    // useCallback сохраняет один и тот же адрес для функции
    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);
    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);
    const onAddPizzaToCart = React.useCallback((obj) => {
        dispatch(addPizzaToCart(obj));
    }, []);

    return (
      <div className="container">
          <div className="content__top">
              <Categories activeCategory={category} onClickCategory={onSelectCategory} items={categoryNames}/>
              <SortPopup activeSortType={sortBy.type} onClickPopup={onSelectSortType} items={sortItems}/>
          </div>
          <h2 className="content__title">Всі піци</h2>
          <div className="content__items">
              {isLoaded
                ? items.map((item) => <PizzaBlock key={item.id} onClickAddPizza={onAddPizzaToCart}
                                                  inCartCount={cartItems[item.id] &&
                                                    cartItems[item.id].items.length}
                                                  {...item} />)
                : Array(12)
                  .fill(0)
                  .map((_, index) => <LoadingBlock key={index}/>)}
          </div>
      </div>
    );
}

export default Home;
