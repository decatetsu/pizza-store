import axios from 'axios';

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
    axios.get(`http://localhost:3000/pizzas?${category !== null ? `category=${category}&` : ''}_sort=${sortBy.type}&_order=${sortBy.order}`)
      .then(({ data }) => dispatch(setPizzas(data)));
};
