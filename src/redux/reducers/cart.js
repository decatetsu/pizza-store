const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
};

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

function cart(state = initialState, {
    type,
    payload
}) {
    // Для инкапсуляции тела case можно использовать фигурные скобки, добавляя блок кода:  case 'x': {}
    switch (type) {
        case 'ADD_PIZZA_TO_CART':
            const currentPizzaItems = !state.items[payload.id] ?
              [payload] : [...state.items[payload.id].items, payload];
            const newCartItems = {
                ...state.items,
                [payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                }
            };

            const newItemsArr = [].concat(...Object.values(newCartItems)
              .map(obj => obj.items));

            return {
                ...state,
                items: newCartItems,
                totalPrice: getTotalPrice(newItemsArr),
                totalCount: newItemsArr.length
            };
        case 'CLEAR_CART':
            return initialState;
        case 'REMOVE_CART_ITEM':
            const newItems = {
                ...state.items
            };
            const newTotalCount = state.totalCount - newItems[payload].items.length;
            const newTotalPrice = state.totalPrice - newItems[payload].totalPrice;
            delete newItems[payload];

            return {
                ...state,
                items: newItems,
                totalCount: newTotalCount,
                totalPrice: newTotalPrice
            };
        case 'PLUS_CART_ITEM': {
            const newItems = [
                ...state.items[payload].items,
                state.items[payload].items[0]
            ];

            const newTotalPrice = state.totalPrice + state.items[payload].items[0].price;

            return {
                ...state,
                items: {
                    ...state.items,
                    [payload]: {
                        items: newItems,
                        totalPrice: getTotalPrice(newItems)
                    }
                },
                totalCount: state.totalCount + 1,
                totalPrice: newTotalPrice
            };
        }
        case 'MINUS_CART_ITEM': {
            const oldItems = state.items[payload].items;
            const isLastPizza = oldItems.length === 1;
            const newItems = isLastPizza ? oldItems : state.items[payload].items.slice(1);

            const newTotalPrice = isLastPizza ? state.totalPrice : state.totalPrice - state.items[payload].items[0].price;

            return {
                ...state,
                items: {
                    ...state.items,
                    [payload]: {
                        items: newItems,
                        totalPrice: getTotalPrice(newItems)
                    }
                },
                totalCount: isLastPizza ? state.totalCount : state.totalCount - 1,
                totalPrice: newTotalPrice
            };
        }
    }
    return state;
}

export default cart;
