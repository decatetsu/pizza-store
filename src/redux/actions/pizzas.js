import db from '../db';

export const setLoaded = (value) => ({
  type: 'SET_LOADED',
  payload: value,
});

export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
});

export const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoaded(false));
  dispatch(
    setPizzas(
      db.pizzas
        .filter((pizza) => (category ? pizza.category === category : true))
        .sort((a, b) => {
          if (sortBy.type === 'popular') {
            return sortBy.order === 'asc'
              ? a.rating - b.rating
              : b.rating - a.rating;
          } else if (sortBy.type === 'price') {
            return sortBy.order === 'asc'
              ? a.price - b.price
              : b.price - a.price;
          } else if (sortBy.type === 'name') {
            return sortBy.order === 'asc'
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          }
        })
    )
  );
  /* JSON-SERVER VERSION */
  // axios.get(`http://localhost:3000/pizzas?${category !== null ? `category=${category}&` : ''}_sort=${sortBy.type}&_order=${sortBy.order}`)
  //   .then(({ data }) => dispatch(setPizzas(data)));
};
